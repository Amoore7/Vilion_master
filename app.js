// ========== إعدادات التطبيق المركزية ==========
const AppSettings = {
    lang: localStorage.getItem('lang') || 'ar',
    theme: localStorage.getItem('theme') || 'dark',
    noteSystem: localStorage.getItem('noteSystem') || 'arabic',
    audio: JSON.parse(localStorage.getItem('audioSettings')) || {
        type: 'sawtooth', vibratoDepth: 0.015, filterFreq: 3000
    },
    
    themes: {
        dark: { nameAr: 'ليلي ذهبي', nameEn: 'Dark Gold' },
        light: { nameAr: 'نهاري كلاسيكي', nameEn: 'Classic Light' },
        focus: { nameAr: 'وضع التركيز', nameEn: 'Focus Mode' }
    },
    
    noteSystems: {
        arabic: { nameAr: 'عربي (دو، ري)', nameEn: 'Arabic (Do, Re)' },
        western: { nameAr: 'غربي (C, D)', nameEn: 'Western (C, D)' },
        mixed: { nameAr: 'مختلط (Do/C)', nameEn: 'Mixed (Do/C)' }
    },

    save() {
        localStorage.setItem('lang', this.lang);
        localStorage.setItem('theme', this.theme);
        localStorage.setItem('noteSystem', this.noteSystem);
        localStorage.setItem('audioSettings', JSON.stringify(this.audio));
    }
};

// ========== الترجمات المحدثة ==========
const i18n = {
    ar: {
        appTitle: 'Violin Master', welcome: 'مرحباً بك في رحلة الكمان',
        welcomeDesc: 'تعلم الكمان بالطريقة الأكاديمية الغربية والعربية - من الأساسيات إلى الاحتراف',
        scales: 'المقامات', scalesDesc: 'غربية وعربية', arpeggios: 'الأربيجيات',
        bowing: 'تقنيات القوس', harmony: 'الهارموني', exercises: 'التمارين',
        pieces: 'المقطوعات', modes: 'الموردين', theory: 'النظرية',
        tools: 'الأدوات المساعدة', metronome: 'الإيقاع', tuner: 'الضبط',
        refPitch: 'نغمات مرجعية', scalePlayer: 'مشغل المقامات',
        progress: 'تقدمك', totalTime: 'إجمالي وقت التدريب', minutes: 'دقيقة',
        completedLessons: 'الدروس المكتملة', streak: 'أيام التدريب المتتالية',
        settings: 'الإعدادات', language: 'اللغة', switchLang: 'تغيير اللغة',
        about: 'عن التطبيق', version: 'الإصدار: 2.1.1', resetProgress: 'إعادة تعيين التقدم',
        home: 'الرئيسية', mainSections: 'الأقسام الرئيسية', lessons: 'درس',
        themeLabel: 'الثيم البصري', noteLabel: 'نظام تسمية النغمات',
        splashText: 'جاري تحضير الآلة...', backToList: '← رجوع للقائمة',
        audioSettings: 'إعدادات الصوت', waveType: 'نوع الموجة', 
        vibrato: 'الاهتزاز (Vibrato)', brightness: 'السطوع (Filter)'
    },
    en: {
        appTitle: 'Violin Master', welcome: 'Welcome to Your Violin Journey',
        welcomeDesc: 'Learn violin academically - Western & Arabic traditions, from basics to mastery',
        scales: 'Scales', scalesDesc: 'Western & Arabic', arpeggios: 'Arpeggios',
        bowing: 'Bowing Techniques', harmony: 'Harmony', exercises: 'Exercises',
        pieces: 'Pieces', modes: 'Modes', theory: 'Theory',
        tools: 'Tools', metronome: 'Metronome', tuner: 'Tuner',
        refPitch: 'Reference Pitches', scalePlayer: 'Scale Player',
        progress: 'Progress', totalTime: 'Total Practice Time', minutes: 'minutes',
        completedLessons: 'Completed Lessons', streak: 'Day Streak 🔥',
        settings: 'Settings', language: 'Language', switchLang: 'Switch Language',
        about: 'About', version: 'Version: 2.1.1', resetProgress: 'Reset Progress',
        home: 'Home', mainSections: 'Main Sections', lessons: 'lessons',
        themeLabel: 'Visual Theme', noteLabel: 'Note Naming System',
        splashText: 'Preparing the instrument...', backToList: '← Back to List',
        audioSettings: 'Audio Settings', waveType: 'Wave Type',
        vibrato: 'Vibrato', brightness: 'Brightness (Filter)'
    }
};

// خريطة تحويل النوتات
const NOTE_LABELS = {
    C: { arabic: 'دو', western: 'C', mixed: 'Do/C' }, 'C#': { arabic: 'دو دييز', western: 'C#', mixed: 'Do#/C#' },
    Db: { arabic: 'ري بيمول', western: 'Db', mixed: 'Reb/Db' }, D: { arabic: 'ري', western: 'D', mixed: 'Re/D' },
    'D#': { arabic: 'ري دييز', western: 'D#', mixed: 'Re#/D#' }, Eb: { arabic: 'مي بيمول', western: 'Eb', mixed: 'Mib/Eb' },
    E: { arabic: 'مي', western: 'E', mixed: 'Mi/E' }, F: { arabic: 'فا', western: 'F', mixed: 'Fa/F' },
    'F#': { arabic: 'فا دييز', western: 'F#', mixed: 'Fa#/F#' }, Gb: { arabic: 'صول بيمول', western: 'Gb', mixed: 'Solb/Gb' },
    G: { arabic: 'صول', western: 'G', mixed: 'Sol/G' }, 'G#': { arabic: 'صول دييز', western: 'G#', mixed: 'Sol#/G#' },
    Ab: { arabic: 'لا بيمول', western: 'Ab', mixed: 'Lab/Ab' }, A: { arabic: 'لا', western: 'A', mixed: 'La/A' },
    'A#': { arabic: 'لا دييز', western: 'A#', mixed: 'La#/A#' }, Bb: { arabic: 'سي بيمول', western: 'Bb', mixed: 'Sib/Bb' },
    B: { arabic: 'سي', western: 'B', mixed: 'Si/B' }
};

function getNoteLabel(noteName) {
    const baseNote = noteName.replace(/[0-9]/g, '');
    const label = NOTE_LABELS[baseNote];
    if (!label) return noteName;
    const suffix = noteName.match(/[0-9]/)?.[0] || '';
    if (AppSettings.noteSystem === 'arabic') return label.arabic + suffix;
    if (AppSettings.noteSystem === 'western') return label.western + suffix;
    return label.mixed + suffix;
}

// ========== تطبيق الإعدادات ==========
function applySettings() {
    document.documentElement.lang = AppSettings.lang;
    document.documentElement.dir = AppSettings.lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('data-theme', AppSettings.theme);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[AppSettings.lang][key]) el.textContent = i18n[AppSettings.lang][key];
    });
    
    updateNoteLabelsInUI();
    renderSettingsTab();
}

function updateNoteLabelsInUI() {
    document.querySelectorAll('.scale-note').forEach(el => {
        const original = el.dataset.originalNote || el.textContent;
        el.dataset.originalNote = original;
        el.textContent = getNoteLabel(original);
    });
}

// ========== السبلاش سكرين (مستقر وآمن) ==========
function initSplashScreen() {
    window.addEventListener('load', () => {
        const splash = document.getElementById('splash-screen');
        if (!splash) return;
        
        setTimeout(() => {
            splash.classList.add('hidden');
            setTimeout(() => {
                splash.style.display = 'none';
            }, 800);
        }, 2500);
    });
}

// ========== التنقل والنوافذ الذكية ==========
let currentModalContext = null; 

function switchTab(tabName, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    if (el) el.classList.add('active');
}

function openModal(title, body, context = null) {
    currentModalContext = context;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = body;
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    stopAllAudio();
    currentModalContext = null;
}

function goBackInModal() {
    if (!currentModalContext) return closeModal();
    
    if (currentModalContext.type === 'section') {
        openSection(currentModalContext.name);
    } else if (currentModalContext.type === 'harmony-list') {
        openHarmony();
    }
}

// ========== تبويب الإعدادات الديناميكي ==========
function renderSettingsTab() {
    const settingsTab = document.getElementById('tab-settings');
    if (!settingsTab) return;
    
    const themeOptions = Object.entries(AppSettings.themes).map(([key, val]) => `
        <button class="option-btn ${AppSettings.theme === key ? 'active' : ''}" onclick="changeTheme('${key}')">
            ${AppSettings.lang === 'ar' ? val.nameAr : val.nameEn}
        </button>
    `).join('');
    
    const noteOptions = Object.entries(AppSettings.noteSystems).map(([key, val]) => `
        <button class="option-btn ${AppSettings.noteSystem === key ? 'active' : ''}" onclick="changeNoteSystem('${key}')">
            ${AppSettings.lang === 'ar' ? val.nameAr : val.nameEn}
        </button>
    `).join('');

    const audioBody = `
        <div class="info-box">
            <strong data-i18n="audioSettings">${i18n[AppSettings.lang].audioSettings}</strong><br><br>
            
            <div style="margin-bottom: 15px;">
                <label style="font-size:12px; color:var(--text-dim);" data-i18n="waveType">${i18n[AppSettings.lang].waveType}</label>
                <select id="waveTypeSelect" onchange="updateAudioSetting('type', this.value)" style="width:100%; padding:8px; margin-top:5px; background:var(--bg-3); color:var(--text); border:1px solid var(--border); border-radius:8px;">
                    <option value="sawtooth" ${AppSettings.audio.type === 'sawtooth' ? 'selected' : ''}>Sawtooth (كمان)</option>
                    <option value="sine" ${AppSettings.audio.type === 'sine' ? 'selected' : ''}>Sine (ناعم)</option>
                    <option value="square" ${AppSettings.audio.type === 'square' ? 'selected' : ''}>Square (حاد)</option>
                    <option value="triangle" ${AppSettings.audio.type === 'triangle' ? 'selected' : ''}>Triangle (فلوت)</option>
                </select>
            </div>

            <div style="margin-bottom: 15px;">
                <label style="font-size:12px; color:var(--text-dim);" data-i18n="vibrato">${i18n[AppSettings.lang].vibrato}: <span id="vibVal">${Math.round(AppSettings.audio.vibratoDepth * 1000)}</span></label>
                <input type="range" min="0" max="0.05" step="0.001" value="${AppSettings.audio.vibratoDepth}" 
                       oninput="updateAudioSetting('vibratoDepth', parseFloat(this.value)); document.getElementById('vibVal').innerText = Math.round(this.value*1000)" 
                       style="width:100%; margin-top:5px; accent-color:var(--primary);">
            </div>

            <div style="margin-bottom: 15px;">
                <label style="font-size:12px; color:var(--text-dim);" data-i18n="brightness">${i18n[AppSettings.lang].brightness}: <span id="filtVal">${AppSettings.audio.filterFreq}</span> Hz</label>
                <input type="range" min="500" max="8000" step="100" value="${AppSettings.audio.filterFreq}" 
                       oninput="updateAudioSetting('filterFreq', parseInt(this.value)); document.getElementById('filtVal').innerText = this.value" 
                       style="width:100%; margin-top:5px; accent-color:var(--primary);">
            </div>
        </div>
    `;
    
    settingsTab.innerHTML = `
        <div class="section-title">️ <span data-i18n="settings">${i18n[AppSettings.lang].settings}</span></div>
        
        <div class="settings-group">
            <span class="settings-label" data-i18n="language">${i18n[AppSettings.lang].language}</span>
            <button class="play-btn secondary" onclick="toggleLang()" style="width:100%">${i18n[AppSettings.lang].switchLang}</button>
        </div>
        
        <div class="settings-group">
            <span class="settings-label" data-i18n="themeLabel">${i18n[AppSettings.lang].themeLabel}</span>
            <div class="theme-options">${themeOptions}</div>
        </div>
        
        <div class="settings-group">
            <span class="settings-label" data-i18n="noteLabel">${i18n[AppSettings.lang].noteLabel}</span>
            <div class="label-options">${noteOptions}</div>
        </div>

        ${audioBody}
        
        <div class="card" style="margin-top: 20px;">
            <div class="card-title" data-i18n="about">${i18n[AppSettings.lang].about}</div>
            <div class="card-desc" style="margin-top: 10px; line-height: 1.7;">
                <p><strong>Violin Master Pro</strong></p>
                <p>${i18n[AppSettings.lang].welcomeDesc}</p>
                <p style="margin-top: 10px;" data-i18n="version">${i18n[AppSettings.lang].version}</p>
            </div>
        </div>
        
        <div class="card" style="margin-top: 12px;">
            <div class="card-title" data-i18n="resetProgress">${i18n[AppSettings.lang].resetProgress}</div>
            <button class="play-btn secondary" onclick="resetProgress()" style="margin-top: 10px; background: var(--accent); color: white; border: none; width: 100%;">
                ${i18n[AppSettings.lang].resetProgress}
            </button>
        </div>
    `;
}

function changeTheme(theme) { AppSettings.theme = theme; AppSettings.save(); applySettings(); }
function changeNoteSystem(system) { AppSettings.noteSystem = system; AppSettings.save(); applySettings(); }
function toggleLang() { AppSettings.lang = AppSettings.lang === 'ar' ? 'en' : 'ar'; AppSettings.save(); applySettings(); }

function updateAudioSetting(key, value) {
    AppSettings.audio[key] = value;
    AppSettings.save();
}

// ========== محرك الصوت المطور ==========
let audioCtx = null;
let activeOscillators = [];
let metronomeNextTime = 0;
let metronomeTimerID = null;
let isMetronomePlaying = false;

function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

const NOTE_FREQS = {
    'G3': 196.00, 'G#3': 207.65, 'Ab3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'Bb3': 233.08, 'B3': 246.94,
    'C4': 261.63, 'C#4': 277.18, 'Db4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'Eb4': 311.13, 'E4': 329.63,
    'F4': 349.23, 'F#4': 369.99, 'Gb4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'Ab4': 415.30, 'A4': 440.00,
    'A#4': 466.16, 'Bb4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'C#5': 554.37, 'Db5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'Eb5': 622.25, 'E5': 659.25,
    'F5': 698.46, 'F#5': 739.99, 'Gb5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'Ab5': 830.61, 'A5': 880.00,
    'A#5': 932.33, 'Bb5': 932.33, 'B5': 987.77, 'C6': 1046.50
};

function playNote(freq, duration = 1.0, startTime = null) {
    const ctx = getAudioCtx();
    const now = startTime || ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const vibOsc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = AppSettings.audio.type;
    osc.frequency.value = freq;
    
    vibOsc.frequency.value = 5.5;
    const vibGain = ctx.createGain();
    vibGain.gain.value = AppSettings.audio.vibratoDepth * freq;
    vibOsc.connect(vibGain); vibGain.connect(osc.frequency);
    
    filter.type = 'lowpass'; 
    filter.frequency.value = AppSettings.audio.filterFreq; 
    filter.Q.value = 1.5;
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.1);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.3);
    gain.gain.setValueAtTime(0.25, now + duration - 0.15);
    gain.gain.linearRampToValueAtTime(0, now + duration);
    
    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    
    osc.start(now); vibOsc.start(now);
    osc.stop(now + duration + 0.1); vibOsc.stop(now + duration + 0.1);
    
    activeOscillators.push(osc, vibOsc);
    osc.onended = () => { activeOscillators = activeOscillators.filter(o => o !== osc && o !== vibOsc); };
}

function stopAllAudio() {
    activeOscillators.forEach(o => { try { o.stop(); } catch(e){} });
    activeOscillators = [];
    if (metronomeTimerID) { clearTimeout(metronomeTimerID); metronomeTimerID = null; }
    isMetronomePlaying = false;
}

function playNoteByName(name, duration = 0.8) {
    if (NOTE_FREQS[name]) playNote(NOTE_FREQS[name], duration);
}

// ========== بيانات المحتوى الموسيقي ==========
const SCALES = {
    western: [
        { name: 'C Major', nameAr: 'دو ماجور', notes: ['C4','D4','E4','F4','G4','A4','B4','C5'], formula: 'W-W-H-W-W-W-H', desc: 'المقام الأساسي - بدون علامات' },
        { name: 'G Major', nameAr: 'صول ماجور', notes: ['G4','A4','B4','C5','D5','E5','F#5','G5'], formula: 'W-W-H-W-W-W-H', desc: 'دييز واحد (F#)' },
        { name: 'D Major', nameAr: 'ري ماجور', notes: ['D4','E4','F#4','G4','A4','B4','C#5','D5'], formula: 'W-W-H-W-W-W-H', desc: 'دييزان (F#, C#)' },
        { name: 'A Major', nameAr: 'لا ماجور', notes: ['A4','B4','C#5','D5','E5','F#5','G#5','A5'], formula: 'W-W-H-W-W-W-H', desc: 'ثلاثة ديازات' },
        { name: 'E Major', nameAr: 'مي ماجور', notes: ['E4','F#4','G#4','A4','B4','C#5','D#5','E5'], formula: 'W-W-H-W-W-W-H', desc: 'أربعة ديازات' },
        { name: 'F Major', nameAr: 'فا ماجور', notes: ['F4','G4','A4','Bb4','C5','D5','E5','F5'], formula: 'W-W-H-W-W-W-H', desc: 'بيمول واحد (Bb)' },
        { name: 'Bb Major', nameAr: 'سي بيمول ماجور', notes: ['Bb4','C5','D5','Eb5','F5','G5','A5','Bb5'], formula: 'W-W-H-W-W-W-H', desc: 'بيمولان' },
        { name: 'A Minor (Natural)', nameAr: 'لا مينور طبيعي', notes: ['A4','B4','C5','D5','E5','F5','G5','A5'], formula: 'W-H-W-W-H-W-W', desc: 'المقام الطبيعي' },
        { name: 'A Minor (Harmonic)', nameAr: 'لا مينور تناغمي', notes: ['A4','B4','C5','D5','E5','F5','G#5','A5'], formula: 'W-H-W-W-H-A2-H', desc: 'الدرجة السابعة مرفوعة' },
        { name: 'A Minor (Melodic)', nameAr: 'لا مينور لحني', notes: ['A4','B4','C5','D5','E5','F#5','G#5','A5'], formula: 'W-H-W-W-W-W-H', desc: 'صاعد: 6 و 7 مرفوعان' },
        { name: 'C Minor', nameAr: 'دو مينور', notes: ['C4','D4','Eb4','F4','G4','Ab4','Bb4','C5'], formula: 'W-H-W-W-H-W-W', desc: 'ثلاثة بيمولات' },
        { name: 'Pentatonic Major', nameAr: 'بنتاتونيك ماجور', notes: ['C4','D4','E4','G4','A4','C5'], formula: 'W-W-m3-W-m3', desc: 'خمس نغمات' },
        { name: 'Blues Scale', nameAr: 'البلوز', notes: ['C4','Eb4','F4','F#4','G4','Bb4','C5'], formula: 'm3-W-H-H-m3-W', desc: 'الدرجة الزرقاء' },
        { name: 'Chromatic', nameAr: 'كروماتيك', notes: ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5'], formula: 'H-H-H-H-H-H-H-H-H-H-H-H', desc: 'نصف صوت في كل درجة' }
    ],
    arabic: [
        { name: 'Rast', nameAr: 'رست', notes: ['C4','D4','E4','F4','G4','A4','Bb4','C5'], formula: 'T-T-3/4T-T-T-3/4T-T', desc: 'أم المقامات العربية', root: 'C' },
        { name: 'Bayati', nameAr: 'بياتي', notes: ['D4','E4','F4','G4','A4','Bb4','C5','D5'], formula: '3/4T-T-T-T-3/4T-T', desc: 'من أكثر المقامات شيوعاً', root: 'D' },
        { name: 'Hijaz', nameAr: 'حجاز', notes: ['D4','Eb4','F#4','G4','A4','Bb4','C5','D5'], formula: 'H-3/2T-H-T-H-T-T', desc: 'مقام شرقي بامتياز', root: 'D' },
        { name: 'Nahawand', nameAr: 'نهاوند', notes: ['C4','D4','Eb4','F4','G4','Ab4','Bb4','C5'], formula: 'T-H-T-T-H-T-T', desc: 'مطابق للمينور الغربي', root: 'C' },
        { name: 'Saba', nameAr: 'صبا', notes: ['D4','Eb4','F4','Gb4','A4','Bb4','C5','D5'], formula: '3/4T-3/4T-3/4T-T-T-T', desc: 'مقام حزين وعميق', root: 'D' },
        { name: 'Ajam', nameAr: 'عجم', notes: ['Bb4','C5','D5','Eb5','F5','G5','A5','Bb5'], formula: 'T-T-H-T-T-T-H', desc: 'مطابق للماجور الغربي', root: 'Bb' },
        { name: 'Sikah', nameAr: 'سيكاه', notes: ['E4','F4','G4','A4','B4','C5','D5','E5'], formula: '3/4T-T-T-3/4T-T-T', desc: 'مقام فريد', root: 'E' },
        { name: 'Kurd', nameAr: 'كرد', notes: ['D4','Eb4','F4','G4','A4','Bb4','C5','D5'], formula: 'H-T-T-T-H-T-T', desc: 'مشابه للفريجيان الغربي', root: 'D' },
        { name: 'Nawa Athar', nameAr: 'نهاوند أثر', notes: ['C4','Db4','E4','F4','G4','Ab4','Bb4','C5'], formula: 'H-3/2T-H-T-H-T-T', desc: 'حجاز على درجة الدو', root: 'C' },
        { name: 'Iraq', nameAr: 'عراق', notes: ['F4','G4','Ab4','Bb4','C5','Db5','Eb5','F5'], formula: 'T-H-T-T-H-T-T', desc: 'مقام عراقي تقليدي', root: 'F' }
    ]
};

const ARPEGGIOS = {
    western: [
        { name: 'C Major', nameAr: 'دو ماجور', notes: ['C4','E4','G4','C5'], desc: 'الأكورد الأساسي - ثلاثي' },
        { name: 'G Major', nameAr: 'صول ماجور', notes: ['G4','B4','D5','G5'], desc: 'ثلاثي ماجور' },
        { name: 'D Major', nameAr: 'ري ماجور', notes: ['D4','F#4','A4','D5'], desc: 'ثلاثي ماجور' },
        { name: 'A Minor', nameAr: 'لا مينور', notes: ['A4','C5','E5','A5'], desc: 'ثلاثي مينور طبيعي' },
        { name: 'E Minor', nameAr: 'مي مينور', notes: ['E4','G4','B4','E5'], desc: 'ثلاثي مينور' },
        { name: 'C Minor', nameAr: 'دو مينور', notes: ['C4','Eb4','G4','C5'], desc: 'ثلاثي مينور' },
        { name: 'Diminished C', nameAr: 'دو متناقص', notes: ['C4','Eb4','Gb4','Bbb4'], desc: 'ثلاثي متناقص' },
        { name: 'Augmented C', nameAr: 'دو زائد', notes: ['C4','E4','G#4','C5'], desc: 'ثلاثي زائد' }
    ],
    arabic: [
        { name: 'Rast on C', nameAr: 'رست على دو', notes: ['C4','E4','G4','C5'], desc: 'توافق رست الأساسي' },
        { name: 'Bayati on D', nameAr: 'بياتي على ري', notes: ['D4','F4','A4','D5'], desc: 'توافق بياتي (درجة 1-3-5)' },
        { name: 'Hijaz on D', nameAr: 'حجاز على ري', notes: ['D4','F#4','A4','D5'], desc: 'توافق حجاز المميز' },
        { name: 'Nahawand on C', nameAr: 'نهاوند على دو', notes: ['C4','Eb4','G4','C5'], desc: 'توافق نهاوند (مينور)' },
        { name: 'Saba on D', nameAr: 'صبا على ري', notes: ['D4','F4','Ab4','D5'], desc: 'توافق صبا الحزين' },
        { name: 'Sikah on E', nameAr: 'سيكاه على مي', notes: ['E4','G4','B4','E5'], desc: 'توافق سيكاه الفريد' }
    ]
};

const BOWING_TECHNIQUES = [
    { name: 'Détaché', nameAr: 'ديتاشيه', desc: 'حركة قوس منفصلة لكل نوتة.', tip: 'حافظ على استقامة القوس.' },
    { name: 'Legato', nameAr: 'ليغاتو', desc: 'ربط النوتات بسلاسة.', tip: 'غير اتجاه القوس بنعومة.' },
    { name: 'Staccato', nameAr: 'ستاكاتو', desc: 'نوتات قصيرة ومنفصلة بحدة.', tip: 'استخدم معصمك لإيقاف القوس فجأة.' },
    { name: 'Spiccato', nameAr: 'سبيكاتو', desc: 'ارتداد القوس الطبيعي.', tip: 'لا تضغط! دع وزن القوس يعمل.' },
    { name: 'Martelé', nameAr: 'مارتيليه', desc: 'نوتات "مطرقة" قوية.', tip: 'ابدأ بضغط قوي ثم حرر فوراً.' },
    { name: 'Tremolo', nameAr: 'ترمولو', desc: 'تكرار سريع جداً لنفس النوتة.', tip: 'حرك رسغك فقط.' },
    { name: 'Sautillé', nameAr: 'سوتييه', desc: 'ارتداد سريع في منتصف القوس.', tip: 'أسرع من السبيكاتو.' },
    { name: 'Col legno', nameAr: 'كول ليغنو', desc: 'العزف بخشب القوس.', tip: 'تقنية تأثيرية إيقاعية.' },
    { name: 'Sul ponticello', nameAr: 'سول بونتيشيللو', desc: 'العزف قرب الفرس.', tip: 'صوت معدني وغامض.' },
    { name: 'Sul tasto', nameAr: 'سول تاستو', desc: 'العزف فوق لوحة الأصابع.', tip: 'صوت ناعم وهوائي.' },
    { name: 'Flautando', nameAr: 'فلاتاندو', desc: 'عزف خفيف يشبه الفلوت.', tip: 'لمس خفيف وسريع.' },
    { name: 'Circular Bowing', nameAr: 'قوس دائري', desc: 'حركة دائرية للقوس.', tip: 'مثالية لل legato الطويل.' }
];

// ========== الهارموني الشامل والمعمق ==========
const HARMONY_LESSONS = {
    levels: [
        {
            id: 'l1-triads', name: 'المستوى 1: البناء الثلاثي', nameAr: 'Level 1: Triads',
            desc: 'الوحدة الأساسية للهارموني. يتكون من الجذر، الثالثة، والخامسة.',
            items: [
                { name: 'Major Triad', nameAr: 'ثلاثي ماجور', notes: ['C4','E4','G4'], desc: 'جذر + ثالثة كبيرة + خامسة صحيحة' },
                { name: 'Minor Triad', nameAr: 'ثلاثي مينور', notes: ['C4','Eb4','G4'], desc: 'جذر + ثالثة صغيرة + خامسة صحيحة' },
                { name: 'Diminished', nameAr: 'متناقص', notes: ['C4','Eb4','Gb4'], desc: 'جذر + ثالثة صغيرة + خامسة متناقصة' },
                { name: 'Augmented', nameAr: 'زائد', notes: ['C4','E4','G#4'], desc: 'جذر + ثالثة كبيرة + خامسة زائدة' }
            ]
        },
        {
            id: 'l2-sevenths', name: 'المستوى 2: السباعيات والانقلابات', nameAr: 'Level 2: Sevenths & Inversions',
            desc: 'إضافة السابعة تعطي لوناً وتوتراً. الانقلابات تغير ترتيب النغمات.',
            items: [
                { name: 'Major 7th', nameAr: 'سباعي ماجور', notes: ['C4','E4','G4','B4'], desc: 'ثلاثي ماجور + سابعة كبيرة' },
                { name: 'Dominant 7th', nameAr: 'سباعي مسيطر', notes: ['C4','E4','G4','Bb4'], desc: 'ثلاثي ماجور + سابعة صغيرة' },
                { name: '1st Inversion', nameAr: 'انقلاب أول', notes: ['E4','G4','C5'], desc: 'الثالثة في الأسفل (E-G-C)' },
                { name: '2nd Inversion', nameAr: 'انقلاب ثاني', notes: ['G4','C5','E5'], desc: 'الخامسة في الأسفل (G-C-E)' }
            ]
        },
        {
            id: 'l3-functions', name: 'المستوى 3: الوظائف والتتابعات', nameAr: 'Level 3: Functions & Cadences',
            desc: 'كيف تتحرك الأكوردات لخلق شعور بالاستقرار أو التوتر.',
            items: [
                { name: 'Tonic (I)', nameAr: 'الركيزة (I)', notes: ['C4','E4','G4'], desc: 'الشعور بالراحة والاستقرار' },
                { name: 'Subdominant (IV)', nameAr: 'تحت المسيطر (IV)', notes: ['F4','A4','C5'], desc: 'الشعور بالحركة والابتعاد' },
                { name: 'Dominant (V)', nameAr: 'المسيطر (V)', notes: ['G4','B4','D5'], desc: 'التوتر الذي يطلب الحل' },
                { name: 'Perfect Cadence', nameAr: 'تتابع تام (V-I)', notes: ['G4','B4','D5','C4','E4','G4'], desc: 'الحل النهائي (V -> I)' }
            ]
        },
        {
            id: 'l4-modulation', name: 'المستوى 4: التحويل المقامي', nameAr: 'Level 4: Modulation',
            desc: 'الانتقال السلس بين المقامات باستخدام أكوردات مشتركة.',
            items: [
                { name: 'C to G', nameAr: 'من دو إلى صول', notes: ['C4','E4','G4','D4','F#4','A4'], desc: 'استخدام G كأكورد مشترك' },
                { name: 'C to Am', nameAr: 'من دو إلى لا مينور', notes: ['C4','E4','G4','A4','C5','E5'], desc: 'تحويل نسبي (Relative Minor)' },
                { name: 'Chromatic', nameAr: 'تحويل لوني', notes: ['C4','E4','G4','C#4','E4','G#4'], desc: 'الانتقال عبر نغمات خارجة' }
            ]
        },
        {
            id: 'l5-arabic', name: 'المستوى 5: الهارموني العربي', nameAr: 'Level 5: Arabic Harmony',
            desc: 'التوافق في المقامات الشرقية ذات الأرباع.',
            items: [
                { name: 'Rast Chord', nameAr: 'توافق الرست', notes: ['C4','E4','G4'], desc: '1-3-5 (الثالثة كبيرة في التوافق)' },
                { name: 'Bayati Chord', nameAr: 'توافق البياتي', notes: ['D4','F4','A4'], desc: '1-b3-5 (مينور طبيعي)' },
                { name: 'Sikah Approx', nameAr: 'تقريب السيكاه', notes: ['E4','G#4','B4'], desc: 'استخدام G# لمحاكاة الربع صوت' },
                { name: 'Pedal Point', nameAr: 'نقطة الارتكاز', notes: ['D4','D4','F4','A4'], desc: 'تثبيت الوتر المفتوح كقاعدة' }
            ]
        }
    ]
};

// ========== دوال العرض والرسم (مصححة لضمان ظهور النوتة) ==========
function renderNoteOnStaff(noteName, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    
    // التحقق من تحميل VexFlow
    if (typeof Vex === 'undefined' || !Vex.Flow) {
        container.innerHTML = `<div style="text-align:center; padding:20px; font-size:48px; color:var(--primary);"><br><small style="font-size:14px; color:var(--text-dim);">${getNoteLabel(noteName)}</small></div>`;
        return;
    }

    try {
        const { Factory, EasyScore, System } = Vex.Flow;
        // أبعاد مناسبة للجوال والنوافذ المنبثقة
        const width = Math.min(container.offsetWidth || 300, 500); 
        
        const vf = new Factory({ renderer: { elementId: containerId, width: width, height: 140 } });
        const score = vf.EasyScore();
        const system = vf.System();
        
        // تحويل C4 إلى c/4 لتنسيق VexFlow
        const vexNote = noteName.toLowerCase().replace(/(\d)/, '/$1');
        
        system.addStave({
            voices: [score.voice(score.notes(vexNote + '/q', { clef: 'treble' }))]
        }).addClef('treble').addTimeSignature('4/4');
        
        vf.draw();
    } catch (e) {
        console.warn("VexFlow rendering failed:", e);
        container.innerHTML = `<div style="text-align:center; padding:20px; font-size:48px; color:var(--primary);"><br><small style="font-size:14px; color:var(--text-dim);">${getNoteLabel(noteName)}</small></div>`;
    }
}

// ========== فتح الأقسام ==========
function openSection(section) {
    switch(section) {
        case 'scales': openScales(); break;
        case 'arpeggios': openArpeggios(); break;
        case 'bowing': openBowing(); break;
        case 'harmony': openHarmony(); break;
        case 'exercises': openExercises(); break;
        case 'pieces': openPieces(); break;
        case 'modes': openModes(); break;
        case 'theory': openTheory(); break;
    }
}

function openScales() {
    const body = `
        <div class="tabs">
            <div class="tab active" onclick="switchSubTab('western', this)">غربية</div>
            <div class="tab" onclick="switchSubTab('arabic', this)">عربية</div>
        </div>
        <div id="sub-western" class="sub-tab-content">
            ${SCALES.western.map(s => `
                <div class="lesson-item" onclick='showScale(${JSON.stringify(s)})'>
                    <div class="lesson-title">${s.name}</div>
                    <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${s.nameAr}</div>
                </div>
            `).join('')}
        </div>
        <div id="sub-arabic" class="sub-tab-content" style="display:none;">
            ${SCALES.arabic.map(s => `
                <div class="lesson-item" onclick='showScale(${JSON.stringify(s)})'>
                    <div class="lesson-title">${s.nameAr}</div>
                    <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${s.name}</div>
                </div>
            `).join('')}
        </div>
    `;
    openModal(' المقامات', body, { type: 'section', name: 'scales' });
}

function switchSubTab(name, el) {
    document.querySelectorAll('.sub-tab-content').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
    document.getElementById('sub-' + name).style.display = 'block';
    el.classList.add('active');
}

function showScale(scale) {
    const staffId = 'scale-staff-' + Date.now();
    const body = `
        <button class="play-btn secondary" style="margin-bottom:15px; font-size:12px;" onclick="goBackInModal()">
            ${i18n[AppSettings.lang].backToList}
        </button>
        <div class="info-box">
            <strong>${scale.nameAr || scale.name}</strong><br>${scale.desc}<br>
            <small style="color: var(--text-dim);">الصيغة: ${scale.formula}</small>
        </div>
        <div id="${staffId}" class="vexflow-wrapper" style="margin: 15px 0; min-height:140px;"></div>
        <div class="scale-display">
            ${scale.notes.map(n => `
                <div class="scale-note" data-original-note="${n}" onclick="playNoteByName('${n}', 0.8)">
                    ${getNoteLabel(n)}
                </div>
            `).join('')}
        </div>
        <div style="text-align: center; margin-top: 15px;">
            <button class="play-btn" onclick='playScaleSequence(${JSON.stringify(scale.notes)})'>▶ تشغيل متتابع</button>
            <button class="play-btn secondary" onclick='playScaleTogether(${JSON.stringify(scale.notes)})'>تشغيل معاً</button>
        </div>
    `;
    openModal(' ' + (scale.nameAr || scale.name), body, { type: 'section', name: 'scales' });
    
    // تأخير بسيط لضمان وجود العنصر في DOM
    setTimeout(() => {
        renderNoteOnStaff(scale.notes[0], staffId);
    }, 150);
}

function playScaleSequence(notes) {
    stopAllAudio();
    notes.forEach((note, i) => { setTimeout(() => playNoteByName(note, 0.6), i * 500); });
}

function playScaleTogether(notes) {
    stopAllAudio();
    notes.forEach((note, i) => { setTimeout(() => playNoteByName(note, 1.5), i * 150); });
}

function openArpeggios() {
    const body = `
        <div class="tabs">
            <div class="tab active" onclick="switchSubTab('arp-western', this)">غربية</div>
            <div class="tab" onclick="switchSubTab('arp-arabic', this)">عربية</div>
        </div>
        <div id="sub-arp-western" class="sub-tab-content">
            ${ARPEGGIOS.western.map(a => `
                <div class="lesson-item" onclick='showArpeggio(${JSON.stringify(a)})'>
                    <div class="lesson-title">${a.name}</div>
                    <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${a.nameAr}</div>
                </div>
            `).join('')}
        </div>
        <div id="sub-arp-arabic" class="sub-tab-content" style="display:none;">
            ${ARPEGGIOS.arabic.map(a => `
                <div class="lesson-item" onclick='showArpeggio(${JSON.stringify(a)})'>
                    <div class="lesson-title">${a.nameAr}</div>
                    <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${a.name}</div>
                </div>
            `).join('')}
        </div>
    `;
    openModal(' الأربيجيات', body, { type: 'section', name: 'arpeggios' });
}

function showArpeggio(arpeggio) {
    const staffId = 'arp-staff-' + Date.now();
    const body = `
        <button class="play-btn secondary" style="margin-bottom:15px; font-size:12px;" onclick="goBackInModal()">
            ${i18n[AppSettings.lang].backToList}
        </button>
        <div class="info-box"><strong>${arpeggio.nameAr || arpeggio.name}</strong><br>${arpeggio.desc}</div>
        <div id="${staffId}" class="vexflow-wrapper" style="margin: 15px 0; min-height:140px;"></div>
        <div class="scale-display">
            ${arpeggio.notes.map(n => `
                <div class="scale-note" data-original-note="${n}" onclick="playNoteByName('${n}', 0.8)">
                    ${getNoteLabel(n)}
                </div>
            `).join('')}
        </div>
        <div style="text-align: center; margin-top: 15px;">
            <button class="play-btn" onclick='playScaleSequence(${JSON.stringify(arpeggio.notes)})'>▶ تشغيل تصاعدي</button>
            <button class="play-btn secondary" onclick='playScaleTogether(${JSON.stringify(arpeggio.notes)})'>تشغيل معاً</button>
        </div>
    `;
    openModal(' ' + (arpeggio.nameAr || arpeggio.name), body, { type: 'section', name: 'arpeggios' });
    setTimeout(() => renderNoteOnStaff(arpeggio.notes[0], staffId), 150);
}

function openBowing() {
    const body = `
        <div class="info-box"><strong>12 تقنية قوس أساسية ومتقدمة</strong></div>
        ${BOWING_TECHNIQUES.map((t, i) => `
            <div class="lesson-item" onclick='showBowingTechnique(${i})'>
                <div class="lesson-title">${t.name}</div>
                <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${t.nameAr}</div>
            </div>
        `).join('')}
    `;
    openModal('🎯 تقنيات القوس', body, { type: 'section', name: 'bowing' });
}

function showBowingTechnique(index) {
    const t = BOWING_TECHNIQUES[index];
    const body = `
        <button class="play-btn secondary" style="margin-bottom:15px; font-size:12px;" onclick="goBackInModal()">
            ${i18n[AppSettings.lang].backToList}
        </button>
        <div class="info-box">
            <strong>${t.name} - ${t.nameAr}</strong><br><br>${t.desc}<br><br>
            <span style="color: var(--success);"> ${t.tip}</span>
        </div>
        <div style="text-align: center; margin-top: 15px;">
            <button class="play-btn" onclick="simulateBowingSound('${t.name}')">🔊 محاكاة صوتية</button>
        </div>
    `;
    openModal('🎯 ' + t.nameAr, body, { type: 'section', name: 'bowing' });
}

function simulateBowingSound(technique) {
    stopAllAudio();
    const freq = NOTE_FREQS['G4'];
    if (technique === 'Staccato') for(let i=0; i<4; i++) setTimeout(() => playNote(freq, 0.15), i*200);
    else if (technique === 'Tremolo') for(let i=0; i<20; i++) setTimeout(() => playNote(freq, 0.05), i*50);
    else if (technique === 'Martelé') playNote(freq, 0.3);
    else playNote(freq, 1.5);
}

// ========== الهارموني المتقدم ==========
function openHarmony() {
    const body = `
        <div class="info-box"><strong>منهج الهارموني الشامل (5 مستويات)</strong></div>
        ${HARMONY_LESSONS.levels.map((l, i) => `
            <div class="lesson-item" onclick='showHarmonyLevel(${i})'>
                <div class="lesson-title">${l.nameAr}</div>
                <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${l.name}</div>
                <div class="lesson-meta"><span>${l.items.length} دروس</span></div>
            </div>
        `).join('')}
    `;
    openModal('🎹 الهارموني', body, { type: 'harmony-list' });
}

function showHarmonyLevel(levelIndex) {
    const level = HARMONY_LESSONS.levels[levelIndex];
    const body = `
        <button class="play-btn secondary" style="margin-bottom:15px; font-size:12px;" onclick="goBackInModal()">
            ${i18n[AppSettings.lang].backToList}
        </button>
        <div class="info-box"><strong>${level.nameAr}</strong><br>${level.desc}</div>
        ${level.items.map(item => `
            <div class="lesson-item" style="border-right-color: var(--accent);" onclick='playScaleTogether(${JSON.stringify(item.notes)})'>
                <div class="lesson-title">${item.nameAr} (${item.name})</div>
                <div style="font-size: 12px; color: var(--text-dim);">${item.desc}</div>
                <div style="margin-top:5px; display:flex; gap:5px; flex-wrap:wrap;">
                    ${item.notes.map(n => `<span class="badge badge-intermediate">${getNoteLabel(n)}</span>`).join('')}
                </div>
            </div>
        `).join('')}
    `;
    openModal('🎹 ' + level.nameAr, body, { type: 'harmony-list' });
}

// ========== باقي الأقسام والأدوات ==========
function openExercises() { openModal('💪 التمارين', '<div class="info-box">قريباً - 50+ تمرين</div>'); }
function openPieces() { openModal(' المقطوعات', '<div class="info-box">قريباً - 30+ مقطوعة</div>'); }
function openModes() { openModal(' الموردين', '<div class="info-box">قريباً - 7 أوضاع</div>'); }
function openTheory() { openModal(' النظرية', '<div class="info-box">قريباً - النظرية الكاملة</div>'); }

// ========== الميترونوم الدقيق (Web Audio Scheduler) ==========
let currentBPM = 80;

function openMetronome() {
    const body = `
        <div class="metronome">
            <div style="color: var(--text-dim); font-size: 14px;">BPM</div>
            <div class="bpm-display" id="bpmDisplay">80</div>
            <div class="bpm-controls">
                <button class="bpm-btn" onclick="changeBPM(-10)">−10</button>
                <button class="bpm-btn" onclick="changeBPM(-1)">−</button>
                <button class="bpm-btn" onclick="changeBPM(1)">+</button>
                <button class="bpm-btn" onclick="changeBPM(10)">+10</button>
            </div>
            <div style="margin: 15px 0;">
                <button class="play-btn" id="metroBtn" onclick="toggleMetronome()">▶ تشغيل</button>
            </div>
        </div>
    `;
    openModal('️ الإيقاع', body);
}

function changeBPM(delta) {
    currentBPM = Math.max(30, Math.min(300, currentBPM + delta));
    document.getElementById('bpmDisplay').textContent = currentBPM;
    if (isMetronomePlaying) {
        stopAllAudio();
        toggleMetronome();
    }
}

function toggleMetronome() {
    const btn = document.getElementById('metroBtn');
    if (isMetronomePlaying) {
        stopAllAudio();
        btn.textContent = '▶ تشغيل';
    } else {
        isMetronomePlaying = true;
        btn.textContent = ' إيقاف';
        metronomeNextTime = getAudioCtx().currentTime + 0.1;
        scheduler();
    }
}

function scheduler() {
    while (metronomeNextTime < getAudioCtx().currentTime + 0.1) {
        scheduleNote(metronomeNextTime);
        metronomeNextTime += 60.0 / currentBPM;
    }
    if (isMetronomePlaying) {
        metronomeTimerID = setTimeout(scheduler, 25);
    }
}

function scheduleNote(time) {
    const osc = getAudioCtx().createOscillator();
    const gain = getAudioCtx().createGain();
    osc.frequency.value = 1000;
    osc.type = 'square';
    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
    osc.connect(gain);
    gain.connect(getAudioCtx().destination);
    osc.start(time);
    osc.stop(time + 0.05);
}

// ========== الضابط والأدوات الأخرى ==========
function openTuner() {
    const body = `
        <div class="tuner-display">
            <div class="tuner-note" id="tunerNote">-</div>
            <div class="tuner-cents" id="tunerCents">في انتظار الصوت...</div>
            <div class="tuner-meter"><div class="tuner-indicator" id="tunerIndicator"></div></div>
            <button class="play-btn" id="tunerBtn" onclick="toggleTuner()">🎤 بدء الضبط</button>
        </div>
    `;
    openModal('️ الضبط', body);
}

let tunerStream = null; let tunerAnalyser = null; let tunerAnimId = null;
async function toggleTuner() {
    const btn = document.getElementById('tunerBtn');
    if (tunerStream) {
        tunerStream.getTracks().forEach(t => t.stop());
        tunerStream = null; cancelAnimationFrame(tunerAnimId);
        btn.textContent = '🎤 بدء الضبط';
        document.getElementById('tunerNote').textContent = '-';
        document.getElementById('tunerCents').textContent = 'في انتظار الصوت...';
        return;
    }
    try {
        tunerStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ctx = getAudioCtx();
        const source = ctx.createMediaStreamSource(tunerStream);
        tunerAnalyser = ctx.createAnalyser(); tunerAnalyser.fftSize = 2048;
        source.connect(tunerAnalyser);
        btn.textContent = '⏹ إيقاف'; detectPitch();
    } catch(e) { alert('يجب السماح بالوصول للميكروفون'); }
}

function detectPitch() {
    if (!tunerAnalyser) return;
    const buffer = new Float32Array(tunerAnalyser.fftSize);
    tunerAnalyser.getFloatTimeDomainData(buffer);
    let rms = 0;
    for (let i = 0; i < buffer.length; i++) rms += buffer[i] * buffer[i];
    rms = Math.sqrt(rms / buffer.length);
    if (rms < 0.01) { tunerAnimId = requestAnimationFrame(detectPitch); return; }
    
    let prev = 0, cur = 0, crossings = 0;
    for (let i = 0; i < buffer.length; i++) {
        cur = buffer[i];
        if ((prev <= 0 && cur > 0) || (prev >= 0 && cur < 0)) crossings++;
        prev = cur;
    }
    const freq = (crossings / 2) * (44100 / buffer.length);
    if (freq > 100 && freq < 2000) {
        const note = freqToNote(freq);
        document.getElementById('tunerNote').textContent = note.name;
        document.getElementById('tunerCents').textContent = note.cents + ' cents';
        const indicator = document.getElementById('tunerIndicator');
        const offset = Math.max(-50, Math.min(50, note.cents));
        indicator.style.left = `calc(50% + ${offset}%)`;
        indicator.style.background = Math.abs(note.cents) < 5 ? 'var(--success)' : 'var(--primary)';
    }
    tunerAnimId = requestAnimationFrame(detectPitch);
}

function freqToNote(freq) {
    const notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    const A4 = 440;
    const semitones = 12 * Math.log2(freq / A4);
    const rounded = Math.round(semitones);
    const noteIndex = (9 + rounded + 120) % 12;
    const octave = 4 + Math.floor((rounded + 9) / 12);
    const cents = Math.round((semitones - rounded) * 100);
    return { name: notes[noteIndex] + octave, cents };
}

function openReferencePitches() {
    const body = `
        <div class="info-box"><strong>اضغط على الوتر لسماع نغمته:</strong></div>
        <div style="text-align: center; padding: 20px;">
            <button class="string-btn" onclick="playNote(196.00, 2)">G - صول</button>
            <button class="string-btn" onclick="playNote(293.66, 2)">D - ري</button>
            <button class="string-btn" onclick="playNote(440.00, 2)">A - لا</button>
            <button class="string-btn" onclick="playNote(659.25, 2)">E - مي</button>
        </div>
    `;
    openModal(' النغمات المرجعية', body);
}

function openScalePlayer() {
    const allScales = [...SCALES.western, ...SCALES.arabic];
    const body = `
        <input type="text" class="search-box" placeholder="ابحث عن مقام..." oninput="filterScales(this.value)">
        <div id="scalePlayerList">
            ${allScales.map(s => `
                <div class="lesson-item scale-item" data-name="${s.name} ${s.nameAr}" onclick='showScale(${JSON.stringify(s)})'>
                    <div class="lesson-title">${s.nameAr || s.name}</div>
                    <div style="font-size: 12px; color: var(--primary);">${s.name}</div>
                </div>
            `).join('')}
        </div>
    `;
    openModal('🎶 مشغل المقامات', body);
}

function filterScales(query) {
    document.querySelectorAll('.scale-item').forEach(item => {
        const name = item.dataset.name.toLowerCase();
        item.style.display = name.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}

// ========== غرفة التدريب ==========
function openPracticeRoom() {
    const body = `
        <div class="info-box"><strong>🎯 تمرين الأوتار المفتوحة والإيقاع</strong></div>
        <div class="practice-container">
            <div id="vexflow-staff" class="vexflow-wrapper"></div>
            <div class="practice-controls">
                <button class="play-btn" onclick="playPracticeSequence()">▶ استمع للتمرين كاملاً</button>
            </div>
        </div>
    `;
    openModal(' غرفة التدريب التفاعلية', body);
    setTimeout(() => { 
        renderNoteOnStaff('C4', 'vexflow-staff'); // استخدام الدالة الموحدة
    }, 150);
}

function playPracticeSequence() {
    stopAllAudio();
    const notes = [{ name: 'C4', duration: 0.5 }, { name: 'D4', duration: 0.5 }, { name: 'E4', duration: 1.0 }, { name: 'F4', duration: 1.0 }, { name: 'G4', duration: 2.0 }];
    let currentTime = 0;
    notes.forEach(note => {
        setTimeout(() => { playNote(NOTE_FREQS[note.name], note.duration); }, currentTime * 1000);
        currentTime += note.duration + 0.1;
    });
}

// ========== تتبع التقدم والتشغيل ==========
function updateProgress() {
    const data = JSON.parse(localStorage.getItem('violinProgress') || '{"time":0,"lessons":0,"streak":0,"lastDate":""}');
    document.getElementById('totalTime').textContent = data.time;
    document.getElementById('completedLessons').textContent = data.lessons;
    document.getElementById('streak').textContent = data.streak;
    const pct = Math.min(100, (data.lessons / 150) * 100);
    document.getElementById('progressBar').style.width = pct + '%';
}

function resetProgress() {
    if (confirm('هل أنت متأكد من إعادة تعيين التقدم؟')) {
        localStorage.removeItem('violinProgress'); updateProgress();
    }
}

applySettings();
updateProgress();
initSplashScreen();

let sessionStart = Date.now();
setInterval(() => {
    const data = JSON.parse(localStorage.getItem('violinProgress') || '{"time":0,"lessons":0,"streak":0,"lastDate":""}');
    const mins = Math.floor((Date.now() - sessionStart) / 60000);
    if (mins > 0) {
        data.time += mins; sessionStart = Date.now();
        const today = new Date().toDateString();
        if (data.lastDate !== today) {
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            data.streak = (data.lastDate === yesterday) ? data.streak + 1 : 1;
            data.lastDate = today;
        }
        localStorage.setItem('violinProgress', JSON.stringify(data));
        updateProgress();
    }
}, 60000);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
}
