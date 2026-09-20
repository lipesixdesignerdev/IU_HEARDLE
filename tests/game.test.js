const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.join(__dirname, '..');
const flush = () => new Promise(resolve => setImmediate(resolve));

async function setup(t, storage = {}) {
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    url: 'https://heardle.test', runScripts: 'outside-only'
  });
  const w = dom.window;
  t.after(() => w.close());
  for (const [key, value] of Object.entries(storage)) w.localStorage.setItem(key, value);
  const requests = [];
  w.fetch = async (url, options) => {
    requests.push({url, options});
    return {ok: true, blob: async () => ({url})};
  };
  w.URL.createObjectURL = blob => 'blob:' + blob.url;
  w.URL.revokeObjectURL = () => {};
  const audio = w.document.createElement('audio');
  let paused = true;
  Object.defineProperty(audio, 'paused', { get: () => paused });
  audio.play = async () => { paused = false; };
  audio.pause = () => { paused = true; };
  audio.load = () => { paused = true; };
  w.Audio = function () { return audio; };
  w.alert = () => {};
  w.confirm = () => false;
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.eval(fs.readFileSync(path.join(root, 'database.js'), 'utf8') + '\n' +
    fs.readFileSync(path.join(root, process.env.HEARDLE_BUILT === '1' ? 'dist/script.js' : 'script.js'), 'utf8') +
    '\nwindow.game = {STATE, CONFIG, musicasIU, init, handlePlay, pauseAudio, nextTurn, setLanguage, getDailyDateString, getStats, updateGameView, loadAudioBlob, finishGame};');
  await flush(); // Let the real window load event initialize the game.
  await w.game.STATE.audioPromise;
  return {w, game: w.game, audio, requests, el: id => w.document.getElementById(id)};
}

test('startup loads one song; zero volume survives reload and slider unmutes', async t => {
  const {el, audio, requests} = await setup(t, {'iu-heardle-vol': '0'});
  assert.equal(requests.length, 1);
  assert.equal(audio.volume, 0);
  assert.equal(el('volBtn').textContent, '🔇');
  el('volBtn').click();
  el('volSlider').value = '0.5';
  el('volSlider').oninput({target: el('volSlider')});
  assert.equal(audio.muted, false);
  assert.equal(audio.volume, 0.5);
});

test('empty/unknown guesses via button and Enter do not consume attempts', async t => {
  const {w, game, el} = await setup(t);
  for (const value of ['', 'zzzzteste', '<img src=x onerror=alert(1)>']) {
    el('songInput').value = value;
    el('confirmBtn').click();
    el('songInput').dispatchEvent(new w.KeyboardEvent('keydown', {key:'Enter', bubbles:true}));
  }
  assert.equal(game.STATE.attempt, 0);
  assert.equal(game.STATE.guesses.length, 0);
  assert.match(el('statusText').textContent, /valid|válida/);
  assert.equal(el('guessesList').children.length, 0);
});

test('autocomplete keyboard selection submits a valid song', async t => {
  const {w, game, el} = await setup(t);
  const song = game.musicasIU.find(s => s.title !== game.STATE.song.title);
  el('songInput').value = song.title;
  el('songInput').dispatchEvent(new w.Event('input', {bubbles:true}));
  for (const key of ['ArrowDown', 'Enter', 'Enter']) {
    el('songInput').dispatchEvent(new w.KeyboardEvent('keydown', {key, bubbles:true}));
  }
  assert.equal(game.STATE.guesses.length, 1);
  assert.equal(game.STATE.guesses[0].title, song.title);
  assert.equal(el('timerLabel').textContent, '0.0s / 2s');
});

test('skip immediately updates duration, persists and ends after six attempts once', async t => {
  const {game, el} = await setup(t);
  for (const duration of [2,4,7,11,16]) {
    el('skipBtn').click();
    assert.equal(el('timerLabel').textContent, `0.0s / ${duration}s`);
  }
  assert.match(el('skipBtn').textContent, /Reveal|Revelar/);
  game.init();
  assert.equal(el('timerLabel').textContent, '0.0s / 16s');
  el('skipBtn').click();
  await flush();
  assert.equal(game.STATE.over, true);
  assert.equal(el('resultModal').classList.contains('show'), true);
  assert.equal(game.getStats().played, 1);
  el('skipBtn').click();
  game.init();
  await flush();
  assert.equal(game.getStats().played, 1);
  assert.equal(game.STATE.guesses.length, 6);
  const saved = JSON.stringify(game.STATE.guesses);
  el('againBtn').click();
  assert.equal(game.STATE.mode, 'daily');
  assert.equal(game.STATE.over, true);
  assert.equal(game.STATE.attempt, 6);
  assert.equal(JSON.stringify(game.STATE.guesses), saved);
  assert.equal(game.getStats().played, 1);
  assert.equal(el('resultModal').classList.contains('show'), false);
});

test('win, full audio ending, replay, and daily restore retain correct stats', async t => {
  const {game, el, audio} = await setup(t);
  el('songInput').value = game.STATE.song.title;
  el('confirmBtn').click();
  await flush();
  assert.equal(game.getStats().wins, 1);
  assert.equal(audio.paused, false);
  audio.onended();
  assert.equal(el('modalPlayIcon').textContent, '▶');
  el('modalPlayBtn').click();
  await flush();
  assert.equal(audio.paused, false);
  game.init();
  await flush();
  assert.equal(audio.paused, true); // Restoring the daily result never autoplays.
  assert.equal(game.getStats().played, 1);
  el('againBtn').click();
  el('modePracticeBtn').click();
  const first = game.STATE.song;
  el('newBtn').click();
  assert.notEqual(game.STATE.song.title, first.title);
  assert.equal(audio.paused, true);
});

test('hint, history, skip increment and calendar follow selected language', async t => {
  const {game, el} = await setup(t);
  game.setLanguage('PT');
  el('skipBtn').click();
  el('hintBtn').click();
  assert.match(el('hintContent').textContent, /Ano:/);
  game.setLanguage('EN');
  assert.match(el('hintContent').textContent, /Year:.*Album:/);
  assert.equal(el('guessesList').textContent, 'Skipped');
  assert.equal(el('skipBtn').textContent, '⏭ Skip (+2s)');
  el('calendarBtn').click();
  assert.match(el('calendarGrid').textContent, /In progress/);
  assert.equal(el('calendarCloseBtn').textContent, 'Close');
  game.setLanguage('ES');
  assert.match(el('hintContent').textContent, /Año:/);
  assert.equal(el('guessesList').textContent, 'Saltó');
  assert.match(el('calendarGrid').textContent, /En progreso/);
});

test('daily button returns from archive to today', async t => {
  const {game, el} = await setup(t);
  el('calendarBtn').click();
  el('calendarGrid').children[1].click();
  assert.equal(game.STATE.dailyDate, game.getDailyDateString(1));
  el('modeDailyBtn').click();
  assert.equal(game.STATE.dailyDate, game.getDailyDateString());
});

test('clip timer tracks actual audio time and clamps the display', async t => {
  const {game, el, audio} = await setup(t);
  await game.handlePlay();
  await new Promise(resolve => setTimeout(resolve, 60));
  assert.equal(el('timerLabel').textContent, '0.0s / 1s');
  assert.equal(game.STATE.isPlaying, true);
  audio.currentTime = 1.08;
  await new Promise(resolve => setTimeout(resolve, 60));
  assert.equal(el('timerLabel').textContent, '1.0s / 1s');
  assert.equal(game.STATE.isPlaying, false);
  assert.equal(audio.paused, true);
});

test('play rejection resets controls and allows retry', async t => {
  const {game, el, audio} = await setup(t);
  const play = audio.play;
  audio.play = async () => { throw new Error('blocked'); };
  await game.handlePlay();
  assert.equal(game.STATE.isPlaying, false);
  assert.equal(game.STATE.timer, null);
  assert.equal(el('playBtn').textContent, '▶');
  audio.play = play;
  await game.handlePlay();
  assert.equal(game.STATE.isPlaying, true);
});

test('late audio download cannot replace the current song', async t => {
  const {w, game, audio} = await setup(t);
  const pending = [];
  w.fetch = (url, opts) => new Promise(resolve => pending.push({url, opts, resolve}));
  const old = game.loadAudioBlob('old.mp3');
  const latest = game.loadAudioBlob('latest.mp3');
  assert.equal(pending[0].opts.signal.aborted, true);
  pending[1].resolve({ok:true, blob:async () => ({url:'latest'})});
  await latest;
  pending[0].resolve({ok:true, blob:async () => ({url:'old'})});
  await old;
  assert.equal(audio.getAttribute('src'), 'blob:latest');
});

test('cancelling a pending play prevents playback when download completes', async t => {
  const {game, audio} = await setup(t);
  let resolve;
  game.STATE.audioPromise = new Promise(r => { resolve = r; });
  const play = game.handlePlay();
  game.pauseAudio();
  resolve();
  await play;
  assert.equal(audio.paused, true);
  assert.equal(game.STATE.isPlaying, false);
});

test('previously saved free text is rendered as text, not HTML', async t => {
  const {game, el} = await setup(t);
  game.STATE.guesses = [{title:'<img src=x onerror=alert(1)>', correct:false}];
  game.updateGameView();
  assert.equal(el('guessesList').querySelector('img'), null);
  assert.match(el('guessesList').textContent, /<img/);
});

test('late artwork cannot replace the next game artwork', async t => {
  const {game, el} = await setup(t);
  let resolve;
  game.STATE.artworkPromise = new Promise(r => { resolve = r; });
  const finished = game.finishGame(false);
  el('modePracticeBtn').click();
  resolve('https://example.com/old-cover.jpg');
  await finished;
  assert.notEqual(el('albumArt').getAttribute('src'), 'https://example.com/old-cover.jpg');
});


test('duplicate titles and corrected historical titles resolve to the same song', async t => {
  const {game} = await setup(t);
  for (const song of game.musicasIU.filter(s => s.aliases?.length)) {
    game.STATE.mode = 'practice';
    game.init();
    game.STATE.song = song;
    game.nextTurn(song.aliases[0]);
    assert.equal(game.STATE.over, true, song.title);
    assert.equal(game.STATE.guesses[0].correct, true, song.title);
    await flush();
  }
});

test('cover error never requests a remote fallback and clears artwork and ambient', async t => {
  const {game, el, requests, w} = await setup(t);
  const song = game.musicasIU[0];
  game.STATE.song = song;
  game.STATE.artworkPromise = Promise.resolve(song.cover);
  game.nextTurn(song.title);
  await flush();
  assert.equal(el('albumArt').getAttribute('src'), song.cover);
  el('albumArt').dispatchEvent(new w.Event('error'));
  assert.equal(el('albumArt').style.display, 'none');
  assert.equal(el('albumFallback').style.display, 'flex');
  assert.equal(el('ambientBg').hasAttribute('src'), false);
  assert.equal(requests.some(r => /^https?:/.test(r.url)), false);
});

test('saved daily song identity survives catalogue updates', async t => {
  const {game, w} = await setup(t);
  const date = game.getDailyDateString();
  const song = game.musicasIU.find(s => s.file !== game.STATE.song.file);
  w.localStorage.setItem('iu-heardle-daily-' + date, JSON.stringify({
    songFile: song.file, attempt: 1, guesses: [{title: '', skipped: true, correct: false}], over: false
  }));
  game.init();
  assert.equal(game.STATE.song.file, song.file);
  assert.equal(game.STATE.attempt, 1);
  game.nextTurn('', true);
  assert.equal(JSON.parse(w.localStorage.getItem('iu-heardle-daily-' + date)).songFile, song.file);
});

test('archived dates keep their original song after deduplication', async t => {
  const {game} = await setup(t);
  for (const [date, file] of [
  [
    "2026-08-01",
    "songs/Love Alone (그렇게 사랑은).mp3"
  ],
  [
    "2026-08-02",
    "songs/Love attack (LOVE ATTACK).mp3"
  ],
  [
    "2026-08-03",
    "songs/Love Letter (러브레터).mp3"
  ],
  [
    "2026-08-04",
    "songs/Love of B (을의 연애).mp3"
  ],
  [
    "2026-08-05",
    "songs/Love poem (Love poem).mp3"
  ],
  [
    "2026-08-06",
    "songs/Love wins all (Love wins all).mp3"
  ],
  [
    "2026-08-07",
    "songs/Lullaby (자장가).mp3"
  ],
  [
    "2026-08-08",
    "songs/marshmallow (마쉬멜로우).mp3"
  ],
  [
    "2026-08-09",
    "songs/Meaning of you (너의 의미 (feat. 김창완)).mp3"
  ],
  [
    "2026-08-10",
    "songs/Rain Drop (Japanese Version).mp3"
  ],
  [
    "2026-08-11",
    "songs/Rain Drop (Rain Drop).mp3"
  ],
  [
    "2026-08-12",
    "songs/Red Queen (feat.Zion.T) (RED QUEEN (FEAT. ZION.T)).mp3"
  ],
  [
    "2026-08-13",
    "songs/Red Sneakers (빨간 운동화).mp3"
  ],
  [
    "2026-08-14",
    "songs/Scary Fairy Tale (잔혹동화).mp3"
  ],
  [
    "2026-08-15",
    "songs/Sea Of Moonlight (달빛바다).mp3"
  ],
  [
    "2026-08-16",
    "songs/Secret (비밀).mp3"
  ],
  [
    "2026-08-17",
    "songs/Secret Garden (비밀의 화원).mp3"
  ],
  [
    "2026-08-18",
    "songs/Shh.. (Feat. HYEIN, WONSUN JOE & Special Narr. Patti Kim) (Shh.. (Feat. 혜인(HYEIN), 조원선....mp3"
  ],
  [
    "2026-08-19",
    "songs/Shoes (새 신발).mp3"
  ],
  [
    "2026-08-20",
    "songs/Twenty-three (스물셋).mp3"
  ],
  [
    "2026-08-21",
    "songs/ugly duckling (미운 오리).mp3"
  ],
  [
    "2026-08-22",
    "songs/ugly duckling (미운 오리).mp3"
  ],
  [
    "2026-08-23",
    "songs/Uncle (feat. Lee Juck) (삼촌 (feat. 이적)).mp3"
  ],
  [
    "2026-08-24",
    "songs/unlucky (unlucky).mp3"
  ],
  [
    "2026-08-25",
    "songs/voice-mail-korean.mp3"
  ],
  [
    "2026-08-26",
    "songs/Voice-Mail.mp3"
  ],
  [
    "2026-08-27",
    "songs/Wait (기다려).mp3"
  ],
  [
    "2026-08-28",
    "songs/Walk with me, girl (feat. Choi Baek-ho) (아이야 나랑 걷자 (feat.최백호)).mp3"
  ],
  [
    "2026-08-29",
    "songs/Walk with me, girl (feat. Choi Baek-ho) (아이야 나랑 걷자 (feat.최백호)).mp3"
  ],
  [
    "2026-08-30",
    "songs/BBIBBI (삐삐).mp3"
  ],
  [
    "2026-08-31",
    "songs/Beautiful Dancer.mp3"
  ]
]) {
    game.STATE.mode = 'daily';
    game.STATE.dailyDate = date;
    game.init();
    assert.equal(game.STATE.song.file, file, date);
  }
});


test('result calendar opens, selects an archive and formats dates as day/month', async t => {
  const {game, el, w} = await setup(t);
  game.nextTurn(game.STATE.song.title);
  await flush();
  const stats = JSON.stringify(game.getStats());
  const saved = w.localStorage.getItem('iu-heardle-daily-' + game.STATE.dailyDate);
  el('againBtn').click();
  assert.equal(w.localStorage.getItem('iu-heardle-daily-' + game.STATE.dailyDate), saved);
  game.init();
  await flush();
  el('resultCalendarBtn').click();
  assert.equal(el('resultModal').classList.contains('show'), false);
  assert.equal(el('calendarModal').classList.contains('show'), true);
  assert.equal(JSON.stringify(game.getStats()), stats);
  const card = el('calendarGrid').children[1];
  const date = card.dataset.date;
  card.click();
  assert.equal(game.STATE.mode, 'daily');
  assert.equal(game.STATE.dailyDate, date);
  const [, month, day] = date.split('-');
  assert.ok(el('dailyBannerText').textContent.endsWith(`(${day}/${month})`));
  assert.equal(card.querySelector('.cal-date').textContent, `${day}/${month}`);
  assert.equal(el('calendarModal').classList.contains('show'), false);
});
