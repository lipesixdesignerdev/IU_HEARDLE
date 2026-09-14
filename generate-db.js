const fs = require('node:fs');
const path = require('node:path');

function renderDatabase(catalog) {
  const songs = catalog.songs.map(song => {
    const album = catalog.albums[song.album];
    if (!album) throw new Error('Unreviewed album: ' + song.album);
    return {...song, year: album.year, cover: album.cover, coverFallback: album.remoteCover};
  });
  return '// Generated from catalog/catalog.json. Run node generate-db.js.\n' +
    'const musicasIU = ' + JSON.stringify(songs, null, 2) + ';\n' +
    'const IU_DUPLICATE_FILES = ' + JSON.stringify(catalog.duplicateFiles, null, 2) + ';\n' +
    'const IU_DAILY_POOLS = ' + JSON.stringify(catalog.dailyPools, null, 2) + ';\n';
}

function validateCatalog(catalog, root = __dirname) {
  const seen = new Set();
  const titles = new Set();
  for (const song of catalog.songs) {
    if (seen.has(song.file)) throw new Error('Duplicate file: ' + song.file);
    seen.add(song.file);
    if (!/^songs\/[^/]+\.mp3$/.test(song.file) || !fs.existsSync(path.join(root, song.file)))
      throw new Error('Missing audio: ' + song.file);
    for (const title of [song.title, ...(song.aliases || [])]) {
      const normalized = title.trim().normalize('NFC').toLowerCase();
      if (!normalized || titles.has(normalized)) throw new Error('Ambiguous title: ' + title);
      titles.add(normalized);
    }
    const album = catalog.albums[song.album];
    if (!album || !/^\d{4}$/.test(album.year) || !/^covers\/[a-z0-9-]+\.jpg$/.test(album.cover))
      throw new Error('Unreviewed metadata: ' + song.title);
    if (!fs.existsSync(path.join(root, album.cover))) throw new Error('Missing cover: ' + album.cover);
  }
  for (const [alias, canonical] of Object.entries(catalog.duplicateFiles)) {
    if (seen.has(alias) || !seen.has(canonical)) throw new Error('Invalid duplicate: ' + alias);
  }
  const known = new Set([...seen, ...Object.keys(catalog.duplicateFiles)]);
  for (const file of fs.readdirSync(path.join(root, 'songs')).filter(f => /\.mp3$/i.test(f))) {
    if (!known.has('songs/' + file)) throw new Error('Audio needs metadata review: ' + file);
  }
  let previous = '';
  for (const pool of catalog.dailyPools) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(pool.from) || pool.from <= previous || !pool.files.length)
      throw new Error('Invalid daily pool');
    previous = pool.from;
    for (const file of pool.files) if (!seen.has(catalog.duplicateFiles[file] || file))
      throw new Error('Missing archived song: ' + file);
  }
}

if (require.main === module) {
  const catalog = require('./catalog/catalog.json');
  validateCatalog(catalog);
  const output = renderDatabase(catalog);
  const target = path.join(__dirname, 'database.js');
  if (process.argv.includes('--check')) {
    if (fs.readFileSync(target, 'utf8') !== output) throw new Error('database.js is stale; run node generate-db.js');
  } else {
    fs.writeFileSync(target, output);
    console.log('Generated ' + catalog.songs.length + ' reviewed songs.');
  }
}
module.exports = {renderDatabase, validateCatalog};
