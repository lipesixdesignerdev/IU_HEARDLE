// ─── CONFIG & STATE ───
const CONFIG = {
  DURATIONS: [1, 2, 4, 7, 11, 16],
  KEYS: { STATS: 'iu-heardle-stats', THEME: 'iu-heardle-theme', VOLUME: 'iu-heardle-vol', MODE: 'iu-heardle-mode' },
  THEMES: ['dark', 'light', 'neon', 'sepia', 'abyss'],
  I18N: {
    PT: { skipFinal: '⏭ Revelar resposta', skipped: 'Pulou', yearLabel: 'Ano', albumLabel: 'Álbum', invalidGuess: 'Selecione uma música válida da lista.', audioError: 'Não foi possível tocar o áudio. Tente novamente.', loading: 'Carregando áudio…', calPlay: '▶ Jogar', calLost: '🟥 Errou', calPlaying: '🟨 Jogando', calToday: '⭐ Hoje', resetConfirm: 'Resetar estatísticas?', shareError: 'Não foi possível copiar o resultado.', title: "IU Heardle — Adivinhe a Música", status: "Pronto! Clique ▶", placeholder: "seu palpite aqui…", skip: "⏭ Pular (+{seconds}s)", confirm: "✓ Confirmar", won: "🎉 Você acertou!", lost: "😔 Não foi dessa vez!", playAgain: "🔄 Jogar Novamente", stats: "📊 Estatísticas", labels: ["Partidas", "Vitórias", "Sequência", "Melhor"], dist: "Distribuição", reset: "🗑 Resetar", close: "Fechar", pct: "de aproveitamento", credit: "Feito com ❤ por", copied: "Copiado para a área de transferência!", hint: "💡 Ver Dica (Ano/Álbum)", watchMV: "🎬 Assistir MV no YouTube", listenAudio: "🎵 Ouvir no YouTube Music", dailyBanner: "📅 Desafio Diário", practiceBanner: "♾️ Modo Prática (Ilimitado)", dailyBtn: "📅 Diário", practiceBtn: "♾️ Prática", statsTitle: "Estatísticas", newSong: "Nova música", calTitle: "📅 Arquivo Diário", calSub: "Jogue desafios anteriores ou reveja seus resultados:", calBtnTitle: "Calendário de Desafios", playFull: "Tocar Música", pauseFull: "Pausar Música" },
    EN: { skipFinal: '⏭ Reveal answer', skipped: 'Skipped', yearLabel: 'Year', albumLabel: 'Album', invalidGuess: 'Select a valid song from the list.', audioError: 'Could not play audio. Please try again.', loading: 'Loading audio…', calPlay: '▶ Play', calLost: '🟥 Lost', calPlaying: '🟨 In progress', calToday: '⭐ Today', resetConfirm: 'Reset statistics?', shareError: 'Could not copy the result.', title: "IU Heardle — Guess the Song", status: "Ready! Click ▶", placeholder: "your guess here…", skip: "⏭ Skip (+{seconds}s)", confirm: "✓ Confirm", won: "🎉 You got it!", lost: "😔 Not this time!", playAgain: "🔄 Play Again", stats: "📊 Statistics", labels: ["Played", "Wins", "Streak", "Best"], dist: "Distribution", reset: "🗑 Reset", close: "Close", pct: "win rate", credit: "Made with ❤ by", copied: "Copied to clipboard!", hint: "💡 Show Hint (Year/Album)", watchMV: "🎬 Watch MV on YouTube", listenAudio: "🎵 Listen on YouTube Music", dailyBanner: "📅 Daily Challenge", practiceBanner: "♾️ Practice Mode (Unlimited)", dailyBtn: "📅 Daily", practiceBtn: "♾️ Practice", statsTitle: "Statistics", newSong: "New Song", calTitle: "📅 Daily Archive", calSub: "Play past daily challenges or review your results:", calBtnTitle: "Challenge Calendar", playFull: "Play Song", pauseFull: "Pause Song" },
    ES: { skipFinal: '⏭ Revelar respuesta', skipped: 'Saltó', yearLabel: 'Año', albumLabel: 'Álbum', invalidGuess: 'Selecciona una canción válida de la lista.', audioError: 'No se pudo reproducir el audio. Inténtalo de nuevo.', loading: 'Cargando audio…', calPlay: '▶ Jugar', calLost: '🟥 Perdió', calPlaying: '🟨 En progreso', calToday: '⭐ Hoy', resetConfirm: '¿Reiniciar estadísticas?', shareError: 'No se pudo copiar el resultado.', title: "IU Heardle — Adivina la Canción", status: "¡Listo! Clic ▶", placeholder: "tu respuesta aquí…", skip: "⏭ Saltar (+{seconds}s)", confirm: "✓ Confirmar", won: "🎉 ¡Lo lograste!", lost: "😔 ¡Otra vez será!", playAgain: "🔄 Jugar de Nuevo", stats: "📊 Estadísticas", labels: ["Partidas", "Victorias", "Racha", "Mejor"], dist: "Distribución", reset: "🗑 Reiniciar", close: "Cerrar", pct: "de rendimiento", credit: "Hecho com ❤ por", copied: "¡Copiado al portapapeles!", hint: "💡 Ver Pista (Año/Álbum)", watchMV: "🎬 Ver MV en YouTube", listenAudio: "🎵 Escuchar en YouTube Music", dailyBanner: "📅 Desafío Diario", practiceBanner: "♾️ Modo Prática (Ilimitado)", dailyBtn: "📅 Diario", practiceBtn: "♾️ Práctica", statsTitle: "Estadísticas", newSong: "Nueva Canción", calTitle: "📅 Archivo Diario", calSub: "Juega desafíos pasados o revisa tus resultados:", calBtnTitle: "Calendario de Desafíos", playFull: "Reproducir Canción", pauseFull: "Pausar Canción" }
  }
};

const OFFICIAL_MVS = {
  "Celebrity (Celebrity)": "https://www.youtube.com/watch?v=0-q1KAfFPUU",
  "LILAC (라일락)": "https://www.youtube.com/watch?v=v7bnOxV4jAc",
  "Coin (Coin)": "https://www.youtube.com/watch?v=86BST8NScxU",
  "eight(Prod.&Feat. SUGA of BTS)": "https://www.youtube.com/watch?v=TgOu00Mf3kI",
  "Blueming (Blueming)": "https://www.youtube.com/watch?v=D1PvIWdJ8xo",
  "above the time (시간의 바깥)": "https://www.youtube.com/watch?v=R3Fxdqqb048",
  "BBIBBI (삐삐)": "https://www.youtube.com/watch?v=nM0xDI5Rxy0",
  "Palette (feat. G-DRAGON) (팔레트 (feat. G-DRAGON))": "https://www.youtube.com/watch?v=d9IxdwEFkLzE",
  "Through the Night (밤편지)": "https://www.youtube.com/watch?v=BzYnNdJhD60",
  "Ending Scene (이런 엔딩)": "https://www.youtube.com/watch?v=BzYnNdJhD60",
  "Autumn morning (가을 아침)": "https://www.youtube.com/watch?v=C4AKLLBX2iU",
  "Last night story (어젯밤 이야기)": "https://www.youtube.com/watch?v=cMPEd8m79hA",
  "Twenty-three (스물셋)": "https://www.youtube.com/watch?v=42Gtm4-g2r4",
  "Friday (feat.Jang Yi-jeong) (금요일에 만나요 (feat.장이정 of HISTORY))": "https://www.youtube.com/watch?v=EiVmQ96VT72",
  "The Red Shoes (분홍신)": "https://www.youtube.com/watch?v=Q051VXA65T4",
  "Every End of the Day (하루 끝)": "https://www.youtube.com/watch?v=f_iQRO5BdCM",
  "Good day (좋은 날)": "https://www.youtube.com/watch?v=jeqdYqsrsA0",
  "Good Day (Japanese Version)": "https://www.youtube.com/watch?v=jeqdYqsrsA0",
  "Only I didn't know (나만 몰랐던 이야기)": "https://www.youtube.com/watch?v=UpuWLy3Pjfc",
  "Love wins all (Love wins all)": "https://www.youtube.com/watch?v=JleoAppxi0o",
  "Holssi (홀씨)": "https://www.youtube.com/watch?v=m3dZaF_X0mU",
  "Shopper (Shopper)": "https://www.youtube.com/watch?v=r06Z_a15mE8",
  "strawberry moon (strawberry moon)": "https://www.youtube.com/watch?v=sqgxcCjD04s",
  "Peach (복숭아)": "https://www.youtube.com/watch?v=132KqQW4-34",
  "Sogyeokdong": "https://www.youtube.com/watch?v=GHu39FEyI24",
  "lost child (미아)": "https://www.youtube.com/watch?v=0ZpL54d00_k",
  "Boo (BOO)": "https://www.youtube.com/watch?v=gT8M9q6h98o",
  "marshmallow (마쉬멜로우)": "https://www.youtube.com/watch?v=p4v380gQ9jU",
  "Nitpicking (잔소리 (with 2AM 슬옹))": "https://www.youtube.com/watch?v=a3g_40Wk-2Q",
  "Meaning of you (너의 의미 (feat. 김창완))": "https://www.youtube.com/watch?v=4L-H_dXSNQQ",
  "Knees (무릎)": "https://www.youtube.com/watch?v=5159sBA-Y_w",
  "My old story (나의 옛날이야기)": "https://www.youtube.com/watch?v=OU6y5jW9d3w",
  "Shh.. (Feat. HYEIN, WONSUN JOE & Special Narr. Patti Kim) (Shh.. (Feat. 혜인(HYEIN), 조원선...": "https://www.youtube.com/watch?v=V3zNydzEa8k"
};

function getSystemLanguage() {
  const sysLang = navigator.language || navigator.userLanguage;
  if (sysLang.toLowerCase().startsWith('pt')) return 'PT';
  if (sysLang.toLowerCase().startsWith('es')) return 'ES';
  return 'EN';
}

function getDailyDateString(offsetDays = 0) {
  const d = new Date();
  if (offsetDays !== 0) d.setDate(d.getDate() - offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const STATE = {
  song: null,
  attempt: 0,
  guesses: [],
  isPlaying: false,
  audio: new Audio(),
  timer: null,
  over: false,
  lang: localStorage.getItem('iu-heardle-lang') || getSystemLanguage(),
  theme: localStorage.getItem(CONFIG.KEYS.THEME) || 'dark',
  mode: localStorage.getItem(CONFIG.KEYS.MODE) || 'daily',
  dailyDate: getDailyDateString(),
  volume: localStorage.getItem(CONFIG.KEYS.VOLUME) === null ? 1 : Math.min(1, Math.max(0, Number(localStorage.getItem(CONFIG.KEYS.VOLUME)) || 0)),
  isMuted: false,
  artworkUrl: null,
  artworkPromise: null,
  audioPromise: null,
  gameId: 0,
  playId: 0
};

const DOM = { get: id => document.getElementById(id), qs: s => document.querySelector(s), qsa: s => document.querySelectorAll(s) };
const i18n = k => (CONFIG.I18N[STATE.lang] || CONFIG.I18N.EN)[k];
const escapeHTML = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));

// ─── UTILITIES & HELPERS ───
function getYouTubeLink(song) {
  if (song && OFFICIAL_MVS[song.title]) {
    return { url: OFFICIAL_MVS[song.title], isMV: true };
  }
  const cleanTitle = (song ? song.title : '').replace(/\([^)]+\)/g, '').trim();
  return {
    url: `https://music.youtube.com/search?q=${encodeURIComponent('IU ' + cleanTitle)}`,
    isMV: false
  };
}

function getSongYear(song) {
  if (!song) return '----';
  return song.year || '2017';
}

function getDailySongIndex(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % musicasIU.length;
}

// ─── UI BUILDERS ───
function initUI() {
  const buildOpts = (id, items, attr, active, fn) => {
    const c = DOM.get(id);
    c.innerHTML = items.map(i => `<button class="${attr}-btn ${i===active?'active':''}" data-val="${i}">${i.toUpperCase()}</button>`).join('');
    c.onclick = e => { const v = e.target.dataset.val; if(v) fn(v); };
  };

  // Themes
  DOM.get('themeOptions').innerHTML = CONFIG.THEMES.map(t => `<button class="theme-option ${t===STATE.theme?'active':''}" data-theme="${t}"><span class="theme-dot dot-${t}"></span> ${t[0].toUpperCase()+t.slice(1)}</button>`).join('');
  DOM.get('themeOptions').onclick = e => { const t = e.target.closest('button')?.dataset.theme; if(t) setTheme(t); };
  setTheme(STATE.theme);

  // Languages
  buildOpts('langSwitcher', Object.keys(CONFIG.I18N), 'lang', STATE.lang, setLanguage);
  setLanguage(STATE.lang);

  // Volume
  STATE.audio.volume = STATE.volume;
  const volSlider = DOM.get('volSlider');
  if (volSlider) {
    volSlider.value = STATE.volume;
    volSlider.oninput = e => {
      STATE.volume = parseFloat(e.target.value);
      STATE.audio.volume = STATE.volume;
      STATE.isMuted = STATE.volume === 0;
      STATE.audio.muted = STATE.isMuted;
      localStorage.setItem(CONFIG.KEYS.VOLUME, STATE.volume);
      updateVolIcon();
    };
  }
  updateVolIcon();
  const volBtn = DOM.get('volBtn');
  if (volBtn) {
    volBtn.onclick = () => {
      STATE.isMuted = !STATE.isMuted;
      STATE.audio.muted = STATE.isMuted;
      updateVolIcon();
    };
  }

  // Mode Switcher
  DOM.get('modeDailyBtn').onclick = () => { STATE.dailyDate = getDailyDateString(); setGameMode('daily'); };
  DOM.get('modePracticeBtn').onclick = () => setGameMode('practice');
  setGameMode(STATE.mode);

  // Hint Button
  const hintBtn = DOM.get('hintBtn');
  if (hintBtn) {
    hintBtn.onclick = () => {
      const hintBox = DOM.get('hintBox');
      const isShow = hintBox.style.display !== 'none';
      if (isShow) {
        hintBox.style.display = 'none';
      } else {
        updateHint();
        hintBox.style.display = 'block';
      }
    };
  }

  // Calendar Archive Modal
  if (DOM.get('calendarBtn')) DOM.get('calendarBtn').onclick = openCalendarModal;
  if (DOM.get('calendarCloseBtn')) DOM.get('calendarCloseBtn').onclick = () => DOM.get('calendarModal').classList.remove('show');
}

function updateVolIcon() {
  const volBtn = DOM.get('volBtn');
  if (!volBtn) return;
  if (STATE.isMuted || STATE.volume === 0) {
    volBtn.textContent = '🔇';
  } else if (STATE.volume < 0.5) {
    volBtn.textContent = '🔉';
  } else {
    volBtn.textContent = '🔊';
  }
}

const THEME_ICONS = {
  dark: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>',
  light: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>',
  neon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>',
  sepia: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /></svg>',
  abyss: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>'
};

function setTheme(t) {
  STATE.theme = t; document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem(CONFIG.KEYS.THEME, t);
  DOM.qsa('.theme-option').forEach(b => b.classList.toggle('active', b.dataset.theme === t));
  DOM.get('themeOptions').classList.remove('visible');
  if(DOM.get('themeToggleBtn')) DOM.get('themeToggleBtn').innerHTML = THEME_ICONS[t] || THEME_ICONS.dark;
}

function setLanguage(l) {
  l = CONFIG.I18N[l] ? l : getSystemLanguage();
  STATE.lang = l;
  localStorage.setItem('iu-heardle-lang', l);
  document.documentElement.lang = l.toLowerCase();
  const txt = CONFIG.I18N[l];
  document.title = txt.title;
  DOM.get('statusText').textContent = txt.status; 
  DOM.get('songInput').placeholder = txt.placeholder;
  updateSkipLabel();
  DOM.get('confirmBtn').textContent = txt.confirm;
  if(DOM.get('creditText')) DOM.get('creditText').textContent = txt.credit;
  DOM.get('againBtn').textContent = txt.playAgain;
  if(DOM.get('hintBtn')) DOM.get('hintBtn').textContent = txt.hint;
  if(DOM.get('modeDailyBtn')) DOM.get('modeDailyBtn').textContent = txt.dailyBtn;
  if(DOM.get('modePracticeBtn')) DOM.get('modePracticeBtn').textContent = txt.practiceBtn;
  if(DOM.get('statsBtn')) DOM.get('statsBtn').title = txt.statsTitle;
  if(DOM.get('newBtn')) DOM.get('newBtn').title = txt.newSong;
  if(DOM.get('calendarBtn')) DOM.get('calendarBtn').title = txt.calBtnTitle;
  if(DOM.get('calendarTitle')) DOM.get('calendarTitle').textContent = txt.calTitle;
  if(DOM.get('calendarSub')) DOM.get('calendarSub').textContent = txt.calSub;
  DOM.qsa('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.val === l));
  updateDailyBannerText();
  updateHint();
  updateGameView();
  DOM.get('calendarCloseBtn').textContent = txt.close;
  if (DOM.get('calendarModal').classList.contains('show')) openCalendarModal();
  if (STATE.over) {
    DOM.get('resultTitle').textContent = i18n(STATE.guesses.at(-1)?.correct ? 'won' : 'lost');
    updateModalPlayBtn(!STATE.audio.paused);
    DOM.get('ytBtnText').textContent = i18n(getYouTubeLink(STATE.song).isMV ? 'watchMV' : 'listenAudio');
  }
}

function updateDailyBannerText() {
  const bannerText = DOM.get('dailyBannerText');
  const newBtn = DOM.get('newBtn');
  const dateStr = STATE.dailyDate || getDailyDateString();
  
  if (STATE.mode === 'daily') {
    if (bannerText) bannerText.textContent = `${i18n('dailyBanner')} (${dateStr})`;
    if (newBtn) newBtn.style.display = 'none';
  } else {
    if (bannerText) bannerText.textContent = i18n('practiceBanner');
    if (newBtn) newBtn.style.display = 'inline-flex';
  }
}

function setGameMode(mode) {
  STATE.mode = mode;
  localStorage.setItem(CONFIG.KEYS.MODE, mode);
  DOM.get('modeDailyBtn').classList.toggle('active', mode === 'daily');
  DOM.get('modePracticeBtn').classList.toggle('active', mode === 'practice');
  if (DOM.get('resultModal')) DOM.get('resultModal').classList.remove('show');
  
  const dailyBanner = DOM.get('dailyBanner');
  if (dailyBanner) dailyBanner.style.display = 'block';
  updateDailyBannerText();
  init();
}

// ─── AUDIO BLOB LOADER ───
let _currentBlobUrl = null;
let audioController = null;
async function loadAudioBlob(src) {
  audioController?.abort();
  const controller = new AbortController();
  audioController = controller;
  STATE.audio.removeAttribute('src');
  STATE.audio.load();
  if (_currentBlobUrl) URL.revokeObjectURL(_currentBlobUrl);
  _currentBlobUrl = null;
  try {
    const res = await fetch(src, { signal: controller.signal });
    if (!res.ok) throw new Error('Audio HTTP ' + res.status);
    const blob = await res.blob();
    if (controller !== audioController) return;
    _currentBlobUrl = URL.createObjectURL(blob);
    STATE.audio.src = _currentBlobUrl;
  } catch (e) {
    if (controller !== audioController || controller.signal.aborted) return;
    STATE.audio.src = src;
  }
}

// ─── ARTWORK PREFETCH ───
async function fetchArtwork(song) {
  if (!song) return null;
  if (song.cover) return song.cover;
  const cleanTitle = song.title.replace(/\([^)]+\)/g, '').trim();
  const queries = [
    `artist:"IU" track:"${cleanTitle}"`,
    `artist:"IU" track:"${song.title}"`,
    `artist:"IU" album:"${song.album}"`,
  ];
  const fetchDeezerJSONP = (q) => new Promise((resolve) => {
    const cb = 'dz_' + Math.floor(Math.random()*1000000);
    const finish = data => { clearTimeout(timeout); delete window[cb]; s.remove(); resolve(data); };
    const timeout = setTimeout(() => finish({data:[]}), 4000);
    window[cb] = finish;
    const s = document.createElement('script');
    s.src = `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=3&output=jsonp&callback=${cb}`;
    s.onerror = () => finish({data:[]});
    document.head.appendChild(s);
  });

  for (const q of queries) {
    try {
      const data = await fetchDeezerJSONP(q);
      if (data && data.data && data.data.length > 0) {
        const cover = data.data[0].album?.cover_xl || data.data[0].album?.cover_big || data.data[0].album?.cover_medium;
        if (cover) return cover;
      }
    } catch(e) { }
  }
  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent('IU ' + cleanTitle)}&entity=song&country=kr&limit=5`, { signal: AbortSignal.timeout(4000) });
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const match = data.results.find(r => r.artistName && r.artistName.includes('IU')) || data.results[0];
      if (match && match.artworkUrl100) return match.artworkUrl100.replace('100x100bb', '600x600bb');
    }
  } catch(e) {}
  return null;
}

// ─── GAME CORE ───
function init() {
  if (typeof musicasIU === 'undefined') return alert("Erro: database.js não encontrado!");
  const gameId = ++STATE.gameId;
  STATE.over = false; STATE.attempt = 0; STATE.guesses = [];
  pauseAudio();
  STATE.audio.pause();
  STATE.audio.currentTime = 0;

  const hintBox = DOM.get('hintBox');
  if (hintBox) hintBox.style.display = 'none';

  if (STATE.mode === 'daily') {
    const dateStr = STATE.dailyDate || getDailyDateString();
    const idx = getDailySongIndex(dateStr);
    STATE.song = musicasIU[idx];
    
    // Check if daily game state exists for date
    const savedDaily = localStorage.getItem(`iu-heardle-daily-${dateStr}`);
    if (savedDaily) {
      try {
        const parsed = JSON.parse(savedDaily);
        STATE.attempt = parsed.attempt || 0;
        STATE.guesses = parsed.guesses || [];
        STATE.over = parsed.over || false;
      } catch(e){}
    }
  } else {
    // Practice Mode: Pick a random song (different from current if possible)
    let newSong;
    do {
      newSong = musicasIU[Math.floor(Math.random() * musicasIU.length)];
    } while (musicasIU.length > 1 && STATE.song && newSong.title === STATE.song.title);
    STATE.song = newSong;
  }

  STATE.artworkUrl = null;
  STATE.artworkPromise = fetchArtwork(STATE.song).then(url => { if (gameId === STATE.gameId) STATE.artworkUrl = url; return url; });
  STATE.audioPromise = loadAudioBlob(STATE.song.file);

  DOM.get('waveform').innerHTML = '<div class="wave-bar" style="height:10px;"></div>'.repeat(25);
  buildAlphaBrowser();
  resetAlpha();
  DOM.get('statusText').textContent = i18n('status');
  updateTimer(0);
  updateGameView();

  if (STATE.over) {
    const won = STATE.guesses[STATE.guesses.length - 1]?.correct || false;
    finishGame(won, true);
  }
}

function clipDuration() {
  return CONFIG.DURATIONS[Math.min(STATE.attempt, CONFIG.DURATIONS.length - 1)];
}

function updateTimer(elapsed = 0) {
  const dur = clipDuration();
  const time = Math.min(elapsed, dur);
  DOM.get('timerFill').style.width = `${time / dur * 100}%`;
  DOM.get('timerLabel').textContent = `${time.toFixed(1)}s / ${dur}s`;
}

function updateSkipLabel() {
  const next = CONFIG.DURATIONS[STATE.attempt + 1];
  DOM.get('skipBtn').textContent = next === undefined ? i18n('skipFinal') : i18n('skip').replace('{seconds}', next - clipDuration());
}

function updateHint() {
  if (STATE.song) DOM.get('hintContent').textContent = `💡 ${i18n('yearLabel')}: ${getSongYear(STATE.song)} | ${i18n('albumLabel')}: ${STATE.song.album || '—'}`;
}

async function handlePlay() {
  if (!STATE.song || STATE.over) return;
  if (STATE.isPlaying) return pauseAudio();
  const playId = ++STATE.playId;
  STATE.isPlaying = true;
  DOM.get('playBtn').textContent = '⏸';
  DOM.get('statusText').textContent = i18n('loading');
  try {
    await STATE.audioPromise;
    if (playId !== STATE.playId) return;
    STATE.audio.currentTime = 0;
    updateTimer(0);
    await STATE.audio.play();
    if (playId !== STATE.playId) return;
    DOM.get('statusText').textContent = i18n('status');
    DOM.get('waveform').classList.add('playing');
    STATE.timer = setInterval(() => {
      updateTimer(STATE.audio.currentTime);
      if (STATE.audio.currentTime >= clipDuration()) pauseAudio();
    }, 25);
  } catch (e) {
    if (playId !== STATE.playId) return;
    pauseAudio();
    DOM.get('statusText').textContent = i18n('audioError');
  }
}

function pauseAudio() {
  STATE.playId++;
  STATE.audio.pause(); clearInterval(STATE.timer); STATE.timer = null; STATE.isPlaying = false;
  DOM.get('playBtn').textContent = '▶'; DOM.get('waveform').classList.remove('playing');
  updateModalPlayBtn(false);
}

async function playFullAudio() {
  const playId = ++STATE.playId;
  try {
    await STATE.audioPromise;
    if (playId !== STATE.playId || !STATE.over) return;
    await STATE.audio.play();
    if (playId === STATE.playId) updateModalPlayBtn(true);
  } catch (e) {
    if (playId !== STATE.playId) return;
    updateModalPlayBtn(false);
    DOM.get('statusText').textContent = i18n('audioError');
  }
}

STATE.audio.onended = () => pauseAudio();
STATE.audio.onerror = () => { pauseAudio(); DOM.get('statusText').textContent = i18n('audioError'); };

function nextTurn(guessVal, skipped = false) {
  if (STATE.over) return;
  if (!skipped) {
    const song = musicasIU.find(s => s.title.toLowerCase() === guessVal.trim().toLowerCase());
    if (!song) {
      DOM.get('statusText').textContent = i18n('invalidGuess');
      return;
    }
    guessVal = song.title;
  }
  pauseAudio();
  DOM.get('statusText').textContent = i18n('status');
  DOM.get('autocomplete').classList.remove('show');
  const correct = !skipped && guessVal.toLowerCase() === STATE.song.title.toLowerCase();
  STATE.guesses.push({ title: skipped ? '' : guessVal, correct, skipped });
  
  if (correct || !skipped) DOM.get('songInput').value = '';
  
  if (!correct) {
    STATE.attempt++;
    const inp = DOM.get('songInput');
    inp.classList.remove('shake');
    void inp.offsetWidth;
    inp.classList.add('shake');
  }
  
  // Save Daily Mode State
  if (STATE.mode === 'daily') {
    const dateStr = STATE.dailyDate || getDailyDateString();
    localStorage.setItem(`iu-heardle-daily-${dateStr}`, JSON.stringify({
      attempt: STATE.attempt,
      guesses: STATE.guesses,
      over: correct || STATE.attempt >= 6
    }));
  }

  updateTimer(0);
  updateGameView();
  if (correct || STATE.attempt >= 6) finishGame(correct);
}

function updateGameView() {
  updateSkipLabel();
  DOM.get('barsContainer').innerHTML = Array(6).fill(0).map((_, i) => {
    const g = STATE.guesses[i];
    const cls = !g ? '' : g.correct ? ' correct' : g.skipped ? ' skipped' : ' wrong';
    return `<div class="bar${cls}"></div>`;
  }).join('');
  DOM.get('guessesList').innerHTML = STATE.guesses.map(g => `<div class="guess-item">${escapeHTML(g.skipped ? i18n('skipped') : g.title)}</div>`).join('');
}

function updateModalPlayBtn(isPlaying) {
  const icon = DOM.get('modalPlayIcon');
  const text = DOM.get('modalPlayText');
  if (!icon || !text) return;
  if (isPlaying) {
    icon.textContent = '⏸';
    text.textContent = i18n('pauseFull');
  } else {
    icon.textContent = '▶';
    text.textContent = i18n('playFull');
  }
}

async function finishGame(won, restored = false) {
  const gameId = STATE.gameId;
  STATE.over = true; pauseAudio();
  
  if (!restored) {
    const stats = getStats();
    stats.played++;
    if (won) { stats.wins++; stats.streak++; stats.best = Math.max(stats.best, stats.streak); stats.dist[STATE.attempt+1] = (stats.dist[STATE.attempt+1]||0)+1; }
    else stats.streak = 0;
    localStorage.setItem(CONFIG.KEYS.STATS, JSON.stringify(stats));
  }

  DOM.get('resultModal').classList.add('show');
  DOM.get('resultTitle').textContent = i18n(won ? 'won' : 'lost');
  DOM.get('resultSongName').textContent = STATE.song.title;
  DOM.get('resultAlbum').textContent = STATE.song.album;

  // Full Audio Autoplay on Win/Finish
  STATE.audio.currentTime = 0;
  updateModalPlayBtn(false);
  if (!restored) playFullAudio();

  const modalPlayBtn = DOM.get('modalPlayBtn');
  if (modalPlayBtn) {
    modalPlayBtn.onclick = () => {
      if (STATE.audio.paused) playFullAudio();
      else pauseAudio();
    };
  }

  // YouTube MV / Audio Button Setup
  const yt = getYouTubeLink(STATE.song);
  const ytBtn = DOM.get('ytBtn');
  const ytBtnText = DOM.get('ytBtnText');
  if (ytBtn && ytBtnText) {
    ytBtn.href = yt.url;
    ytBtnText.textContent = i18n(yt.isMV ? 'watchMV' : 'listenAudio');
  }

  const albumArt = DOM.get('albumArt');
  const albumFallback = DOM.get('albumFallback');
  albumArt.removeAttribute('src');
  albumArt.style.display = 'none';
  albumFallback.style.display = 'flex';
  albumArt.onerror = () => { albumArt.style.display = 'none'; albumFallback.style.display = 'flex'; };

  if (won && !restored && typeof confetti === 'function') confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00d4ff', '#0070f3', '#ff00ff', '#ffffff'] });
  if (DOM.get('shareBtn')) DOM.get('shareBtn').style.display = 'flex';

  const url = await STATE.artworkPromise;
  if (gameId !== STATE.gameId || !STATE.over) return;
  if (url) {
    albumArt.style.display = '';
    albumFallback.style.display = 'none';
    albumArt.src = url;
    if (DOM.get('ambientBg')) DOM.get('ambientBg').src = url;
  } else {
    albumArt.style.display = 'none';
    albumFallback.style.display = 'flex';
  }
}

function shareResults() {
  const modeTag = STATE.mode === 'daily' ? `Daily (${STATE.dailyDate})` : 'Practice';
  const blocks = STATE.guesses.map(g => g.correct ? '🟩' : g.skipped ? '🟨' : '🟥').join('');
  const text = `🎵 IU Heardle [${modeTag}] - ${STATE.guesses[STATE.guesses.length-1]?.correct ? STATE.guesses.length : 'X'}/6\n${blocks}\n👉 https://kpopiuheardle.vercel.app`;
  Promise.resolve().then(() => navigator.clipboard.writeText(text)).then(() => alert(i18n('copied'))).catch(() => alert(i18n('shareError')));
}

// ─── CALENDAR ARCHIVE LOGIC ───
function openCalendarModal() {
  const grid = DOM.get('calendarGrid');
  if (!grid) return;
  const todayStr = getDailyDateString();
  const daysList = [];

  for (let i = 0; i < 24; i++) {
    daysList.push(getDailyDateString(i));
  }

  grid.innerHTML = daysList.map(dStr => {
    const parts = dStr.split('-');
    const displayDate = `${parts[2]}/${parts[1]}`;
    const rawSaved = localStorage.getItem(`iu-heardle-daily-${dStr}`);
    let statusCls = 'status-pending';
    let statusText = i18n('calPlay');

    if (rawSaved) {
      try {
        const parsed = JSON.parse(rawSaved);
        const lastGuess = parsed.guesses && parsed.guesses[parsed.guesses.length - 1];
        if (parsed.over) {
          if (lastGuess && lastGuess.correct) {
            statusCls = 'status-win';
            statusText = `🟩 ${parsed.guesses.length}/6`;
          } else {
            statusCls = 'status-loss';
            statusText = i18n('calLost');
          }
        } else {
          statusCls = 'status-today';
          statusText = i18n('calPlaying');
        }
      } catch(e){}
    } else if (dStr === todayStr) {
      statusCls = 'status-today';
      statusText = i18n('calToday');
    }

    return `<div class="cal-day-card ${statusCls}" data-date="${dStr}">
      <span class="cal-date">${displayDate}</span>
      <span class="cal-status-badge">${statusText}</span>
    </div>`;
  }).join('');

  grid.onclick = e => {
    const card = e.target.closest('.cal-day-card');
    if (card && card.dataset.date) {
      const selectedDate = card.dataset.date;
      STATE.dailyDate = selectedDate;
      DOM.get('calendarModal').classList.remove('show');
      setGameMode('daily');
    }
  };

  DOM.get('calendarModal').classList.add('show');
}

// ─── FEATURES: Alpha Browser & Autocomplete ───
let activeAcIndex = -1;

function buildAlphaBrowser() {
  const box = DOM.get('alphaBrowser');
  if (!box) return;
  box.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;padding:10px;background:var(--card);border:1px solid var(--border);border-radius:12px;';
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => {
    const has = musicasIU.some(s => s.title.toUpperCase().startsWith(l));
    return `<button data-l="${l}" ${!has?'disabled':''} style="width:26px;height:26px;font-size:11px;font-weight:700;border-radius:6px;border:1px solid ${has?'var(--border)':'transparent'};background:${has?'var(--bg)':'transparent'};color:${has?'var(--text)':'var(--muted)'};cursor:${has?'pointer':'default'}">${l}</button>`;
  }).join('');
  
  box.innerHTML = chars + `<button id="clrAlpha" style="width:26px;height:26px;border:1px solid var(--accent);color:var(--accent);background:transparent;border-radius:6px;margin-left:4px;cursor:pointer" title="Limpar">✕</button>`;
  
  box.onclick = e => {
    if (e.target.id === 'clrAlpha') { resetAlpha(); return; }
    const btn = e.target.closest('button[data-l]');
    if (!btn || btn.disabled) return;
    
    const isActive = btn.style.background === 'var(--accent)';
    resetAlpha();
    if (!isActive) {
      btn.style.cssText += ';background:var(--accent);color:#fff;border-color:var(--accent)';
      showAC(musicasIU.filter(s => s.title.toUpperCase().startsWith(btn.dataset.l)));
    }
  };
}

function resetAlphaHighlights() {
  DOM.qsa('#alphaBrowser button[data-l]').forEach(b => {
    if(!b.disabled) b.style.cssText += ';background:var(--bg);color:var(--text);border-color:var(--border)';
  });
}

function resetAlpha() {
  DOM.get('songInput').value = '';
  DOM.get('autocomplete').classList.remove('show');
  resetAlphaHighlights();
}

function showAC(list) {
  const ac = DOM.get('autocomplete');
  activeAcIndex = -1;
  if (!list || list.length === 0) {
    ac.classList.remove('show');
    ac.innerHTML = '';
    return;
  }
  ac.innerHTML = list.slice(0, 30).map((m, idx) => `<div class="ac-item" data-idx="${idx}" data-t="${m.title.replace(/"/g, '&quot;')}">${m.title}</div>`).join('');
  ac.classList.add('show');
}

function selectACItem(title) {
  const input = DOM.get('songInput');
  input.value = title;
  DOM.get('autocomplete').classList.remove('show');
  input.focus();
}

function updateACSelection(items) {
  items.forEach((item, i) => {
    item.classList.toggle('active', i === activeAcIndex);
    if (i === activeAcIndex) {
      item.scrollIntoView({ block: 'nearest' });
    }
  });
}

// ─── STATS ───
const getStats = () => JSON.parse(localStorage.getItem(CONFIG.KEYS.STATS)) || { played:0, wins:0, streak:0, best:0, dist:{} };

function openStats() {
  const s = getStats(), lbl = i18n('labels'), max = Math.max(...Object.values(s.dist), 1);
  DOM.get('statsGrid').innerHTML = [s.played, s.wins, s.streak, s.best].map((v,i) => `<div class="stat-box"><span class="stat-number">${v}</span><span class="stat-label">${lbl[i]}</span></div>`).join('');
  DOM.get('statsSubtitle').textContent = `${s.played ? Math.round((s.wins/s.played)*100) : 0}% ${i18n('pct')}`;
  DOM.get('distSection').innerHTML = `<p class="dist-title">${i18n('dist')}</p>` + Array(6).fill(0).map((_,i) => {
    const v = s.dist[i+1]||0, hl = (STATE.over && STATE.attempt === i && STATE.guesses[i]?.correct) ? 'highlight' : '';
    return `<div class="dist-row"><span class="dist-num">${i+1}</span><div class="dist-bar-wrap"><div class="dist-bar-fill ${hl}" style="width:${Math.max((v/max)*100, 4)}%">${v||''}</div></div></div>`;
  }).join('');
  DOM.get('statsModal').classList.add('show');
}

// ─── EVENTS ───
DOM.get('autocomplete').onclick = e => {
  const item = e.target.closest('.ac-item');
  if (item && item.dataset.t) {
    selectACItem(item.dataset.t);
  }
};

DOM.get('songInput').oninput = e => {
  resetAlphaHighlights();
  const v = e.target.value.trim().toLowerCase();
  showAC(v ? musicasIU.filter(s => s.title.toLowerCase().includes(v)) : []);
};

DOM.get('songInput').onkeydown = e => {
  const ac = DOM.get('autocomplete');
  const isShow = ac.classList.contains('show');
  const items = ac.querySelectorAll('.ac-item');

  if (isShow && items.length > 0) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeAcIndex = (activeAcIndex + 1) % items.length;
      updateACSelection(items);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeAcIndex = (activeAcIndex - 1 + items.length) % items.length;
      updateACSelection(items);
      return;
    }
    if (e.key === 'Enter' && activeAcIndex >= 0 && items[activeAcIndex]) {
      e.preventDefault();
      selectACItem(items[activeAcIndex].dataset.t);
      return;
    }
    if (e.key === 'Escape') {
      ac.classList.remove('show');
      return;
    }
  }

  if (e.key === 'Enter') {
    e.preventDefault();
    nextTurn(DOM.get('songInput').value.trim());
  }
};

DOM.get('playBtn').onclick = handlePlay;
DOM.get('confirmBtn').onclick = () => nextTurn(DOM.get('songInput').value.trim());
DOM.get('skipBtn').onclick = () => nextTurn('', true);
DOM.get('themeToggleBtn').onclick = () => DOM.get('themeOptions').classList.toggle('visible');
document.onclick = e => {
  if (!e.target.closest('.theme-switcher')) DOM.get('themeOptions').classList.remove('visible');
  if (!e.target.closest('.input-section') && !e.target.closest('#alphaBrowser')) DOM.get('autocomplete').classList.remove('show');
};

DOM.get('statsBtn').onclick = () => {
    DOM.get('statsTitle').textContent = i18n('stats'); DOM.get('statsResetBtn').textContent = i18n('reset'); DOM.get('statsCloseBtn').textContent = i18n('close');
    openStats();
};
DOM.get('statsCloseBtn').onclick = () => DOM.get('statsModal').classList.remove('show');
DOM.get('statsResetBtn').onclick = () => {
  if (confirm(i18n('resetConfirm'))) { localStorage.removeItem(CONFIG.KEYS.STATS); openStats(); }
};
function handlePlayAgain() {
  if (DOM.get('resultModal')) DOM.get('resultModal').classList.remove('show');
  if (DOM.get('ambientBg')) DOM.get('ambientBg').src = '';
  pauseAudio();
  STATE.audio.pause();
  STATE.audio.currentTime = 0;

  if (STATE.mode === 'daily') {
    setGameMode('practice');
  } else {
    init();
  }
}

DOM.get('againBtn').onclick = handlePlayAgain;
DOM.get('newBtn').onclick = handlePlayAgain;
if(DOM.get('shareBtn')) DOM.get('shareBtn').onclick = shareResults;

window.onload = () => { initUI(); };
