// ========== إعدادات التطبيق المركزية ==========
const AppSettings = {
    lang: localStorage.getItem('lang') || 'ar',
    theme: localStorage.getItem('theme') || 'dark',
    noteSystem: localStorage.getItem('noteSystem') || 'arabic',
    
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
        about: 'عن التطبيق', version: 'الإصدار: 2.0.0', resetProgress: 'إعادة تعيين التقدم',
        home: 'الرئيسية', mainSections: 'الأقسام الرئيسية', lessons: 'درس',
        themeLabel: 'الثيم البصري', noteLabel: 'نظام تسمية النغمات',
        splashText: 'جاري تحضير الآلة...'
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
        about: 'About', version: 'Version: 2.0.0', resetProgress: 'Reset Progress',
        home: 'Home', mainSections: 'Main Sections', lessons: 'lessons',
        themeLabel: 'Visual Theme', noteLabel: 'Note Naming System',
        splashText: 'Preparing the instrument...'
    }
};

// خريطة تحويل النوتات حسب النظام المختار
const NOTE_LABELS = {
    C: { arabic: 'دو', western: 'C', mixed: 'Do/C' },
    'C#': { arabic: 'دو دييز', western: 'C#', mixed: 'Do#/C#' },
    Db: { arabic: 'ري بيمول', western: 'Db', mixed: 'Reb/Db' },
    D: { arabic: 'ري', western: 'D', mixed: 'Re/D' },
    'D#': { arabic: 'ري دييز', western: 'D#', mixed: 'Re#/D#' },
    Eb: { arabic: 'مي بيمول', western: 'Eb', mixed: 'Mib/Eb' },
    E: { arabic: 'مي', western: 'E', mixed: 'Mi/E' },
    F: { arabic: 'فا', western: 'F', mixed: 'Fa/F' },
    'F#': { arabic: 'فا دييز', western: 'F#', mixed: 'Fa#/F#' },
    Gb: { arabic: 'صول بيمول', western: 'Gb', mixed: 'Solb/Gb' },
    G: { arabic: 'صول', western: 'G', mixed: 'Sol/G' },
    'G#': { arabic: 'صول دييز', western: 'G#', mixed: 'Sol#/G#' },
    Ab: { arabic: 'لا بيمول', western: 'Ab', mixed: 'Lab/Ab' },
    A: { arabic: 'لا', western: 'A', mixed: 'La/A' },
    'A#': { arabic: 'لا دييز', western: 'A#', mixed: 'La#/A#' },
    Bb: { arabic: 'سي بيمول', western: 'Bb', mixed: 'Sib/Bb' },
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

// ========== السبلاش سكرين ==========
function initSplashScreen() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;
    setTimeout(() => {
        splash.classList.add('hidden');
        setTimeout(() => splash.remove(), 800);
    }, 2500);
}

// ========== التنقل والتبويبات ==========
function switchTab(tabName, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    if (el) el.classList.add('active');
}

function openModal(title, body) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = body;
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    stopAllAudio();
}

// ========== تبويب الإعدادات الديناميكي ==========
function renderSettingsTab() {
    const settingsTab = document.getElementById('tab-settings');
    if (!settingsTab) return;
    
    const themeOptions = Object.entries(AppSettings.themes).map(([key, val]) => `
        <button class="option-btn ${AppSettings.theme === key ? 'active' : ''}" 
                onclick="changeTheme('${key}')">
            ${AppSettings.lang === 'ar' ? val.nameAr : val.nameEn}
        </button>
    `).join('');
    
    const noteOptions = Object.entries(AppSettings.noteSystems).map(([key, val]) => `
        <button class="option-btn ${AppSettings.noteSystem === key ? 'active' : ''}" 
                onclick="changeNoteSystem('${key}')">
            ${AppSettings.lang === 'ar' ? val.nameAr : val.nameEn}
        </button>
    `).join('');
    
    settingsTab.innerHTML = `
        <div class="section-title">⚙️ <span data-i18n="settings">${i18n[AppSettings.lang].settings}</span></div>
        
        <div class="settings-group">
            <span class="settings-label" data-i18n="language">${i18n[AppSettings.lang].language}</span>
            <button class="play-btn secondary" onclick="toggleLang()" style="width:100%">
                ${i18n[AppSettings.lang].switchLang}
            </button>
        </div>
        
        <div class="settings-group">
            <span class="settings-label" data-i18n="themeLabel">${i18n[AppSettings.lang].themeLabel}</span>
            <div class="theme-options">${themeOptions}</div>
        </div>
        
        <div class="settings-group">
            <span class="settings-label" data-i18n="noteLabel">${i18n[AppSettings.lang].noteLabel}</span>
            <div class="label-options">${noteOptions}</div>
        </div>
        
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

function changeTheme(theme) {
    AppSettings.theme = theme;
    AppSettings.save();
    applySettings();
}

function changeNoteSystem(system) {
    AppSettings.noteSystem = system;
    AppSettings.save();
    applySettings();
}

function toggleLang() {
    AppSettings.lang = AppSettings.lang === 'ar' ? 'en' : 'ar';
    AppSettings.save();
    applySettings();
}

// ========== محرك الصوت ==========
let audioCtx = null;
let activeOscillators = [];
let metronomeInterval = null;

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

function playNote(freq, duration = 1.0, type = 'sawtooth') {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const vibOsc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = type; osc.frequency.value = freq;
    vibOsc.frequency.value = 5.5;
    const vibGain = ctx.createGain();
    vibGain.gain.value = freq * 0.015;
    vibOsc.connect(vibGain); vibGain.connect(osc.frequency);
    
    filter.type = 'lowpass'; filter.frequency.value = 3000; filter.Q.value = 1.5;
    
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.4);
    gain.gain.setValueAtTime(0.25, now + duration - 0.2);
    gain.gain.linearRampToValueAtTime(0, now + duration);
    
    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    osc.start(now); vibOsc.start(now);
    osc.stop(now + duration); vibOsc.stop(now + duration);
    
    activeOscillators.push(osc, vibOsc);
    osc.onended = () => { activeOscillators = activeOscillators.filter(o => o !== osc && o !== vibOsc); };
}

function stopAllAudio() {
    activeOscillators.forEach(o => { try { o.stop(); } catch(e){} });
    activeOscillators = [];
    if (metronomeInterval) { clearInterval(metronomeInterval); metronomeInterval = null; }
}

function playNoteByName(name, duration = 0.8) {
    if (NOTE_FREQS[name]) playNote(NOTE_FREQS[name], duration);
}

// ========== بيانات المقامات ==========
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
        { name: 'Rast', nameAr: 'رست', notes: ['C4','D4','E4','F4','G4','A4','Bb4','C5'], formula: 'T-T-3/4T-T-T-3/4T-T', desc: 'أم المقامات العربية - درجة الثالثة ثلاثة أرباع البعد', root: 'C' },
        { name: 'Bayati', nameAr: 'بياتي', notes: ['D4','E4','F4','G4','A4','Bb4','C5','D5'], formula: '3/4T-T-T-T-3/4T-T', desc: 'من أكثر المقامات شيوعاً - يبدأ من الري', root: 'D' },
        { name: 'Hijaz', nameAr: 'حجاز', notes: ['D4','Eb4','F#4','G4','A4','Bb4','C5','D5'], formula: 'H-3/2T-H-T-H-T-T', desc: 'مقام شرقي بامتياز - يحتوي على ثانية كبيرة بعد الثالثة', root: 'D' },
        { name: 'Nahawand', nameAr: 'نهاوند', notes: ['C4','D4','Eb4','F4','G4','Ab4','Bb4','C5'], formula: 'T-H-T-T-H-T-T', desc: 'مطابق للمينور الغربي - سهل للعزف', root: 'C' },
        { name: 'Saba', nameAr: 'صبا', notes: ['D4','Eb4','F4','Gb4','A4','Bb4','C5','D5'], formula: '3/4T-3/4T-3/4T-T-T-T', desc: 'مقام حزين وعميق - فريد في الطابع', root: 'D' },
        { name: 'Ajam', nameAr: 'عجم', notes: ['Bb4','C5','D5','Eb5','F5','G5','A5','Bb5'], formula: 'T-T-H-T-T-T-H', desc: 'مطابق للماجور الغربي - يبدأ من سي بيمول', root: 'Bb' },
        { name: 'Sikah', nameAr: 'سيكاه', notes: ['E4','F4','G4','A4','B4','C5','D5','E5'], formula: '3/4T-T-T-3/4T-T-T', desc: 'مقام فريد - الدرجة الثالثة ثلاثة أرباع', root: 'E' },
        { name: 'Kurd', nameAr: 'كرد', notes: ['D4','Eb4','F4','G4','A4','Bb4','C5','D5'], formula: 'H-T-T-T-H-T-T', desc: 'مشابه للفريجيان الغربي', root: 'D' },
        { name: 'Nawa Athar', nameAr: 'نهاوند أثر / نوازند', notes: ['C4','Db4','E4','F4','G4','Ab4','Bb4','C5'], formula: 'H-3/2T-H-T-H-T-T', desc: 'حجاز على درجة الدو', root: 'C' },
        { name: 'Iraq', nameAr: 'عراق', notes: ['F4','G4','Ab4','Bb4','C5','Db5','Eb5','F5'], formula: 'T-H-T-T-H-T-T', desc: 'مقام عراقي تقليدي', root: 'F' }
    ]
};

// ========== بيانات الأربيجيات الأكاديمية ==========
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

// ========== بيانات تقنيات القوس ==========
const BOWING_TECHNIQUES = [
    { name: 'Détaché', nameAr: 'ديتاشيه', desc: 'حركة قوس منفصلة لكل نوتة. الأساس في العزف.', tip: 'حافظ على استقامة القوس وتوزيع متساوٍ للضغط.' },
    { name: 'Legato', nameAr: 'ليغاتو', desc: 'ربط النوتات بسلاسة دون انقطاع في الصوت.', tip: 'غير اتجاه القوس بنعومة عند الانتقال بين النوتات.' },
    { name: 'Staccato', nameAr: 'ستاكاتو', desc: 'نوتات قصيرة ومنفصلة بحدة.', tip: 'استخدم معصمك لإيقاف القوس فجأة بعد كل نوتة.' },
    { name: 'Spiccato', nameAr: 'سبيكاتو', desc: 'ارتداد القوس الطبيعي على الوتر.', tip: 'لا تضغط! دع وزن القوس وحده يسبب الارتداد.' },
    { name: 'Martelé', nameAr: 'مارتيليه', desc: 'نوتات "مطرقة" قوية ومفاجئة.', tip: 'ابدأ بضغط قوي ثم حرر فوراً للسماح بالاهتزاز.' },
    { name: 'Tremolo', nameAr: 'ترمولو', desc: 'تكرار سريع جداً لنفس النوتة.', tip: 'حرك رسغك فقط وليس ذراعك بالكامل.' },
    { name: 'Sautillé', nameAr: 'سوتييه', desc: 'ارتداد سريع جداً في منتصف القوس.', tip: 'أسرع من السبيكاتو، يعتمد على مرونة خشب القوس.' },
    { name: 'Col legno', nameAr: 'كول ليغنو', desc: 'العزف بخشب القوس بدلاً من الشعر.', tip: 'تقنية تأثيرية تعطي صوتاً إيقاعياً خشبياً.' },
    { name: 'Sul ponticello', nameAr: 'سول بونتيشيللو', desc: 'العزف قرب الفرس (Bridge).', tip: 'يعطي صوتاً معدنياً وغامضاً. استخدم ضغطاً خفيفاً.' },
    { name: 'Sul tasto', nameAr: 'سول تاستو', desc: 'العزف فوق لوحة الأصابع (Fingerboard).', tip: 'صوت ناعم وهوائي يشبه الناي.' },
    { name: 'Flautando', nameAr: 'فلاتاندو', desc: 'عزف خفيف جداً وسريع يشبه الفلوت.', tip: 'لمس خفيف للوتر مع سرعة عالية للقوس.' },
    { name: 'Circular Bowing', nameAr: 'قوس دائري', desc: 'حركة دائرية للقوس لتغيير الاتجاه بسلاسة.', tip: 'مثالية لل legato الطويل وتجنب الصدمات الصوتية.' }
];

// ========== بيانات الهارموني العميق ==========
const HARMONY_LESSONS = {
    western: [
        {
            id: 'w-triad', name: 'البناء الثلاثي', nameAr: 'Triads Construction',
            desc: 'الوحدة الأساسية للهارموني الغربي. يتكون من الجذر (Root)، الثالثة (Third)، والخامسة (Fifth).',
            example: ['C4', 'E4', 'G4'], types: ['Major: جذر + ثالثة كبيرة + خامسة صحيحة', 'Minor: جذر + ثالثة صغيرة + خامسة صحيحة']
        },
        {
            id: 'w-inversions', name: 'الانقلابات', nameAr: 'Inversions',
            desc: 'إعادة ترتيب نغمات الأكورد بحيث لا يكون الجذر في الأسفل. يعطي تنوعاً في الحركة اللحنية.',
            example: ['E4', 'G4', 'C5'], types: ['Root Position: الجذر في الأسفل', '1st Inversion: الثالثة في الأسفل', '2nd Inversion: الخامسة في الأسفل']
        },
        {
            id: 'w-seventh', name: 'الأكوردات السباعية', nameAr: 'Seventh Chords',
            desc: 'إضافة السابعة فوق البناء الثلاثي. أساس الجاز والهارموني المتقدم.',
            example: ['C4', 'E4', 'G4', 'B4'], types: ['Major 7: ثالثة كبيرة + سابعة كبيرة', 'Dominant 7: ثالثة كبيرة + سابعة صغيرة', 'Minor 7: ثالثة صغيرة + سابعة صغيرة']
        },
        {
            id: 'w-modulation', name: 'التحويل المقامي', nameAr: 'Modulation',
            desc: 'الانتقال السلس من مقام لآخر باستخدام أكورد مشترك (Pivot Chord).',
            example: ['C4', 'E4', 'G4', 'B4', 'D5'], types: ['Common Chord Modulation', 'Chromatic Modulation', 'Enharmonic Modulation']
        }
    ],
    arabic: [
        {
            id: 'a-rast-chord', name: 'توافق الرست', nameAr: 'Rast Harmony',
            desc: 'بناء أكورد على مقام رست يتطلب التعامل مع درجة الثالثة (E) التي تكون "ثلاثة أرباع" في السياق اللحني، لكن في التوافق تُعامل كثالثة كبيرة.',
            example: ['C4', 'E4', 'G4'], types: ['التوافق الأساسي: 1-3-5', 'مع السابعة: 1-3-5-Bb (توافق رست سباعي)']
        },
        {
            id: 'a-bayati-chord', name: 'توافق البياتي', nameAr: 'Bayati Harmony',
            desc: 'البياتي يبدأ من الري (D). التوافق الأساسي يستخدم الدرجة الثانية المسطحة قليلاً في اللحن، لكن في الأكورد تُستخدم F طبيعية.',
            example: ['D4', 'F4', 'A4'], types: ['التوافق الأساسي: 1-b3-5', 'الامتداد: إضافة C أو G للتلوين']
        },
        {
            id: 'a-sikah-chord', name: 'توافق السيكاه', nameAr: 'Sikah Harmony',
            desc: 'أكثر المقامات تحدياً توافقياً. الدرجة الثالثة (G) هي "ثلاثة أرباع". في التوافق الغربي نحاول محاكاتها باستخدام G طبيعية أو G# حسب السياق.',
            example: ['E4', 'G4', 'B4'], types: ['التقليدي: استخدام G طبيعية كتقريب', 'المعاصر: استخدام G# لمحاكاة الربع صوت']
        },
        {
            id: 'a-taqsim-harmony', name: 'الهارموني في التقاسيم', nameAr: 'Taqsim Harmony',
            desc: 'في الموسيقى العربية التقليدية، الهارموني ضمني وليس صريحاً. يعتمد على تكرار درجات المقام وإبراز النغمات المميزة.',
            example: ['D4', 'F4', 'A4', 'C5'], types: ['Pedal Point: تثبيت الوتر المفتوح كقاعدة', 'Drone: الاستمرار على درجة الركوز']
        }
    ]
};

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
            ${SCALES.western.map((s, i) => `
                <div class="lesson-item" onclick='showScale(${JSON.stringify(s)})'>
                    <div class="lesson-title">${s.name}</div>
                    <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${s.nameAr}</div>
                    <div class="lesson-meta"><span>${s.notes.length} نغمات</span></div>
                </div>
            `).join('')}
        </div>
        <div id="sub-arabic" class="sub-tab-content" style="display:none;">
            ${SCALES.arabic.map((s, i) => `
                <div class="lesson-item" onclick='showScale(${JSON.stringify(s)})'>
                    <div class="lesson-title">${s.nameAr}</div>
                    <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${s.name}</div>
                    <div class="lesson-meta"><span>${s.notes.length} نغمات</span></div>
                </div>
            `).join('')}
        </div>
    `;
    openModal('🎼 المقامات', body);
}

function switchSubTab(name, el) {
    document.querySelectorAll('.sub-tab-content').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
    document.getElementById('sub-' + name).style.display = 'block';
    el.classList.add('active');
}

function showScale(scale) {
    const body = `
        <div class="info-box">
            <strong>${scale.nameAr || scale.name}</strong><br>
            ${scale.desc}<br>
            <small style="color: var(--text-dim);">الصيغة: ${scale.formula}</small>
        </div>
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
        <div class="info-box" style="margin-top: 15px;">
            <strong>💡 نصيحة للتدريب:</strong><br>
            • اعزف السلم صعوداً ونزولاً ببطء<br>
            • استخدم الميترونوم على 60 BPM<br>
            • ركز على نقاء النغمة ووضوح الأصابع<br>
            • كرر 10 مرات يومياً
        </div>
    `;
    openModal(' ' + (scale.nameAr || scale.name), body);
}

function playScaleSequence(notes) {
    stopAllAudio();
    notes.forEach((note, i) => { setTimeout(() => playNoteByName(note, 0.6), i * 500); });
}

function playScaleTogether(notes) {
    stopAllAudio();
    notes.forEach((note, i) => { setTimeout(() => playNoteByName(note, 1.5), i * 150); });
}

// ========== دوال فتح الأقسام المحدثة ==========
function openArpeggios() {
    const body = `
        <div class="tabs">
            <div class="tab active" onclick="switchSubTab('arp-western', this)">غربية</div>
            <div class="tab" onclick="switchSubTab('arp-arabic', this)">عربية</div>
        </div>
        <div id="sub-arp-western" class="sub-tab-content">
            ${ARPEGGIOS.western.map((a, i) => `
                <div class="lesson-item" onclick='showArpeggio(${JSON.stringify(a)})'>
                    <div class="lesson-title">${a.name}</div>
                    <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${a.nameAr}</div>
                    <div class="lesson-meta"><span>${a.notes.length} نغمات</span></div>
                </div>
            `).join('')}
        </div>
        <div id="sub-arp-arabic" class="sub-tab-content" style="display:none;">
            ${ARPEGGIOS.arabic.map((a, i) => `
                <div class="lesson-item" onclick='showArpeggio(${JSON.stringify(a)})'>
                    <div class="lesson-title">${a.nameAr}</div>
                    <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${a.name}</div>
                    <div class="lesson-meta"><span>${a.notes.length} نغمات</span></div>
                </div>
            `).join('')}
        </div>
    `;
    openModal('🎵 الأربيجيات', body);
}

function showArpeggio(arpeggio) {
    const body = `
        <div class="info-box">
            <strong>${arpeggio.nameAr || arpeggio.name}</strong><br>
            ${arpeggio.desc}<br>
        </div>
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
        <div class="info-box" style="margin-top: 15px;">
            <strong>💡 نصيحة للأربيجيو:</strong><br>
            • تأكد من وضوح كل نغمة قبل الانتقال للتالية<br>
            • استخدم أصابعك بدقة لتجنب الانزلاق<br>
            • جرب العزف بصعود ونزول (Arpeggio Up & Down)<br>
            • ركز على توازن الضغط بين الأوتار
        </div>
    `;
    openModal(' ' + (arpeggio.nameAr || arpeggio.name), body);
}

function openBowing() {
    const body = `
        <div class="info-box">
            <strong>12 تقنية قوس أساسية ومتقدمة</strong><br>
            اضغط على أي تقنية لمعرفة التفاصيل والنصائح العملية.
        </div>
        ${BOWING_TECHNIQUES.map((t, i) => `
            <div class="lesson-item" onclick='showBowingTechnique(${i})'>
                <div class="lesson-title">${t.name}</div>
                <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${t.nameAr}</div>
                <div class="lesson-meta"><span>${t.desc.substring(0, 40)}...</span></div>
            </div>
        `).join('')}
    `;
    openModal('🎯 تقنيات القوس', body);
}

function showBowingTechnique(index) {
    const t = BOWING_TECHNIQUES[index];
    const body = `
        <div class="info-box">
            <strong>${t.name} - ${t.nameAr}</strong><br><br>
            ${t.desc}<br><br>
            <span style="color: var(--success);">💡 ${t.tip}</span>
        </div>
        <div style="text-align: center; margin-top: 15px;">
            <button class="play-btn" onclick="simulateBowingSound('${t.name}')">🔊 محاكاة صوتية</button>
        </div>
        <div class="info-box" style="margin-top: 15px;">
            <strong>تمرين عملي:</strong><br>
            • عزف نغمة G4 مفتوحة باستخدام هذه التقنية<br>
            • كرر 10 مرات بتركيز كامل<br>
            • سجل نفسك واستمع للفرق بين المحاولات
        </div>
    `;
    openModal('🎯 ' + t.nameAr, body);
}

// محاكاة صوتية مبسطة لتقنيات القوس
function simulateBowingSound(technique) {
    stopAllAudio();
    const freq = NOTE_FREQS['G4'];
    
    if (technique === 'Staccato') {
        for(let i=0; i<4; i++) setTimeout(() => playNote(freq, 0.15, 'sawtooth'), i*200);
    } else if (technique === 'Tremolo') {
        for(let i=0; i<20; i++) setTimeout(() => playNote(freq, 0.05, 'sawtooth'), i*50);
    } else if (technique === 'Martelé') {
        playNote(freq, 0.3, 'square');
    } else if (technique === 'Sul ponticello') {
        playNote(freq * 1.02, 1.5, 'sine');
    } else {
        playNote(freq, 1.5, 'sawtooth');
    }
}

// ========== دوال الهارموني الجديدة ==========
function openHarmony() {
    const body = `
        <div class="tabs">
            <div class="tab active" onclick="switchSubTab('harm-western', this)">غربي</div>
            <div class="tab" onclick="switchSubTab('harm-arabic', this)">عربي</div>
        </div>
        <div id="sub-harm-western" class="sub-tab-content">
            ${HARMONY_LESSONS.western.map((l, i) => `
                <div class="lesson-item" onclick='showHarmonyLesson("western", ${i})'>
                    <div class="lesson-title">${l.name}</div>
                    <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${l.nameAr}</div>
                    <div class="lesson-meta"><span>${l.types.length} أنواع</span></div>
                </div>
            `).join('')}
        </div>
        <div id="sub-harm-arabic" class="sub-tab-content" style="display:none;">
            ${HARMONY_LESSONS.arabic.map((l, i) => `
                <div class="lesson-item" onclick='showHarmonyLesson("arabic", ${i})'>
                    <div class="lesson-title">${l.nameAr}</div>
                    <div style="font-size: 13px; color: var(--primary); margin: 4px 0;">${l.name}</div>
                    <div class="lesson-meta"><span>${l.types.length} أنواع</span></div>
                </div>
            `).join('')}
        </div>
    `;
    openModal('🎹 الهارموني', body);
}

function showHarmonyLesson(tradition, index) {
    const lesson = HARMONY_LESSONS[tradition][index];
    const body = `
        <div class="info-box">
            <strong>${lesson.nameAr} (${lesson.name})</strong><br><br>
            ${lesson.desc}<br><br>
            <div style="margin-top: 10px; border-top: 1px solid var(--border); padding-top: 10px;">
                <strong>الأنواع:</strong><br>
                ${lesson.types.map(t => `• ${t}`).join('<br>')}
            </div>
        </div>
        <div class="scale-display">
            ${lesson.example.map(n => `
                <div class="scale-note" data-original-note="${n}" onclick="playNoteByName('${n}', 1.5)">
                    ${getNoteLabel(n)}
                </div>
            `).join('')}
        </div>
        <div style="text-align: center; margin-top: 15px;">
            <button class="play-btn" onclick='playScaleTogether(${JSON.stringify(lesson.example)})'> عزف التوافق</button>
        </div>
        <div class="info-box" style="margin-top: 15px;">
            <strong>💡 تمرين تطبيقي:</strong><br>
            • اعزف التوافق على كمانك ببطء<br>
            • استمع للعلاقة بين النغمات<br>
            • حاول عزفه في أوضاع مختلفة (Positions)<br>
            • كرر حتى تشعر بالاستقرار التوافقي
        </div>
    `;
    openModal('🎹 ' + lesson.nameAr, body);
}

// ========== باقي الأقسام (جاهزة للتعبئة) ==========
function openExercises() { openModal(' التمارين', '<div class="info-box">قريباً - 50+ تمرين من Ševčík إلى Paganini</div>'); }
function openPieces() { openModal('🎭 المقطوعات', '<div class="info-box">قريباً - 30+ مقطوعة من المبتدئ إلى المتقدم</div>'); }
function openModes() { openModal('🌀 الموردين', '<div class="info-box">قريباً - 7 أوضاع موسيقية</div>'); }
function openTheory() { openModal(' النظرية', '<div class="info-box">قريباً - النظرية الموسيقية الكاملة</div>'); }

// ========== الأدوات ==========
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
    openModal('⏱️ الإيقاع', body);
}

let currentBPM = 80; let metronomeOn = false;
function changeBPM(delta) {
    currentBPM = Math.max(30, Math.min(300, currentBPM + delta));
    document.getElementById('bpmDisplay').textContent = currentBPM;
    if (metronomeOn) { clearInterval(metronomeInterval); startMetronome(); }
}
function toggleMetronome() {
    metronomeOn = !metronomeOn;
    const btn = document.getElementById('metroBtn');
    if (metronomeOn) { btn.textContent = ' إيقاف'; startMetronome(); }
    else { btn.textContent = '▶ تشغيل'; clearInterval(metronomeInterval); }
}
function startMetronome() {
    const interval = 60000 / currentBPM;
    playClick();
    metronomeInterval = setInterval(playClick, interval);
}
function playClick() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 1000; osc.type = 'square';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.05);
}

function openTuner() {
    const body = `
        <div class="tuner-display">
            <div class="tuner-note" id="tunerNote">-</div>
            <div class="tuner-cents" id="tunerCents">في انتظار الصوت...</div>
            <div class="tuner-meter">
                <div class="tuner-indicator" id="tunerIndicator"></div>
            </div>
            <button class="play-btn" id="tunerBtn" onclick="toggleTuner()">🎤 بدء الضبط</button>
        </div>
    `;
    openModal('🎚️ الضبط', body);
}

let tunerStream = null; let tunerAnalyser = null; let tunerAnimId = null;
async function toggleTuner() {
    const btn = document.getElementById('tunerBtn');
    if (tunerStream) {
        tunerStream.getTracks().forEach(t => t.stop());
        tunerStream = null; cancelAnimationFrame(tunerAnimId);
        btn.textContent = ' بدء الضبط';
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
            <button class="string-btn" onclick="playNote(196.00, 2)" style="font-size: 18px;">G - صول</button>
            <button class="string-btn" onclick="playNote(293.66, 2)" style="font-size: 18px;">D - ري</button>
            <button class="string-btn" onclick="playNote(440.00, 2)" style="font-size: 18px;">A - لا</button>
            <button class="string-btn" onclick="playNote(659.25, 2)" style="font-size: 18px;">E - مي</button>
        </div>
    `;
    openModal(' النغمات المرجعية', body);
}

function openScalePlayer() {
    const allScales = [...SCALES.western, ...SCALES.arabic];
    const body = `
        <input type="text" class="search-box" placeholder="ابحث عن مقام..." oninput="filterScales(this.value)">
        <div id="scalePlayerList">
            ${allScales.map((s, i) => `
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

// ========== VexFlow ==========
function renderVexFlow(containerId, notesString, clef = 'treble', time = '4/4') {
    const container = document.getElementById(containerId);
    if (!container || typeof Vex === 'undefined') return;
    container.innerHTML = '';
    const { Factory, EasyScore, System } = Vex.Flow;
    const vf = new Factory({ renderer: { elementId: containerId, width: container.offsetWidth || 400, height: 160 } });
    const score = vf.EasyScore();
    const system = vf.System();
    system.addStave({ voices: [score.voice(score.notes(notesString, { clef: clef }))] }).addClef(clef).addTimeSignature(time);
    vf.draw();
}

// ========== غرفة التدريب ==========
function openPracticeRoom() {
    const body = `
        <div class="info-box">
            <strong>🎯 تمرين الأوتار المفتوحة والإيقاع</strong><br>
            استمع للنوتة، ثم حاول عزفها على كمانك. اضغط على النوتة لسماعها.
        </div>
        <div class="practice-container">
            <div id="vexflow-staff" class="vexflow-wrapper"></div>
            <div class="practice-controls">
                <button class="play-btn" onclick="playPracticeSequence()">▶ استمع للتمرين كاملاً</button>
                <button class="play-btn secondary" onclick="startListeningMode()">🎤 تفعيل الاستماع (قريباً)</button>
            </div>
        </div>
    `;
    openModal('🎯 غرفة التدريب التفاعلية', body);
    setTimeout(() => { renderVexFlow('vexflow-staff', 'C4/q, D4/q, E4/h, F4/h, G4/w'); }, 100);
}

function playPracticeSequence() {
    stopAllAudio();
    const notes = [
        { name: 'C4', duration: 0.5 }, { name: 'D4', duration: 0.5 },
        { name: 'E4', duration: 1.0 }, { name: 'F4', duration: 1.0 },
        { name: 'G4', duration: 2.0 }
    ];
    let currentTime = 0;
    notes.forEach(note => {
        setTimeout(() => { playNote(NOTE_FREQS[note.name], note.duration); }, currentTime * 1000);
        currentTime += note.duration + 0.1;
    });
}

function startListeningMode() {
    alert('ميزة الاستماع الفعلي تتطلب تفعيل الميكروفون. سيتم إضافتها في المرحلة 2!');
}

// ========== تتبع التقدم ==========
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

// ========== التشغيل الأولي ==========
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
