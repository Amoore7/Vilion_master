// ========== الترجمات ==========
const i18n = {
    ar: {
        appTitle: 'Violin Master',
        welcome: 'مرحباً بك في رحلة الكمان',
        welcomeDesc: 'تعلم الكمان بالطريقة الأكاديمية الغربية والعربية - من الأساسيات إلى الاحتراف',
        scales: 'المقامات', scalesDesc: 'غربية وعربية',
        arpeggios: 'الأربيجيات', arpeggiosDesc: 'توافقات وأكوردات',
        bowing: 'تقنيات القوس', bowingDesc: 'الأقواس والحركات',
        harmony: 'الهارموني', harmonyDesc: 'التناغم والتوافق',
        exercises: 'التمارين', exercisesDesc: 'Ševčík, Kreutzer',
        pieces: 'المقطوعات', piecesDesc: 'مبتدئ إلى متقدم',
        modes: 'الموردين', modesDesc: 'الأوضاع الموسيقية',
        theory: 'النظرية', theoryDesc: 'النوتات والإيقاع',
        tools: 'الأدوات المساعدة', metronome: 'الإيقاع', metronomeDesc: 'تحكم في السرعة والإيقاع',
        tuner: 'الضبط', tunerDesc: 'ضبط أوتار الكمان',
        refPitch: 'نغمات مرجعية', refPitchDesc: 'استمع لنغمات الأوتار',
        scalePlayer: 'مشغل المقامات', scalePlayerDesc: 'استمع للمقامات',
        progress: 'تقدمك', totalTime: 'إجمالي وقت التدريب', minutes: 'دقيقة',
        completedLessons: 'الدروس المكتملة', streak: 'أيام التدريب المتتالية',
        settings: 'الإعدادات', language: 'اللغة', switchLang: 'تغيير اللغة',
        about: 'عن التطبيق', aboutDesc: 'تطبيق شامل لتعليم الكمان بالطريقة الأكاديمية الغربية والعربية.',
        version: 'الإصدار: 1.1.0', resetProgress: 'إعادة تعيين التقدم', reset: 'إعادة تعيين',
        home: 'الرئيسية', mainSections: 'الأقسام الرئيسية', lessons: 'درس'
    },
    en: {
        appTitle: 'Violin Master',
        welcome: 'Welcome to Your Violin Journey',
        welcomeDesc: 'Learn violin academically - Western & Arabic traditions, from basics to mastery',
        scales: 'Scales', scalesDesc: 'Western & Arabic',
        arpeggios: 'Arpeggios', arpeggiosDesc: 'Chords & harmonies',
        bowing: 'Bowing Techniques', bowingDesc: 'Bows & strokes',
        harmony: 'Harmony', harmonyDesc: 'Tonal harmony',
        exercises: 'Exercises', exercisesDesc: 'Ševčík, Kreutzer',
        pieces: 'Pieces', piecesDesc: 'Beginner to advanced',
        modes: 'Modes', modesDesc: 'Musical modes',
        theory: 'Theory', theoryDesc: 'Notes & rhythm',
        tools: 'Tools', metronome: 'Metronome', metronomeDesc: 'Control tempo & rhythm',
        tuner: 'Tuner', tunerDesc: 'Tune violin strings',
        refPitch: 'Reference Pitches', refPitchDesc: 'Listen to string notes',
        scalePlayer: 'Scale Player', scalePlayerDesc: 'Listen to scales',
        progress: 'Progress', totalTime: 'Total Practice Time', minutes: 'minutes',
        completedLessons: 'Completed Lessons', streak: 'Day Streak 🔥',
        settings: 'Settings', language: 'Language', switchLang: 'Switch Language',
        about: 'About', aboutDesc: 'Comprehensive violin learning app - Western & Arabic academic traditions.',
        version: 'Version: 1.1.0', resetProgress: 'Reset Progress', reset: 'Reset',
        home: 'Home', mainSections: 'Main Sections', lessons: 'lessons'
    }
};

let currentLang = localStorage.getItem('lang') || 'ar';

function applyLang() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) el.textContent = i18n[currentLang][key];
    });
}

function toggleLang() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
unerNote">-</div>
            <div class="    localStorage.setItem('lang', currentLang);
    applyLang();
}

// ========== التنقل بين التبويبات ==========
function switchTab(tabName, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    if (el) el.classList.add('active');
}

// ========== النوافذ المنبثقة ==========
function openModal(title, body) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = body;
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    stopAllAudio();
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

// ترددات النوتات
const NOTE_FREQS = {
    'G3': 196.00, 'G#3': 207.65, 'Ab3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'Bb3': 233.08, 'B3': 246.94,
    'C4': 261.63, 'C#4': 277.18, 'Db4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'Eb4': 311.13, 'E4': 329.63,
    'F4': 349.23, 'F#4': 369.99, 'Gb4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'Ab4': 415.30, 'A4': 440.00,
    'A#4': 466.16, 'Bb4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'C#5': 554.37, 'Db5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'Eb5': 622.25, 'E5': 659.25,
    'F5': 698.46, 'F#5': 739.99, 'Gb5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'Ab5': 830.61, 'A5': 880.00,
    'A#5': 932.33, 'Bb5': 932.33, 'B5': 987.77, 'C6': 1046.50
};

// ========== 1. محرك الصوت المطور (محاكاة الكمان) ==========
function playNote(freq, duration = 1.0, type = 'sawtooth') {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const vibOsc = ctx.createOscillator(); // اهتزاز (Vibrato) لمحاكاة اليد
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = type;
    osc.frequency.value = freq;
    
    // إعداد الاهتزاز (Vibrato) لجعل الصوت بشرياً وواقعياً
    vibOsc.frequency.value = 5.5; // تردد الاهتزاز ~5.5 هرتز
    const vibGain = ctx.createGain();
    vibGain.gain.value = freq * 0.015; // عمق الاهتزاز
    vibOsc.connect(vibGain);
    vibGain.connect(osc.frequency);
    
    // فلتر لتنعيم الصوت الحاد وجعله دافئاً مثل الكمان
    filter.type = 'lowpass';
    filter.frequency.value = 3000;
    filter.Q.value = 1.5;
    
    const now = ctx.currentTime;
    // محاكاة حركة القوس: هجوم بطيء (Attack)، استقرار (Sustain)، ثم تحرر (Release)
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.15); // هجوم القوس
    gain.gain.linearRampToValueAtTime(0.25, now + 0.4);  // استقرار
    gain.gain.setValueAtTime(0.25, now + duration - 0.2);
    gain.gain.linearRampToValueAtTime(0, now + duration); // تحرر القوس
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    vibOsc.start(now);
    osc.stop(now + duration);
    vibOsc.stop(now + duration);
    
    activeOscillators.push(osc, vibOsc);
    osc.onended = () => {
        activeOscillators = activeOscillators.filter(o => o !== osc && o !== vibOsc);
    };
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
        { name: 'C Major', nameAr: 'دو majeur', notes: ['C4','D4','E4','F4','G4','A4','B4','C5'], formula: 'W-W-H-W-W-W-H', desc: 'المقام الأساسي - بدون علامات' },
        { name: 'G Major', nameAr: 'صول majeur', notes: ['G4','A4','B4','C5','D5','E5','F#5','G5'], formula: 'W-W-H-W-W-W-H', desc: 'إيز واحد (F#)' },
        { name: 'D Major', nameAr: 'ري majeur', notes: ['D4','E4','F#4','G4','A4','B4','C#5','D5'], formula: 'W-W-H-W-W-W-H', desc: 'إيزان (F#, C#)' },
        { name: 'A Major', nameAr: 'لا majeur', notes: ['A4','B4','C#5','D5','E5','F#5','G#5','A5'], formula: 'W-W-H-W-W-W-H', desc: 'ثلاثة إيزات' },
        { name: 'E Major', nameAr: 'مي majeur', notes: ['E4','F#4','G#4','A4','B4','C#5','D#5','E5'], formula: 'W-W-H-W-W-W-H', desc: 'أربعة إيزات' },
        { name: 'F Major', nameAr: 'فا majeur', notes: ['F4','G4','A4','Bb4','C5','D5','E5','F5'], formula: 'W-W-H-W-W-W-H', desc: 'بيم واحد (Bb)' },
        { name: 'Bb Major', nameAr: 'سي بيمول majeur', notes: ['Bb4','C5','D5','Eb5','F5','G5','A5','Bb5'], formula: 'W-W-H-W-W-W-H', desc: 'بيمان' },
        { name: 'A Minor (Natural)', nameAr: 'لا مينور طبيعي', notes: ['A4','B4','C5','D5','E5','F5','G5','A5'], formula: 'W-H-W-W-H-W-W', desc: 'المقام الطبيعي' },
        { name: 'A Minor (Harmonic)', nameAr: 'لا مينور تناغمي', notes: ['A4','B4','C5','D5','E5','F5','G#5','A5'], formula: 'W-H-W-W-H-A2-H', desc: 'الدرجة السابعة مرفوعة' },
        { name: 'A Minor (Melodic)', nameAr: 'لا مينور لحني', notes: ['A4','B4','C5','D5','E5','F#5','G#5','A5'], formula: 'W-H-W-W-W-W-H', desc: 'صاعد: 6 و 7 مرفوعان' },
        { name: 'C Minor', nameAr: 'دو مينور', notes: ['C4','D4','Eb4','F4','G4','Ab4','Bb4','C5'], formula: 'W-H-W-W-H-W-W', desc: 'ثلاثة بيمولات' },
        { name: 'Pentatonic Major', nameAr: 'بنتاتونيك majeur', notes: ['C4','D4','E4','G4','A4','C5'], formula: 'W-W-m3-W-m3', desc: 'خمس نغمات' },
        { name: 'Blues Scale', nameAr: 'البلوز', notes: ['C4','Eb4','F4','F#4','G4','Bb4','C5'], formula: 'm3-W-H-H-m3-W', desc: 'الدرجة الزرقاء' },
        { name: 'Chromatic', nameAr: 'كروماتيك', notes: ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5'], formula: 'H-H-H-H-H-H-H-H-Htuner-cents" id="tunerCents">-H-H-H', desc: 'نصف صوت في كل درجة' }
    ],
    arabic: [
        { name: 'Rast', nameAr: 'رست', notes: ['C4','D4','E4','F4','G4','A4','Bb4','C5'], formula: 'T-T-3/4T-T-T-3/4T-T', desc: 'أم المقامات العربية - درجة الثالثة ثلاثة أرباع البعد', root: 'C' },
        { name: 'Bayati', nameAr: 'بياتي', notes: ['D4','E4','F4','G4','A4','Bb4','C5','D5'], formula: '3/4T-T-T-T-3/4T-T', desc: 'من أكثر المقامات شيوعاً - يبدأ من الري', root: 'D' },
        { name: 'Hijaz', nameAr: 'حجاز', notes: ['D4','Eb4','F#4','G4','A4','Bb4','C5','D5'], formula: 'H-3/2T-H-T-H-T-T', desc: 'مقام شرقي بامتياز - يحتوي على ثانية كبيرة بعد الثالثة', root: 'D' },
        { name: 'Nahawand', nameAr: 'نهاوند', notes: ['C4','D4','Eb4','F4','G4','Ab4','Bb4','C5'], formula: 'T-H-T-T-H-T-T', desc: 'مطابق للمينور الغربي - سهل للعزف', root: 'C' },
        { name: 'Saba', nameAr: 'صبا', notes: ['D4','Eb4','F4','Gb4','A4','Bb4','C5','D5'], formula: '3/4T-3/4T-3/4T-T-T-T', desc: 'مقام حزين وعميق - فريد في الطابع', root: 'D' },
        { name: 'Ajam', nameAr: 'عجم', notes: ['Bb4','C5','D5','Eb5','F5','G5','A5','Bb5'], formula: 'T-T-H-T-T-T-H', desc: 'مطابق للميجور الغربي - يبدأ من سي بيمول', root: 'Bb' },
        { name: 'Sikah', nameAr: 'سيكاه', notes: ['E4','F4','G4','A4','B4','C5','D5','E5'], formula: '3/4T-T-T-3/4T-T-T', desc: 'مقام فريد - الدرجة الثالثة ثلاثة أرباع', root: 'E' },
        { name: 'Kurd', nameAr: 'كرد', notes: ['D4','Eb4','F4','G4','A4','Bb4','C5','D5'], formula: 'H-T-T-T-H-T-T', desc: 'مشابه للفريجيان الغربي', root: 'D' },
        { name: 'Nawa Athar', nameAr: 'نهاوند أثر / نوازند', notes: ['C4','Db4','E4','F4','G4','Ab4','Bb4','C5'], formula: 'H-3/2T-H-T-H-T-T', desc: 'حجاز على درجة الدو', root: 'C' },
        { name: 'Iraq', nameAr: 'عراق', notes: ['F4','G4','Ab4','Bb4','C5','Db5','Eb5','F5'], formula: 'T-H-T-T-H-T-T', desc: 'مقام عراقي تقليدي', root: 'F' }
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
                    <div style="font-size: 13px; color: var(--gold); margin: 4px 0;">${s.nameAr}</div>
                    <div class="lesson-meta">
                        <span>${s.notes.length} نغمات</span>
                    </div>
                </div>
            `).join('')}
        </div>
        <div id="sub-arabic" class="sub-tab-content" style="display:none;">
            ${SCALES.arabic.map((s, i) => `
                <div class="lesson-item" onclick='showScale(${JSON.stringify(s)})'>
                    <div class="lesson-title">${s.nameAr}</div>
                    <div style="font-size: 13px; color: var(--gold); margin: 4px 0;">${s.name}</div>
                    <div class="lesson-meta">
                        <span>${s.notes.length} نغمات</span>
                    </div>
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
                <div class="scale-note" onclick="playNoteByName('${n}', 0.8)">${n.replace(/[0-9]/g,'')}</div>
            `).join('')}
        </div>
        <div style="text-align: center; margin-top: 15px;">
            <button class="play-btn" onclick='playScaleSequence(${JSON.stringify(scale.notes)})'>▶ تشغيل متتابع</button>
            <button class="play-btn secondary" onclick='playScaleTogether(${JSON.stringify(scale.notes)})'> تشغيل معاً</button>
        </div>
        <div class="info-box" style="margin-top: 15px;">
            <strong>💡 نصيحة للتدريب:</strong><br>
            • اعزف السلم صعوداً ونزولاً ببطء<br>
            • استخدم الميترونوم على 60 BPM<br>
            • ركز على نقاء النغمة ووضوح الأصابع<br>
            • كرر 10 مرات يومياً
        </div>
    `;في انتظار الصوت...</div>
            <div class="
    openModal('🎼 ' + (scale.nameAr || scale.name), body);
}

function playScaleSequence(notes) {
    stopAllAudio();
    notes.forEach((note, i) => {
        setTimeout(() => playNoteByName(note, 0.6), i * 500);
    });
}

function playScaleTogether(notes) {
    stopAllAudio();
    notes.forEach((note, i) => {
        setTimeout(() => playNoteByName(note, 1.5), i * 150);
    });
}

// ========== باقي الوظائف ==========
function openArpeggios() {
    openModal('🎵 الأربيجيات', '<div class="info-box">قريباً - محتوى غني بالأربيجيات</div>');
}

function openBowing() {
    openModal(' تقنيات القوس', '<div class="info-box">قريباً - 12 تقنية قوس احترافية</div>');
}

function openHarmony() {
    openModal('🎹 الهارموني', '<div class="info-box">قريباً - علم التناغم الموسيقي</div>');
}

function openExercises() {
    openModal('💪 التمارين', '<div class="info-box">قريباً - 50+ تمرين من Ševčík إلى Paganini</div>');
}

function openPieces() {
    openModal('🎭 المقطوعات', '<div class="info-box">قريباً - 30+ مقطوعة من المبتدئ إلى المتقدم</div>');
}

function openModes() {
    openModal('🌀 الموردين', '<div class="info-box">قريباً - 7 أوضاع موسيقية</div>');
}

function openTheory() {
    openModal('📖 النظرية', '<div class="info-box">قريباً - النظرية الموسيقية الكاملة</div>');
}

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

let currentBPM = 80;
let metronomeOn = false;

function changeBPM(delta) {
    currentBPM = Math.max(30, Math.min(300, currentBPM + delta));
    document.getElementById('bpmDisplay').textContent = currentBPM;
    if (metronomeOn) {
        clearInterval(metronomeInterval);
        startMetronome();
    }
}

function toggleMetronome() {
    metronomeOn = !metronomeOn;
    const btn = document.getElementById('metroBtn');
    if (metronomeOn) {
        btn.textContent = '⏸ إيقاف';
        startMetronome();
    } else {
        btn.textContent = '▶ تشغيل';
        clearInterval(metronomeInterval);
    }
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
    osc.frequency.value = 1000;
    osc.type = 'square';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
}

function openTuner() {
    const body = `
        <div class="tuner-display">
            <div class="tuner-note" id="tunerNote">-</div>
            <div class="tuner-cents" id="tunerCents">في انتظار الصوت...</div>
            <div class="tuner-meter">
                <div class="tunertuner-meter">
                <div class="tuner-indicator" id="tunerIndicator"></div>
-indicator" id="tunerIndicator"></div>
            </div>
            <button class="play-btn            </div>
            <button class="play-btn" id="tunerBtn" onclick="toggleTuner" id="tunerBtn" onclick="toggleTuner()">🎤 بدء الضبط</button>
       ()">🎤 بدء الضبط</button>
        </div>
    `;
    openModal(' </div>
    `;
    openModal('🎚️ الضبط', body);
}

🎚️ الضبط', body);
}

let tunerStream = null;
let tunerAnalyser =let tunerStream = null;
let tunerAnalyser = null;
let tunerAnimId = null;

async null;
let tunerAnimId = null;

async function toggleTuner() {
    const btn = document function toggleTuner() {
    const btn = document.getElementById('tunerBtn');
    if (tuner.getElementById('tunerBtn');
    if (tunerStream) {
        tunerStream.getTracks().forEach(tStream) {
        tunerStream.getTracks().forEach(t => t.stop());
        tunerStream = null;
 => t.stop());
        tunerStream = null;
        cancelAnimationFrame(tunerAnimId);
        btn.textContent        cancelAnimationFrame(tunerAnimId);
        btn.textContent = '🎤 بدء الضبط';
        document = '🎤 بدء الضبط';
        document.getElementById('tunerNote').textContent = '-';
       .getElementById('tunerNote').textContent = '-';
        document.getElementById('tunerCents').textContent = 'في document.getElementById('tunerCents').textContent = 'في انتظار الصوت...';
        return;
    }
 انتظار الصوت...';
        return;
    }
    try {
        tunerStream = await navigator.mediaDevices    try {
        tunerStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ctx =.getUserMedia({ audio: true });
        const ctx = getAudioCtx();
        const source = ctx.createMedia getAudioCtx();
        const source = ctx.createMediaStreamSource(tunerStream);
        tunerAnalyser =StreamSource(tunerStream);
        tunerAnalyser = ctx.createAnalyser();
        tunerAnalyser.fftSize ctx.createAnalyser();
        tunerAnalyser.fftSize = 2048;
        source.connect(t = 2048;
        source.connect(tunerAnalyser);
        btn.textContent = 'unerAnalyser);
        btn.textContent = ' إيقاف';
        detectPitch();
    } catch إيقاف';
        detectPitch();
    } catch(e) {
        alert('يجب السماح بالوصول(e) {
        alert('يجب السماح بالوصول للميكروفون');
    }
}

function للميكروفون');
    }
}

function detectPitch() {
    if (!tunerAnalyser detectPitch() {
    if (!tunerAnalyser) return;
    const buffer = new Float32) return;
    const buffer = new Float32Array(tunerAnalyser.fftSize);
    tunerAnalyArray(tunerAnalyser.fftSize);
    tunerAnalyser.getFloatTimeDomainData(buffer);
    
    let rmsser.getFloatTimeDomainData(buffer);
    
    let rms = 0;
    for (let i =  = 0;
    for (let i = 0; i < buffer.length; i++) rms += buffer0; i < buffer.length; i++) rms += buffer[i] * buffer[i];
    rms = Math.sqrt[i] * buffer[i];
    rms = Math.sqrt(rms / buffer.length);
    
    if (rms(rms / buffer.length);
    
    if (rms < 0.01) {
        tunerAnim < 0.01) {
        tunerAnimId = requestAnimationFrame(detectPitch);
        return;Id = requestAnimationFrame(detectPitch);
        return;
    }
    
    let prev = 0,
    }
    
    let prev = 0, cur = 0, crossings = 0;
    cur = 0, crossings = 0;
    for (let i = 0; i < buffer.length for (let i = 0; i < buffer.length; i++) {
        cur = buffer[i];
; i++) {
        cur = buffer[i];
        if ((prev <= 0 && cur > 0        if ((prev <= 0 && cur > 0) || (prev >= 0 && cur < 0) || (prev >= 0 && cur < 0)) crossings++;
        prev = cur;
    })) crossings++;
        prev = cur;
    }
    
    const freq = (crossings / 2
    
    const freq = (crossings / 2) * (44100 / buffer.length);) * (44100 / buffer.length);
    
    if (freq > 100 &&
    
    if (freq > 100 && freq < 2000) {
        const freq < 2000) {
        const note = freqToNote(freq);
        document.getElementById(' note = freqToNote(freq);
        document.getElementById('tunerNote').textContent = note.name;
        documenttunerNote').textContent = note.name;
        document.getElementById('tunerCents').textContent = note.cents.getElementById('tunerCents').textContent = note.cents + ' cents';
        const indicator = document.getElementById + ' cents';
        const indicator = document.getElementById('tunerIndicator');
        const offset = Math.max('tunerIndicator');
        const offset = Math.max(-50, Math.min(50, note.c(-50, Math.min(50, note.cents));
        indicator.style.left = `calc(5ents));
        indicator.style.left = `calc(50% + ${offset}%)`;
        indicator.style0% + ${offset}%)`;
        indicator.style.background = Math.abs(note.cents) < 5 ?.background = Math.abs(note.cents) < 5 ? 'var(--success)' : 'var(--gold) 'var(--success)' : 'var(--gold)';
    }
    
    tunerAnimId = request';
    }
    
    tunerAnimId = requestAnimationFrame(detectPitch);
}

function freqToNoteAnimationFrame(detectPitch);
}

function freqToNote(freq) {
    const notes = ['C','C(freq) {
    const notes = ['C','C#','D','D#','E','F','F#','D','D#','E','F','F#','G','G#','A','A##','G','G#','A','A#','B'];
    const A4 = 44','B'];
    const A4 = 440;
    const semitones = 120;
    const semitones = 12 * Math.log2(freq / A4);
    const * Math.log2(freq / A4);
    const rounded = Math.round(semitones);
    const note rounded = Math.round(semitones);
    const noteIndex = (9 + rounded + 120)Index = (9 + rounded + 120) % 12;
    const octave = 4 % 12;
    const octave = 4 + Math.floor((rounded + 9) / 1 + Math.floor((rounded + 9) / 12);
    const cents = Math.round((semit2);
    const cents = Math.round((semitones - rounded) * 100);
   ones - rounded) * 100);
    return { name: notes[noteIndex] + octave, return { name: notes[noteIndex] + octave, cents };
}

function openReferencePitches() { cents };
}

function openReferencePitches() {
    const body = `
        <div class="
    const body = `
        <div class="info-box">
            <strong>اضغط على الوinfo-box">
            <strong>اضغط على الوتر لسماع نغمته:</strong>
       تر لسماع نغمته:</strong>
        </div>
        <div style="text-align: </div>
        <div style="text-align: center; padding: 20px;">
            < center; padding: 20px;">
            <button class="string-btn" onclick="playNote(1button class="string-btn" onclick="playNote(196.00, 2)" style="font96.00, 2)" style="font-size: 18px;">G - صول</-size: 18px;">G - صول</button>
            <button class="string-btn" onclickbutton>
            <button class="string-btn" onclick="playNote(293.66, ="playNote(293.66, 2)" style="font-size: 18px;">2)" style="font-size: 18px;">D - ري</button>
            <button class="D - ري</button>
            <button class="string-btn" onclick="playNote(440.string-btn" onclick="playNote(440.00, 2)" style="font-size: 00, 2)" style="font-size: 18px;">A - لا</button>
           18px;">A - لا</button>
            <button class="string-btn" onclick="playNote( <button class="string-btn" onclick="playNote(659.25, 2)" style="659.25, 2)" style="font-size: 18px;">E - مي</font-size: 18px;">E - مي</button>
        </div>
    `;
button>
        </div>
    `;
    openModal('🔊 النغمات المرجعية    openModal('🔊 النغمات المرجعية', body);
}

function openScalePlayer() {', body);
}

function openScalePlayer() {
    const allScales = [...SCALES.western
    const allScales = [...SCALES.western, ...SCALES.arabic];
    const body =, ...SCALES.arabic];
    const body = `
        <input type="text" class="search `
        <input type="text" class="search-box" placeholder="ابحث عن مقام..." oninput="-box" placeholder="ابحث عن مقام..." oninput="filterScales(this.value)">
        <div id="filterScales(this.value)">
        <div id="scalePlayerList">
            ${allScales.map((scalePlayerList">
            ${allScales.map((s, i) => `
                <div class="s, i) => `
                <div class="lesson-item scale-item" data-name="${s.name} ${lesson-item scale-item" data-name="${s.name} ${s.nameAr}" onclick='showScale(${JSON.stringify(ss.nameAr}" onclick='showScale(${JSON.stringify(s)})'>
                    <div class="lesson-title">${s)})'>
                    <div class="lesson-title">${s.nameAr || s.name}</div>
                    <div.nameAr || s.name}</div>
                    <div style="font-size: 12px; color: style="font-size: 12px; color: var(--gold);">${s.name}</div>
                var(--gold);">${s.name}</div>
                </div>
            `).join('')}
        </div>
            `).join('')}
        </div>
    `;
    openModal(' </div>
    `;
    openModal('🎶 مشغل المقامات', body);
🎶 مشغل المقامات', body);
}

function filterScales(query) {
    document}

function filterScales(query) {
    document.querySelectorAll('.scale-item').forEach(item => {
        const.querySelectorAll('.scale-item').forEach(item => {
        const name = item.dataset.name.toLowerCase();
        item.style.display name = item.dataset.name.toLowerCase();
        item.style.display = name.includes(query.toLowerCase()) ? 'block' : ' = name.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}

// ========== 2none';
    });
}

// ========== 2. محرك النوتة الموسيقية (VexFlow. محرك النوتة الموسيقية (VexFlow) ==========
function renderVexFlow(containerId, notes) ==========
function renderVexFlow(containerId, notesString, clef = 'treble', time = 'String, clef = 'treble', time = '4/4') {
    const container = document.getElementById4/4') {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
   (containerId);
    container.innerHTML = '';
    
    const { Factory, EasyScore, System } = const { Factory, EasyScore, System } = Vex.Flow;
    const vf = new Factory Vex.Flow;
    const vf = new Factory({ renderer: { elementId: containerId, width:({ renderer: { elementId: containerId, width: container.offsetWidth || 400, height: 1 container.offsetWidth || 400, height: 160 } });
    const score = vf.Easy60 } });
    const score = vf.EasyScore();
    const system = vf.System();
    
Score();
    const system = vf.System();
    
    system.addStave({
        voices: [score    system.addStave({
        voices: [score.voice(score.notes(notesString, { clef: cle.voice(score.notes(notesString, { clef: clef }))]
    }).addClef(cf }))]
    }).addClef(clef).addTimeSignature(time);
    
    vf.drawlef).addTimeSignature(time);
    
    vf.draw();
}

// ========== 3. غرفة التدريب الت();
}

// ========== 3. غرفة التدريب التفاعلية ==========
function openPracticeRoom() {
   فاعلية ==========
function openPracticeRoom() {
    const body = `
        <div class="info-box const body = `
        <div class="info-box">
            <strong>🎯 تمرين الأ">
            <strong>🎯 تمرين الأوتار المفتوحة والإيقاع</strong><br>وتار المفتوحة والإيقاع</strong><br>
            استمع للنوتة، ثم حاول عز
            استمع للنوتة، ثم حاول عزفها على كمانك. اضغط على النوتفها على كمانك. اضغط على النوتة لسماعها.
        </div>
ة لسماعها.
        </div>
        <div class="practice-container">
            <div        <div class="practice-container">
            <div id="vexflow-staff" class="vex id="vexflow-staff" class="vexflow-wrapper"></div>
            <div class="practiceflow-wrapper"></div>
            <div class="practice-controls">
                <button class="play-btn" onclick-controls">
                <button class="play-btn" onclick="playPracticeSequence()">▶ استمع للتمرين كام="playPracticeSequence()">▶ استمع للتمرين كاملاً</button>
                <button class="play-btnلاً</button>
                <button class="play-btn secondary" onclick="startListeningMode()">🎤 تفعيل secondary" onclick="startListeningMode()">🎤 تفعيل الاستماع (قريباً)</button>
            </ الاستماع (قريباً)</button>
            </div>
        </div>
    `;
div>
        </div>
    `;
    openModal('🎯 غرفة التدريب التفاعلية    openModal('🎯 غرفة التدريب التفاعلية', body);
    
    setTimeout(() => {
       ', body);
    
    setTimeout(() => {
        renderVexFlow('vexflow-staff', ' renderVexFlow('vexflow-staff', 'C4/q, D4/q, E4/hC4/q, D4/q, E4/h, F4/h, G4/w');, F4/h, G4/w');
    }, 100);
}

function
    }, 100);
}

function playPracticeSequence() {
    stopAllAudio();
 playPracticeSequence() {
    stopAllAudio();
    const notes = [
        { name: 'C    const notes = [
        { name: 'C4', duration: 0.5 },
        {4', duration: 0.5 },
        { name: 'D4', duration: 0.5 name: 'D4', duration: 0.5 },
        { name: 'E4', duration: },
        { name: 'E4', duration: 1.0 },
        { name: 'F 1.0 },
        { name: 'F4', duration: 1.0 },
        {4', duration: 1.0 },
        { name: 'G4', duration: 2.0 name: 'G4', duration: 2.0 }
    ];
    
    let currentTime = 0 }
    ];
    
    let currentTime = 0;
    notes.forEach(note => {
       ;
    notes.forEach(note => {
        setTimeout(() => {
            playNote(NOTE_FREQS setTimeout(() => {
            playNote(NOTE_FREQS[note.name], note.duration);
        }, currentTime[note.name], note.duration);
        }, currentTime * 1000);
        currentTime += note * 1000);
        currentTime += note.duration + 0.1;
    });
}.duration + 0.1;
    });
}

function startListeningMode() {
    alert('ميزة

function startListeningMode() {
    alert('ميزة الاستماع الفعلي تتطلب تفعيل الميكروفون الاستماع الفعلي تتطلب تفعيل الميكروفون. سيتم إضافتها في المرحلة 2 بالتفصيل مع. سيتم إضافتها في المرحلة 2 بالتفصيل مع مطابقة النوتة الحية!');
}

 مطابقة النوتة الحية!');
}

// ========== تتبع التقدم ==========
function updateProgress() {
// ========== تتبع التقدم ==========
function updateProgress() {
    const data = JSON.parse(localStorage.getItem('violinProgress    const data = JSON.parse(localStorage.getItem('violinProgress') || '{"time":0,"lessons":0,"st') || '{"time":0,"lessons":0,"streak":0,"lastDate":""}');
    documentreak":0,"lastDate":""}');
    document.getElementById('totalTime').textContent = data.time;
   .getElementById('totalTime').textContent = data.time;
    document.getElementById('completedLessons').textContent = data.lessons document.getElementById('completedLessons').textContent = data.lessons;
    document.getElementById('streak').textContent = data;
    document.getElementById('streak').textContent = data.streak;
    const pct = Math.min(1.streak;
    const pct = Math.min(100, (data.lessons / 15000, (data.lessons / 150) * 100);
    document.getElementById(') * 100);
    document.getElementById('progressBar').style.width = pct + '%';
}progressBar').style.width = pct + '%';
}

function resetProgress() {
    if (confirm('

function resetProgress() {
    if (confirm('هل أنت متأكد من إعادة تعيين التقدم؟')) {
هل أنت متأكد من إعادة تعيين التقدم؟')) {
        localStorage.removeItem('violinProgress');
        updateProgress        localStorage.removeItem('violinProgress');
        updateProgress();
    }
}

// ========== التشغيل ==========
();
    }
}

// ========== التشغيل ==========
applyLang();
updateProgress();

let sessionStart =applyLang();
updateProgress();

let sessionStart = Date.now();
setInterval(() => {
    const Date.now();
setInterval(() => {
    const data = JSON.parse(localStorage.getItem('violinProgress') || data = JSON.parse(localStorage.getItem('violinProgress') || '{"time":0,"lessons":0,"streak": '{"time":0,"lessons":0,"streak":0,"lastDate":""}');
    const mins =0,"lastDate":""}');
    const mins = Math.floor((Date.now() - sessionStart) /  Math.floor((Date.now() - sessionStart) / 60000);
    if (mins >60000);
    if (mins > 0) {
        data.time += mins;
 0) {
        data.time += mins;
        sessionStart = Date.now();
        const today =        sessionStart = Date.now();
        const today = new Date().toDateString();
        if (data.last new Date().toDateString();
        if (data.lastDate !== today) {
            const yesterday = new DateDate !== today) {
            const yesterday = new Date(Date.now() - 8640000(Date.now() - 86400000).toDateString();
            data.streak = (0).toDateString();
            data.streak = (data.lastDate === yesterday) ? data.streak + data.lastDate === yesterday) ? data.streak + 1 : 1;
            data.lastDate = today1 : 1;
            data.lastDate = today;
        }
        localStorage.setItem('violinProgress;
        }
        localStorage.setItem('violinProgress', JSON.stringify(data));
        updateProgress();
   ', JSON.stringify(data));
        updateProgress();
    }
}, 60000);

 }
}, 60000);

// تسجيل Service Worker
if ('serviceWorker' in navigator// تسجيل Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').) {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
}
