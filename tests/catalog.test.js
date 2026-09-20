const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {renderDatabase, validateCatalog} = require('../generate-db');
const catalog = require('../catalog/catalog.json');
const root = path.join(__dirname, '..');

test('every original MP3 is covered by reviewed metadata or a duplicate alias', () => {
  validateCatalog(catalog);
  assert.equal(catalog.dailyPools[0].files.length, 153);
  assert.equal(Object.keys(catalog.duplicateFiles).length, 7);
  assert.ok(catalog.songs.length >= 146);
  assert.equal(fs.readFileSync(path.join(root, 'database.js'), 'utf8'), renderDatabase(catalog));
  for (const album of Object.values(catalog.albums)) {
    assert.match(album.cover, /^covers\/[a-z0-9-]+\.jpg$/, album.title);
    const bytes = fs.readFileSync(path.join(root, album.cover));
    assert.ok(bytes.length > 1024, album.title);
    assert.deepEqual([...bytes.subarray(0, 3)], [255, 216, 255], album.title);
  }
  assert.ok(catalog.songs.every(song => !song.cover && !song.coverFallback));
});

test('metadata regression cases match their actual release, year and artwork', () => {
  const context = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'database.js'), 'utf8') + '\nthis.songs = musicasIU;', context);
  const cases = [
    ['The Red Shoes (분홍신)', 'Modern Times', '2013'],
    ['Wisdom Tooth (사랑니)', 'Last Fantasy', '2011'],
    ['Love Alone (그렇게 사랑은)', 'Palette', '2017'],
    ['Good Day (Japanese Version)', 'Good Day (Japanese Version) - EP', '2012'],
    ['Rain Drop (Japanese Version)', 'Good Day (Japanese Version) - EP', '2012'],
    ['You & I (Japanese Version)', 'You & I (Japanese Version) - Single', '2012'],
    ['Shounen Jidai', 'You & I (Japanese Version) - Single', '2012'],
    ['Fairytale', 'Can You Hear Me? - EP', '2013'],
    ['Follow The Moon', 'Monday Afternoon - EP', '2013'],
    ['Voice-Mail (Japanese Version)', 'Can You Hear Me? - EP', '2013'],
    ['Voice-Mail (Korean Version)', 'Modern Times', '2013'],
    ['October 4th (10월 4일)', 'A Flower Bookmark 3', '2025'],
    ['Never Ending Story (Never Ending Story)', 'A Flower Bookmark 3', '2025'],
    ['What I\'m doing slow (느리게 하는 일)', 'Real', '2010'],
    ['Graduation Day (졸업하는 날)', 'Growing Up', '2009'],
    ['heart beating date (두근 두근 데이트)', 'IU...IM', '2009'],
    ['You (너)', 'Pieces - EP', '2021']
  ];
  for (const [title, album, year] of cases) {
    const song = context.songs.find(s => s.title === title);
    assert.ok(song, title);
    assert.equal(song.album, album, title);
    assert.equal(song.year, year, title);
    assert.equal(song.cover, catalog.albums[album].cover, title);
  }
  assert.ok(context.songs.every(song => !/gif|IU Release/.test(song.cover + song.album)));
});

test('different languages and arrangements remain playable separate entries', () => {
  for (const title of [
    'Good day (좋은 날)', 'Good Day (Japanese Version)',
    'Voice-Mail (Korean Version)', 'Voice-Mail (Japanese Version)',
    'Only I Didn\'t Know (with Pianist Kim Gwang-min)', 'Only I didn\'t know (나만 몰랐던 이야기)',
    'Well… (있잖아 (ROCK VER.))', 'Well… (feat. Mario) (있잖아 (feat. 마리오))',
    'lost child (미아)', 'A Lost Child (ACOUSTIC VER.) (미아 (ACOUSTIC VER.))'
  ]) assert.ok(catalog.songs.some(song => song.title === title), title);
});

test('pending downloads never enter the playable catalogue', () => {
  const pending = require('../catalog/pending-songs.json');
  for (const song of pending) {
    assert.equal(catalog.songs.some(active => active.file === song.file), false);
  }
  for (const song of catalog.songs.filter(s => s.album === 'Unknown Planet - Single')) {
    const bytes = fs.readFileSync(path.join(root, song.file));
    // CI checkout uses LFS pointers; actual audio is decoded by import-assets.py before activation.
    const pointer = bytes.toString('utf8', 0, 50).startsWith('version https://git-lfs.github.com/spec/v1');
    assert.ok(pointer || bytes.length > 100000, song.title);
  }
});
