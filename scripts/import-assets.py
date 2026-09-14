"""Download reviewed artwork and the two requested official audio uploads.

Never activate an audio file before ffprobe and a full ffmpeg decode succeed.
Existing audio paths and frozen daily pools are not rewritten.
"""
import concurrent.futures
import datetime
import html
from html.parser import HTMLParser
import json
import re
from pathlib import Path
import subprocess
import sys
import tempfile
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog/catalog.json"

def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))

def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=35) as response:
        return response.read()

class MetaImage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.url = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta" and attrs.get("property") == "og:image":
            self.url = html.unescape(attrs.get("content", ""))

def download_cover(item):
    title, album = item
    target = ROOT / album["cover"]
    if target.exists():
        return title, album
    url = album["remoteCover"]
    if not url:
        parser = MetaImage()
        parser.feed(fetch(album["source"]).decode("utf-8"))
        url = parser.url
        if not url or ".mzstatic.com/" not in url:
            raise ValueError("No verified artwork at " + album["source"])
        url = re.sub(r"/\d+x\d+[^/]*$", "/600x600bb.jpg", url)
        album["remoteCover"] = url
    data = fetch(url)
    if len(data) < 1024 or not data.startswith(b"\xff\xd8\xff"):
        raise ValueError("Expected a JPEG album cover for " + title)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)
    print("Cover: " + title, flush=True)
    return title, album

def run(command, **kwargs):
    return subprocess.run(command, check=True, timeout=240, **kwargs)

def download_audio(song):
    with tempfile.TemporaryDirectory(prefix="iu-import-") as tmp:
        destination = Path(tmp) / "track"
        # The supplied IDs were checked against IU's official channel.
        info = run([sys.executable, "-m", "yt_dlp", "--skip-download", "--dump-single-json",
                    "--no-playlist", "--socket-timeout", "25", "--retries", "1",
                    song["youtube"]], capture_output=True, text=True)
        metadata = json.loads(info.stdout)
        if metadata.get("channel_id") != song["channelId"]:
            raise ValueError("Unexpected YouTube channel: " + song["title"])
        run([sys.executable, "-m", "yt_dlp", "--no-playlist", "--socket-timeout", "25",
             "--retries", "1", "--fragment-retries", "1", "-f", "bestaudio",
             "-x", "--audio-format", "mp3", "--audio-quality", "192K",
             "-o", str(destination) + ".%(ext)s", song["youtube"]])
        mp3 = destination.with_suffix(".mp3")
        probe = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                     "-of", "default=noprint_wrappers=1:nokey=1", str(mp3)],
                    capture_output=True, text=True)
        duration = float(probe.stdout.strip())
        expected = metadata.get("duration")
        if not 60 <= duration <= 900 or (expected and abs(duration - expected) > 3):
            raise ValueError("Unexpected/incomplete audio duration")
        run(["ffmpeg", "-v", "error", "-xerror", "-i", str(mp3), "-f", "null", "-"],
            capture_output=True)
        target = ROOT / song["file"]
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(mp3.read_bytes())
        print("Audio validated: " + song["title"], flush=True)

def main():
    catalog = read_json(CATALOG)
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        for title, album in pool.map(download_cover, catalog["albums"].items()):
            catalog["albums"][title] = album
    write_json(CATALOG, catalog)
    if "--covers-only" in sys.argv:
        return
    pending_path = ROOT / "catalog/pending-songs.json"
    pending = read_json(pending_path)
    remaining, report, added = [], [], []
    for song in pending:
        try:
            download_audio(song)
            entry = {key: song[key] for key in ("title", "file", "album", "youtube")}
            if not any(existing["file"] == song["file"] for existing in catalog["songs"]):
                catalog["songs"].append(entry)
                added.append(song["file"])
            report.append({"title": song["title"], "status": "imported"})
        except Exception as error:
            # No placeholder MP3 or unplayable entry is added to the game.
            (ROOT / song["file"]).unlink(missing_ok=True)
            remaining.append(song)
            report.append({"title": song["title"], "status": "pending", "reason": str(error)[:400]})
            print("PENDING: " + song["title"] + ": " + str(error)[:400], flush=True)
    if added:
        tomorrow = (datetime.datetime.now(datetime.timezone.utc).date() +
                    datetime.timedelta(days=1)).isoformat()
        if catalog["dailyPools"][-1]["from"] < tomorrow:
            catalog["dailyPools"].append({"from": tomorrow,
                                          "files": [s["file"] for s in catalog["songs"]]})
        else:
            # Only the not-yet-active pool can change.
            catalog["dailyPools"][-1]["files"] = [s["file"] for s in catalog["songs"]]
    write_json(CATALOG, catalog)
    write_json(pending_path, remaining)
    write_json(ROOT / "catalog/import-status.json", report)

if __name__ == "__main__":
    main()
