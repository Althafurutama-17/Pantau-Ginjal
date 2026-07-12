/**
 * =========================================
 *  APLIKASI SKRINING KESEHATAN GINJAL
 *  File: js/app.js
 *  Deskripsi: Semua logika JavaScript aplikasi
 *  Single Page Application — Client-side
 * =========================================
 */

// ===== DATA PERTANYAAN =====
// 10 pertanyaan subjektif berdasarkan literatur medis — 3 opsi (0,1,2)
const QUESTIONS = [
    {
        id: 1,
        code: 'subj_foamy_urine',
        question: 'Dalam 1 minggu terakhir, seberapa sering Anda melihat urine (air kencing) Anda berbusa atau berbuih?',
        options: [
            { label: 'Tidak pernah', value: 0 },
            { label: 'Kadang-kadang', value: 1 },
            { label: 'Sering', value: 2 }
        ],
        timeFrame: '1 minggu'
    },
    {
        id: 2,
        code: 'subj_pruritus',
        question: 'Dalam 1 minggu terakhir, seberapa sering Anda merasa gatal-gatal pada kulit tanpa sebab yang jelas?',
        options: [
            { label: 'Tidak pernah', value: 0 },
            { label: 'Kadang-kadang', value: 1 },
            { label: 'Sering', value: 2 }
        ],
        timeFrame: '1 minggu'
    },
    {
        id: 3,
        code: 'subj_fatigue',
        question: 'Dalam 1 minggu terakhir, seberapa sering Anda merasa mudah lelah tanpa sebab yang jelas?',
        options: [
            { label: 'Tidak pernah', value: 0 },
            { label: 'Kadang-kadang', value: 1 },
            { label: 'Sering', value: 2 }
        ],
        timeFrame: '1 minggu'
    },
    {
        id: 4,
        code: 'subj_edema',
        question: 'Dalam 1 minggu terakhir, apakah Anda mengalami pembengkakan di kaki atau pergelangan kaki?',
        options: [
            { label: 'Tidak pernah', value: 0 },
            { label: 'Kadang-kadang', value: 1 },
            { label: 'Sering', value: 2 }
        ],
        timeFrame: '1 minggu'
    },
    {
        id: 5,
        code: 'subj_nocturia',
        question: 'Dalam 1 minggu terakhir, seberapa sering Anda terbangun di malam hari untuk buang air kecil (lebih dari 2 kali)?',
        options: [
            { label: 'Tidak pernah', value: 0 },
            { label: 'Kadang-kadang', value: 1 },
            { label: 'Sering', value: 2 }
        ],
        timeFrame: '1 minggu'
    },
    {
        id: 6,
        code: 'subj_dry_mouth',
        question: 'Dalam 1 minggu terakhir, seberapa sering Anda merasa mulut terasa kering?',
        options: [
            { label: 'Tidak pernah', value: 0 },
            { label: 'Kadang-kadang', value: 1 },
            { label: 'Sering', value: 2 }
        ],
        timeFrame: '1 minggu'
    },
    {
        id: 7,
        code: 'subj_taste_change',
        question: 'Dalam 1 minggu terakhir, apakah Anda mengalami perubahan rasa (misal: rasa logam di mulut, kehilangan rasa, atau rasa aneh)?',
        options: [
            { label: 'Tidak ada perubahan', value: 0 },
            { label: 'Perubahan ringan', value: 1 },
            { label: 'Perubahan jelas', value: 2 }
        ],
        timeFrame: '1 minggu'
    },
    {
        id: 8,
        code: 'subj_nail_change',
        question: 'Dalam 1 bulan terakhir, apakah Anda melihat perubahan pada kuku Anda (misal: kuku pucat, bercak putih, kuku rapuh)?',
        options: [
            { label: 'Tidak ada perubahan', value: 0 },
            { label: 'Perubahan ringan', value: 1 },
            { label: 'Perubahan jelas', value: 2 }
        ],
        timeFrame: '1 bulan'
    },
    {
        id: 9,
        code: 'subj_skin_change',
        question: 'Dalam 1 bulan terakhir, apakah Anda melihat perubahan pada kulit Anda (misal: kulit sangat kering, pucat, atau perubahan warna)?',
        options: [
            { label: 'Tidak ada perubahan', value: 0 },
            { label: 'Perubahan ringan', value: 1 },
            { label: 'Perubahan jelas', value: 2 }
        ],
        timeFrame: '1 bulan'
    },
    {
        id: 10,
        code: 'subj_sleep_disturbance',
        question: 'Dalam 1 minggu terakhir, seberapa sering Anda mengalami kesulitan tidur atau tidur tidak nyenyak?',
        options: [
            { label: 'Tidak pernah', value: 0 },
            { label: 'Kadang-kadang', value: 1 },
            { label: 'Sering', value: 2 }
        ],
        timeFrame: '1 minggu'
    }
];

// ===== TIPS BERDASARKAN STATUS =====
// Setiap status memiliki kiat-kiat yang SPESIFIK dan INFORMATIF
const TIPS = {
    sehat: [
        "Pertahankan pola makan rendah garam — batasi konsumsi garam maksimal 1 sendok teh (5 gram) per hari untuk menjaga tekanan darah tetap stabil.",
        "Minum air putih minimal 8 gelas (sekitar 2 liter) setiap hari, kecuali ada kondisi khusus yang membatasi asupan cairan.",
        "Rutin memeriksakan tekanan darah minimal sebulan sekali, karena hipertensi adalah salah satu faktor risiko utama penyakit ginjal.",
        "Hindari konsumsi obat pereda nyeri golongan NSAID (seperti ibuprofen) secara berlebihan, karena dapat memengaruhi fungsi ginjal dalam jangka panjang.",
        "Lakukan aktivitas fisik ringan seperti jalan kaki selama 30 menit setiap hari untuk menjaga sirkulasi darah tetap lancar."
    ],
    waspada: [
        "Kurangi konsumsi protein hewani (daging merah, unggas, telur) dan makanan olahan (sosis, nugget, makanan kaleng) karena membebani kerja ginjal.",
        "Perbanyak konsumsi buah dan sayur segar — terutama yang rendah kalium seperti apel, anggur, kol, dan mentimun.",
        "Segera periksakan gula darah dan tekanan darah secara rutin minimal 2 minggu sekali untuk memantau kondisi tubuh.",
        "Batasi konsumsi makanan tinggi garam seperti keripik, mie instan, dan acar. Gunakan bumbu alami sebagai pengganti garam.",
        "Hindari minuman beralkohol dan kurangi minuman berkafein (kopi, teh kental) karena dapat memengaruhi tekanan darah dan hidrasi tubuh."
    ],
    konsultasi: [
        "Segera konsultasikan ke dokter spesialis ginjal (nefrologi) dalam waktu 1–2 minggu untuk pemeriksaan lebih lanjut seperti tes darah (kreatinin, ureum) dan tes urine.",
        "Hindari konsumsi obat-obatan bebas terutama golongan NSAID (seperti aspirin, ibuprofen, diklofenak) karena dapat memperburuk kerusakan ginjal.",
        "Batasi asupan makanan tinggi kalium (pisang, jeruk, kentang, tomat, bayam) dan tinggi fosfor (keju, susu, kacang-kacangan, minuman bersoda) — konsultasikan dengan dokter mengenai batas aman untuk Anda.",
        "Pantau jumlah urine setiap hari — jika volume urine berkurang drastis atau justru berlebihan di malam hari, segera laporkan ke dokter.",
        "Jangan menunda pemeriksaan meskipun merasa tidak ada keluhan berarti. Deteksi dan penanganan dini sangat penting untuk memperlambat perkembangan penyakit ginjal."
    ],
    risiko_tinggi: [
        "Segera konsultasikan ke dokter spesialis ginjal (nefrologi) dalam 1 minggu untuk pemeriksaan lengkap: tes darah (kreatinin, ureum, elektrolit), tes urine (proteinuria), dan USG ginjal.",
        "HINDARI semua obat pereda nyeri golongan NSAID (ibuprofen, aspirin, diklofenak, naproxen) — dapat memperburuk kerusakan ginjal secara signifikan.",
        "Batasi asupan garam maksimal 3 gram per hari. Hindari makanan olahan, mie instan, keripik, dan makanan kaleng.",
        "Pantau tekanan darah 2 kali sehari (pagi dan malam). Catat hasilnya untuk diperlihatkan ke dokter.",
        "Jangan tunda — kondisi ini memerlukan penanganan medis segera untuk mencegah kerusakan ginjal lebih lanjut."
    ],
    gawat_darurat: [
        "SEGERA pergi ke IGD atau fasilitas kesehatan terdekat — kondisi ini memerlukan penanganan medis darurat.",
        "Jangan mengonsumsi obat apapun tanpa resep dokter, terutama obat pereda nyeri dan antibiotik.",
        "Jika mengalami sesak napas parah, muntah terus-menerus, atau kebingungan — segera hubungi layanan darurat.",
        "Bawa hasil skrining ini ke dokter sebagai informasi awal untuk penanganan lebih lanjut.",
        "Kondisi ini bisa mengancam jiwa jika tidak ditangani segera. Prioritas utama adalah keselamatan Anda."
    ]
};

// ===== STATE APLIKASI =====
let isLoggedIn = false;  // Status login (false = belum login)
let currentUser = null;  // Data user yang sedang login

const state = {
    currentPage: 'login',
    currentQuestion: 0,
    answers: {},
    objectiveData: null
};

// ===== REFERENSI DOM =====
const $ = (id) => document.getElementById(id);
const loginPage      = $('page-login');
const profilePage    = $('page-profile');
const dashboardPage  = $('page-dashboard');
const questionnairePage = $('page-questionnaire');
const resultPage     = $('page-result');
const tipsPage       = $('page-tips');
const riwayatPage    = $('page-riwayat');
const bottomNav      = $('bottomNav');
const navFooter      = $('navFooter');
const questionContainer = $('questionContainer');
const progressSection = $('progressSection');
const progressFill   = $('progressFill');
const progressText   = $('progressText');
const progressPercent = $('progressPercent');
const progressBarEl  = $('progressBar');
const modalOverlay   = $('modalOverlay');
const modalSummary   = $('modalSummary');
const btnModalBack   = $('btnModalBack');
const btnModalConfirm = $('btnModalConfirm');
const logoutModalOverlay = $('logoutModalOverlay');
const btnLogoutCancel = $('btnLogoutCancel');
const btnLogoutConfirm = $('btnLogoutConfirm');
const registerPage = $('page-register');
const landingPage = $('page-landing');
const notifModalOverlay = $('notifModalOverlay');
const notifModalIcon = $('notifModalIcon');
const notifModalTitle = $('notifModalTitle');
const notifModalText = $('notifModalText');
const btnNotifClose = $('btnNotifClose');
const appHeader = document.querySelector('header');
const objectivePage = $('page-objective');
const objectiveContainer = $('objectiveContainer');

// ===== FUNGSI NAVIGASI HALAMAN =====
function showPage(pageName) {
    // Sembunyikan semua halaman
    landingPage.classList.remove('active');
    loginPage.classList.remove('active');
    registerPage.classList.remove('active');
    dashboardPage.classList.remove('active');
    profilePage.classList.remove('active');
    questionnairePage.classList.remove('active');
    objectivePage.classList.remove('active');
    resultPage.classList.remove('active');
    tipsPage.classList.remove('active');
    riwayatPage.classList.remove('active');

    // Atur visibilitas bottom navigation
    const showBottomNav = ['dashboard', 'profile', 'tips', 'riwayat'].includes(pageName);
    bottomNav.classList.toggle('visible', showBottomNav);

    // Sembunyikan header di halaman landing & login & register
    const hideHeader = ['landing', 'login', 'register'].includes(pageName);
    appHeader.style.display = hideHeader ? 'none' : '';

    // Full-screen landing page
    const isLanding = pageName === 'landing';
    document.body.classList.toggle('landing-active', isLanding);
    document.querySelector('.app-container').classList.toggle('landing-fullscreen', isLanding);

    if (pageName === 'landing') {
        landingPage.classList.add('active');
        progressSection.classList.remove('visible');
    } else if (pageName === 'login') {
        loginPage.classList.add('active');
        progressSection.classList.remove('visible');
    } else if (pageName === 'register') {
        registerPage.classList.add('active');
        progressSection.classList.remove('visible');
    } else if (pageName === 'dashboard') {
        dashboardPage.classList.add('active');
        progressSection.classList.remove('visible');
        // Aktifkan tab Dashboard
        DashboardManager.activateDashboardTab();
        // Inisialisasi dashboard
        DashboardManager.init();
    } else if (pageName === 'profile') {
        profilePage.classList.add('active');
        progressSection.classList.remove('visible');
        // Aktifkan tab Profil
        DashboardManager.activateProfileTab();
        // Render profil
        DashboardManager.renderProfile();
    } else if (pageName === 'tips') {
        tipsPage.classList.add('active');
        progressSection.classList.remove('visible');
        // Aktifkan tab Tips
        DashboardManager.activateTipsTab();
        // Render tips
        DashboardManager.renderTipsPage();
    } else if (pageName === 'riwayat') {
        riwayatPage.classList.add('active');
        progressSection.classList.remove('visible');
        // Aktifkan tab Riwayat
        DashboardManager.activateRiwayatTab();
    } else if (pageName === 'questionnaire') {
        questionnairePage.classList.add('active');
        progressSection.classList.add('visible');
    } else if (pageName === 'objective') {
        objectivePage.classList.add('active');
        progressSection.classList.remove('visible');
    } else if (pageName === 'result') {
        resultPage.classList.add('active');
        progressSection.classList.remove('visible');
    }

    state.currentPage = pageName;
    renderNavButtons();
}

// ===== FUNGSI RENDER TOMBOL NAVIGASI =====
function renderNavButtons() {
    const page = state.currentPage;

    if (page === 'login' || page === 'profile') {
        navFooter.innerHTML = '';
    } else if (page === 'dashboard') {
        // Dashboard & Home tidak perlu tombol footer
        navFooter.innerHTML = '';
    } else if (page === 'questionnaire') {
        const isFirst = state.currentQuestion === 0;
        const isLast  = state.currentQuestion === QUESTIONS.length - 1;
        const currentCode = QUESTIONS[state.currentQuestion].code;
        const hasAnswer = state.answers[currentCode] !== undefined;

        navFooter.innerHTML = `
            <button class="btn btn-secondary" id="btnBackHome" type="button"><i class="fa-solid fa-house"></i> Beranda</button>
            <div class="nav-divider"></div>
            ${isFirst ? '' : '<button class="btn btn-secondary" id="btnPrev" type="button">← Kembali</button>'}
            <button class="btn btn-primary" id="btnNext" type="button" ${!hasAnswer ? 'disabled' : ''}>
                ${isLast ? 'Lihat Hasil →' : 'Selanjutnya →'}
            </button>
        `;

        $('btnBackHome').addEventListener('click', restartApp);
        if (!isFirst) {
            $('btnPrev').addEventListener('click', prevQuestion);
        }
        $('btnNext').addEventListener('click', nextQuestion);
    } else if (page === 'result') {
        const hasDashboardData = getScreeningCount() > 0;
        navFooter.innerHTML = `
            <button class="btn btn-primary" id="btnRestart" type="button">
                ← Kembali ke Dashboard
            </button>
        `;
        $('btnRestart').addEventListener('click', function () {
            showPage('dashboard');
        });
    }
}

// ===== MEMULAI KUESIONER =====
function startQuestionnaire() {
    state.currentQuestion = 0;
    state.answers = {};
    showPage('questionnaire');
    renderQuestion();
}

// ===== MELANJUTKAN KUESIONER (mulai baru) =====
async function resumeQuestionnaire() {
    state.currentQuestion = 0;
    state.answers = {};
    showPage('questionnaire');
    renderQuestion();
}

// ===== MENAMPILKAN HASIL TERAKHIR DARI SUPABASE =====
async function showLastResult() {
    var screening = await getLatestScreening();
    if (screening) {
        state.answers = screening.answers;
        showResultFromData(screening);
    }
}

// Expose fungsi ke global agar bisa dipanggil dari dashboard.js
window.startQuestionnaire = startQuestionnaire;
window.resumeQuestionnaire = resumeQuestionnaire;
window.showLastResult = showLastResult;
window.renderObjectiveForm = renderObjectiveForm;
window.showResultPartial = showResultPartial;

// ===== RENDER PERTANYAAN =====
function renderQuestion() {
    const q = QUESTIONS[state.currentQuestion];
    const idx = state.currentQuestion;
    const selectedValue = state.answers[q.code];

    // Update progress bar
    updateProgress();

    // Bangun HTML opsi jawaban
    let optionsHtml = '';
    q.options.forEach((opt) => {
        const isChecked = selectedValue === opt.value;
        optionsHtml += `
            <div class="option-item">
                <input type="radio"
                       name="q-${q.id}"
                       id="q${q.id}-opt${opt.value}"
                       value="${opt.value}"
                       ${isChecked ? 'checked' : ''}
                       data-question-code="${q.code}">
                <label for="q${q.id}-opt${opt.value}">
                    <span class="radio-circle"></span>
                    <span>${opt.label}</span>
                </label>
            </div>
        `;
    });

    questionContainer.innerHTML = `
        <div class="question-number">Pertanyaan ${idx + 1} dari ${QUESTIONS.length}</div>
        <div class="question-timeframe">Periode: ${q.timeFrame} terakhir</div>
        <div class="question-text">${q.question}</div>
        <div class="options-group" role="radiogroup" aria-label="Pilihan jawaban pertanyaan ${idx + 1}">
            ${optionsHtml}
        </div>
    `;

    // Event listener untuk radio buttons
    document.querySelectorAll('input[name="q-' + q.id + '"]').forEach((radio) => {
        radio.addEventListener('change', function () {
            state.answers[this.dataset.questionCode] = parseInt(this.value);
            renderNavButtons();
        });
    });

    // Fokus ke pertanyaan
    setTimeout(() => {
        const firstRadio = document.querySelector('input[name="q-' + q.id + '"]');
        if (firstRadio) firstRadio.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    renderNavButtons();
}

// ===== UPDATE PROGRESS BAR =====
function updateProgress() {
    const total = QUESTIONS.length;
    const answeredCount = Object.keys(state.answers).length;
    const percent = Math.round((answeredCount / total) * 100);

    progressFill.style.width = percent + '%';
    progressText.textContent = 'Pertanyaan ' + (state.currentQuestion + 1) + ' dari ' + total;
    progressPercent.textContent = percent + '%';
    progressBarEl.setAttribute('aria-valuenow', percent);
}

// ===== NAVIGASI: PERTANYAAN SEBELUMNYA =====
function prevQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        renderQuestion();
    }
}

// ===== NAVIGASI: PERTANYAAN BERIKUTNYA =====
function nextQuestion() {
    const currentCode = QUESTIONS[state.currentQuestion].code;
    // Pastikan jawaban sudah dipilih
    if (state.answers[currentCode] === undefined) return;

    const isLast = state.currentQuestion === QUESTIONS.length - 1;

    if (isLast) {
        showConfirmationModal();
    } else {
        state.currentQuestion++;
        renderQuestion();
    }
}

// ===== FUNGSI MENGHITUNG SKOR TOTAL =====
function hitungSkor() {
    return Object.values(state.answers).reduce((total, val) => total + (val || 0), 0);
}

// ===== FUNGSI MENENTUKAN STATUS KESEHATAN =====
function tentukanStatus(skor) {
    if (skor <= 8) {
        return { key: 'sehat', label: 'Sehat', icon: '<i class="fa-solid fa-circle-check"></i>', color: 'sehat' };
    } else if (skor <= 16) {
        return { key: 'waspada', label: 'Waspada', icon: '<i class="fa-solid fa-triangle-exclamation"></i>', color: 'waspada' };
    } else if (skor <= 24) {
        return { key: 'risiko_tinggi', label: 'Risiko Tinggi', icon: '<i class="fa-solid fa-circle-exclamation"></i>', color: 'risiko_tinggi' };
    } else {
        return { key: 'gawat_darurat', label: 'Gawat Darurat', icon: '<i class="fa-solid fa-skull-crossbones"></i>', color: 'gawat_darurat' };
    }
}

// ===== FUNGSI HITUNG SKOR OBJEKTIF =====
/**
 * Hitung skor objektif dari data pemeriksaan.
 * Skor 0–3 per parameter, total max = 15.
 * @param {Object} objData - Data objektif
 * @param {string} gender - 'Laki-laki' atau 'Perempuan'
 * @returns {number} Skor objektif (0-15)
 */
function hitungSkorObjektif(objData, gender) {
    if (!objData) return 0;
    let skor = 0;

    // 1. Tekanan Darah (sistolik + diastolik) — max 3
    const sys = objData.obj_systolic_bp;
    const dia = objData.obj_diastolic_bp;
    if (sys && dia) {
        if (sys <= 120 && dia <= 80) skor += 0;          // Normal (≤120/80)
        else if (sys <= 129 && dia < 80) skor += 1;      // Elevated (≤129/<80)
        else if (sys <= 139 && dia <= 89) skor += 2;     // High Stage 1 (≤139/≤89)
        else skor += 3;                                    // High Stage 2 / Crisis (≥140/≥90)
    }

    // 2. Protein Urine — max 3
    const protein = objData.obj_urine_protein;
    if (protein) {
        if (protein === 'Negatif') skor += 0;
        else if (protein === '+1') skor += 2;
        else skor += 3; // +2 atau +3
    }

    // 3. Glukosa Urine — max 3
    const glucose = objData.obj_urine_glucose;
    if (glucose) {
        if (glucose === 'Negatif') skor += 0;
        else if (glucose === '+1') skor += 1;
        else if (glucose === '+2') skor += 2;
        else skor += 3; // +3
    }

    // 4. Gula Darah — max 3
    const bg = objData.obj_blood_glucose;
    if (bg) {
        if (bg < 100) skor += 0;           // Normal
        else if (bg < 126) skor += 1;      // Pre-diabetes
        else if (bg < 200) skor += 2;      // Diabetes
        else skor += 3;                     // Diabetes berat
    }

    // 5. Kolesterol — max 3
    const chol = objData.obj_cholesterol;
    if (chol) {
        if (chol < 200) skor += 0;         // Normal
        else if (chol < 240) skor += 1;    // Borderline
        else if (chol < 280) skor += 2;    // Tinggi
        else skor += 3;                     // Sangat tinggi
    }

    // 6. Hemoglobin — max 3 (threshold sesuai gender)
    const hb = objData.obj_hemoglobin;
    if (hb) {
        const normalMin = (gender === 'Perempuan') ? 12 : 13;
        if (hb >= normalMin) skor += 0;              // Normal
        else if (hb >= normalMin - 1) skor += 1;     // Borderline
        else if (hb >= normalMin - 3) skor += 2;     // Anemia ringan
        else skor += 3;                               // Anemia berat
    }

    return skor;
}

// ===== FUNGSI STATUS BERDASARKAN PERSENTASE =====
/**
 * Tentukan status berdasarkan persentase skor.
 * Digunakan untuk scoring parsial (subjektif atau objektif saja).
 * @param {number} skor - Skor aktual
 * @param {number} totalMaksimal - Total maksimal skor
 * @returns {Object} { key, label, icon, color }
 */
function tentukanStatusFromScore(skor, totalMaksimal) {
    const pct = (skor / totalMaksimal) * 100;
    if (pct <= 25) return { key: 'sehat', label: 'Sehat', icon: '<i class="fa-solid fa-circle-check"></i>', color: 'sehat' };
    if (pct <= 50) return { key: 'waspada', label: 'Waspada', icon: '<i class="fa-solid fa-triangle-exclamation"></i>', color: 'waspada' };
    if (pct <= 75) return { key: 'risiko_tinggi', label: 'Risiko Tinggi', icon: '<i class="fa-solid fa-circle-exclamation"></i>', color: 'risiko_tinggi' };
    return { key: 'gawat_darurat', label: 'Gawat Darurat', icon: '<i class="fa-solid fa-skull-crossbones"></i>', color: 'gawat_darurat' };
}

// ===== FUNGSI DESKRIPSI PER STATUS =====
/**
 * Deskripsi spesifik per status dan tipe.
 * @param {string} statusKey - 'sehat', 'waspada', 'risiko_tinggi', 'gawat_darurat'
 * @param {string} type - 'subjektif', 'objektif', atau 'gabungan'
 * @returns {string}
 */
function getDeskripsiByStatus(statusKey, type) {
    const deskripsi = {
        sehat: {
            subjektif: 'Kondisi ginjal tampak normal berdasarkan gejala yang dilaporkan.',
            objektif: 'Parameter pemeriksaan dalam batas normal.',
            gabungan: 'Kondisi ginjal tampak normal berdasarkan gejala dan pemeriksaan.'
        },
        waspada: {
            subjektif: 'Terdapat beberapa gejala yang perlu diperhatikan. Konsultasikan ke dokter.',
            objektif: 'Beberapa parameter menunjukkan penyimpangan. Perlu evaluasi lebih lanjut.',
            gabungan: 'Terdapat indikasi awal gangguan ginjal. Segera konsultasi ke dokter.'
        },
        risiko_tinggi: {
            subjektif: 'Gejala yang dilaporkan menunjukkan risiko tinggi gangguan ginjal.',
            objektif: 'Beberapa parameter menunjukkan abnormalitas signifikan.',
            gabungan: 'Kombinasi gejala dan data pemeriksaan menunjukkan risiko tinggi. Segera konsultasi ke dokter spesialis ginjal.'
        },
        gawat_darurat: {
            subjektif: 'Gejala yang dilaporkan sangat mengkhawatirkan. Segera periksakan ke dokter.',
            objektif: 'Parameter pemeriksaan menunjukkan kondisi darurat.',
            gabungan: 'Kondisi ini memerlukan penanganan medis segera. Segera pergi ke IGD atau fasilitas kesehatan terdekat!'
        }
    };
    return (deskripsi[statusKey] && deskripsi[statusKey][type]) || 'Periksa ke dokter untuk evaluasi lebih lanjut.';
}

// ===== FUNGSI TAMPILAN HASIL PARSIAL =====
/**
 * Tampilkan halaman hasil berdasarkan tipe data yang tersedia.
 * @param {string} type - 'sbj', 'obj', atau 'full'
 */
async function showResultPartial(type) {
    const screening = await getLatestScreening();
    if (!screening) return;

    const sbj = screening.hasilSbj || null;
    const obj = screening.hasilObj || null;

    let html = '';

    if (type === 'full' || (sbj && obj)) {
        // Tampilkan hasil gabungan — gunakan hasil dari screening (sumber kebenaran)
        const tipsList = TIPS[screening.status] || TIPS.sehat;
        let tipsHtml = '';
        tipsList.forEach(function (tip) { tipsHtml += '<li>' + tip + '</li>'; });

        const deskripsi = screening.deskripsi || getDeskripsiByStatus(screening.status, 'gabungan');

        html += `
            <div class="result-header">
                <div class="result-status-icon">${screening.statusIcon}</div>
                <div class="result-status-badge ${screening.status}">${screening.statusLabel}</div>
            </div>
            <div class="result-deskripsi">${deskripsi}</div>
            <div class="result-tips">
                <h3>💙 Kiat untuk Anda:</h3>
                <ul>${tipsHtml}</ul>
            </div>
        `;

        // Tambahkan split view
        if (sbj && obj) {
            html += renderSplitView(sbj, obj);
        }

        html += `<p style="font-size:0.8rem;color:#a0aec0;margin-top:8px;">* Hasil ini bersifat indikasi awal dan bukan diagnosis medis. Tetap konsultasikan kondisi Anda ke tenaga kesehatan profesional.</p>`;
    } else if (type === 'sbj' && sbj) {
        html = renderSingleResult(sbj, 'subjektif', 'objektif');
    } else if (type === 'obj' && obj) {
        html = renderSingleResult(obj, 'objektif', 'subjektif');
    } else {
        return;
    }

    resultPage.innerHTML = html;
    showPage('result');
}

/**
 * Render hasil tunggal (subjektif atau objektif saja).
 * @param {Object} data - Data hasil parsial
 * @param {string} type - 'subjektif' atau 'objektif'
 * @param {string} missingType - tipe yang belum diisi
 * @returns {string} HTML string
 */
function renderSingleResult(data, type, missingType) {
    const typeLabel = type === 'subjektif' ? 'Kuesioner Gejala' : 'Pemeriksaan Laboratorium';
    const missingLabel = missingType === 'subjektif' ? 'kuesioner subjektif' : 'data checkup medis';
    const navigatePage = missingType === 'subjektif' ? 'questionnaire' : 'objective';
    const navigateFn = missingType === 'subjektif' ? 'startQuestionnaire' : 'renderObjectiveForm';

    // Rekap data detail
    let detailHtml = '';
    if (type === 'objektif') {
        const od = state.objectiveData || {};
        detailHtml = `
            <div class="result-obj-detail">
                <p style="font-size:0.9rem;font-weight:600;color:#0a5c8a;margin-bottom:8px;">Detail Pemeriksaan:</p>
                ${od.obj_systolic_bp ? '<p>• Tekanan Darah: ' + od.obj_systolic_bp + '/' + (od.obj_diastolic_bp || '-') + ' mmHg</p>' : ''}
                ${od.obj_urine_protein ? '<p>• Protein Urine: ' + od.obj_urine_protein + '</p>' : ''}
                ${od.obj_urine_glucose ? '<p>• Glukosa Urine: ' + od.obj_urine_glucose + '</p>' : ''}
                ${od.obj_blood_glucose ? '<p>• Gula Darah: ' + od.obj_blood_glucose + ' mg/dL</p>' : ''}
                ${od.obj_cholesterol ? '<p>• Kolesterol: ' + od.obj_cholesterol + ' mg/dL</p>' : ''}
                ${od.obj_hemoglobin ? '<p>• Hemoglobin: ' + od.obj_hemoglobin + ' g/dL</p>' : ''}
            </div>
        `;
    }

    return `
        <div class="result-single">
            <div class="result-header">
                <div class="result-status-icon">${data.statusIcon}</div>
                <div class="result-status-badge ${data.status}">${data.statusLabel || data.status}</div>
            </div>
            <div class="result-deskripsi">${data.deskripsi}</div>
            ${detailHtml}
            <div class="result-incomplete">
                <div class="incomplete-banner">⚠️ Data Belum Lengkap</div>
                <p>Lengkapi dengan ${missingLabel} untuk hasil yang lebih akurat.</p>
                <button class="btn btn-primary" onclick="window.${navigateFn} && window.${navigateFn}()" type="button">
                    ${missingType === 'subjektif' ? 'Isi Kuesioner' : 'Isi Data Checkup Medis'}
                </button>
            </div>
        </div>
    `;
}

/**
 * Render split view (subjektif & objektif berdampingan).
 * @param {Object} sbj - Data hasil subjektif
 * @param {Object} obj - Data hasil objektif
 * @returns {string} HTML string
 */
function renderSplitView(sbj, obj) {
    return `
        <div class="result-split">
            <h3 style="text-align:center;color:#0a5c8a;margin:20px 0 12px;">Rincian Pemeriksaan</h3>
            <div class="split-container">
                <div class="split-card">
                    <div class="split-header">
                        <span>📝 Subjektif</span>
                        <span class="split-badge status-${sbj.status}">${sbj.status}</span>
                    </div>
                    <div class="split-score">${sbj.statusLabel || sbj.status}</div>
                    <div class="split-icon">${sbj.statusIcon}</div>
                    <button class="btn btn-secondary btn-sm" onclick="showResultPartial('sbj')" type="button">Detail</button>
                </div>
                <div class="split-card">
                    <div class="split-header">
                        <span>🔬 Checkup Medis</span>
                        <span class="split-badge status-${obj.status}">${obj.statusLabel || obj.status}</span>
                    </div>
                    <div class="split-score">${obj.statusLabel || obj.status}</div>
                    <div class="split-icon">${obj.statusIcon}</div>
                    <button class="btn btn-secondary btn-sm" onclick="showResultPartial('obj')" type="button">Detail</button>
                </div>
            </div>
        </div>
    `;
}

// ===== MENAMPILKAN MODAL KONFIRMASI =====
function showConfirmationModal() {
    let summaryHtml = '';
    QUESTIONS.forEach((q, idx) => {
        const answerValue = state.answers[q.code];
        const answerLabel = answerValue !== undefined
            ? q.options.find(o => o.value === answerValue).label
            : '<em style="color:#e53e3e;">Belum dijawab</em>';
        summaryHtml += `
            <div class="modal-summary-item">
                <span class="q-num">${idx + 1}.</span>
                <span class="q-text">${q.question}</span>
                <span class="q-timeframe">Periode: ${q.timeFrame}</span>
                <span class="q-answer">${answerLabel}</span>
            </div>
        `;
    });

    modalSummary.innerHTML = summaryHtml;

    // Update tombol "Isi Data Checkup Medis" berdasarkan data yang sudah ada
    const btnToObj = document.getElementById('btnModalToObj');
    if (btnToObj) {
        const hasObjData = state.objectiveData && (
            state.objectiveData.obj_systolic_bp ||
            state.objectiveData.obj_blood_glucose ||
            state.objectiveData.obj_cholesterol ||
            state.objectiveData.obj_hemoglobin
        );
        btnToObj.innerHTML = hasObjData
            ? '<i class="fa-solid fa-pen"></i> Update Data Checkup Medis →'
            : 'Isi Data Checkup Medis →';
    }

    // Tampilkan modal
    modalOverlay.classList.add('active');

    // Fokus ke tombol konfirmasi
    setTimeout(() => btnModalConfirm.focus(), 200);

    // Cegah scroll di belakang modal
    document.body.style.overflow = 'hidden';
}

// ===== KONFIRMASI MODAL: KE FORM CHECKUP MEDIS =====
const btnModalToObj = document.getElementById('btnModalToObj');
if (btnModalToObj) {
    btnModalToObj.addEventListener('click', function () {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        renderObjectiveForm();
    });
}

// ===== KONFIRMASI MODAL: LANGSUNG LIHAT HASIL =====
btnModalConfirm.addEventListener('click', function () {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    showResultFinal();
});

// ===== KONFIRMASI MODAL: KEMBALI =====
btnModalBack.addEventListener('click', function () {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    // Fokus ke tombol navigasi
    setTimeout(() => {
        const btnNext = $('btnNext');
        if (btnNext) btnNext.focus();
    }, 200);
});

// Tutup modal dengan tombol Escape
modalOverlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            const btnNext = $('btnNext');
            if (btnNext) btnNext.focus();
        }, 200);
    }
});

// ===== FORM DATA OBJEKTIF =====
async function renderObjectiveForm() {
    const gender = currentUser ? currentUser.jenisKelamin : '';

    // Load data objektif dari Supabase jika state belum ada (untuk edit/update)
    if (!state.objectiveData && currentUser && currentUser.id) {
        try {
            const { data: existing } = await supabaseClient
                .from('screening_data')
                .select('obj_systolic_bp, obj_diastolic_bp, obj_urine_protein, obj_urine_glucose, obj_blood_glucose, obj_cholesterol, obj_hemoglobin, obj_measurement_date')
                .eq('user_id', currentUser.id)
                .order('screening_date', { ascending: false })
                .limit(1)
                .maybeSingle();
            if (existing && (existing.obj_systolic_bp || existing.obj_blood_glucose || existing.obj_cholesterol || existing.obj_hemoglobin)) {
                state.objectiveData = existing;
                console.log('[renderObjectiveForm] Load data dari Supabase untuk edit');
            }
        } catch (e) {
            console.warn('[renderObjectiveForm] Gagal load data:', e);
        }
    }

    const saved = state.objectiveData || {};

    objectiveContainer.innerHTML = `
        <div class="objective-header">
            <h2><i class="fa-solid fa-flask"></i> Data Hasil Checkup Medis</h2>
            <p>Masukkan hasil pemeriksaan dari Puskesmas/Klinik (opsional)</p>
        </div>

        <div class="obj-section">
            <div class="obj-section-title"><i class="fa-solid fa-heart-pulse"></i> ❤️ Tekanan Darah (mmHg)</div>
            <div class="obj-row">
                <div class="obj-field">
                    <label for="objSystolic">Sistolik</label>
                    <input type="number" id="objSystolic" class="form-input" placeholder="120" min="50" max="250" value="${saved.obj_systolic_bp || ''}">
                </div>
                <div class="obj-field">
                    <label for="objDiastolic">Diastolik</label>
                    <input type="number" id="objDiastolic" class="form-input" placeholder="80" min="30" max="150" value="${saved.obj_diastolic_bp || ''}">
                </div>
            </div>
            <div class="obj-normal">Normal: &lt;120/80 mmHg</div>
        </div>

        <div class="obj-section">
            <div class="obj-section-title"><i class="fa-solid fa-vial"></i> 🧪 Urine Dipstick</div>
            <div class="obj-row">
                <div class="obj-field">
                    <label for="objProtein">Protein Urine</label>
                    <select id="objProtein" class="form-input form-select">
                        <option value="Negatif" ${saved.obj_urine_protein === 'Negatif' ? 'selected' : ''}>Negatif</option>
                        <option value="+1" ${saved.obj_urine_protein === '+1' ? 'selected' : ''}>+1</option>
                        <option value="+2" ${saved.obj_urine_protein === '+2' ? 'selected' : ''}>+2</option>
                        <option value="+3" ${saved.obj_urine_protein === '+3' ? 'selected' : ''}>+3</option>
                    </select>
                </div>
                <div class="obj-field">
                    <label for="objGlucose">Glukosa Urine</label>
                    <select id="objGlucose" class="form-input form-select">
                        <option value="Negatif" ${saved.obj_urine_glucose === 'Negatif' ? 'selected' : ''}>Negatif</option>
                        <option value="+1" ${saved.obj_urine_glucose === '+1' ? 'selected' : ''}>+1</option>
                        <option value="+2" ${saved.obj_urine_glucose === '+2' ? 'selected' : ''}>+2</option>
                        <option value="+3" ${saved.obj_urine_glucose === '+3' ? 'selected' : ''}>+3</option>
                    </select>
                </div>
            </div>
            <div class="obj-normal">Normal: Negatif untuk keduanya</div>
        </div>

        <div class="obj-section">
            <div class="obj-section-title"><i class="fa-solid fa-droplet"></i> 🩸 Gula Darah (mg/dL)</div>
            <div class="obj-field">
                <label for="objGlucoseBlood">Gula Darah</label>
                <input type="number" id="objGlucoseBlood" class="form-input" placeholder="100" min="50" max="500" value="${saved.obj_blood_glucose || ''}">
            </div>
            <div class="obj-normal">Normal puasa: &lt;100 | Sewaktu: &lt;140 mg/dL</div>
        </div>

        <div class="obj-section">
            <div class="obj-section-title"><i class="fa-solid fa-database"></i> 🧈 Kolesterol Total (mg/dL)</div>
            <div class="obj-field">
                <label for="objCholesterol">Kolesterol</label>
                <input type="number" id="objCholesterol" class="form-input" placeholder="200" min="50" max="500" value="${saved.obj_cholesterol || ''}">
            </div>
            <div class="obj-normal">Normal: &lt;200 mg/dL</div>
        </div>

        <div class="obj-section">
            <div class="obj-section-title"><i class="fa-solid fa-syringe"></i> 💉 Hemoglobin (g/dL)${gender ? ' — ' + gender : ''}</div>
            <div class="obj-field">
                <label for="objHemoglobin">Hemoglobin</label>
                <input type="number" id="objHemoglobin" class="form-input" placeholder="${gender === 'Laki-laki' ? '13' : '12'}" min="3" max="20" step="0.1" value="${saved.obj_hemoglobin || ''}">
            </div>
            <div class="obj-normal">Normal: ${gender === 'Laki-laki' ? 'Pria ≥13' : gender === 'Perempuan' ? 'Wanita ≥12' : 'Pria ≥13 / Wanita ≥12'} g/dL</div>
        </div>

        <div class="obj-section">
            <div class="obj-section-title"><i class="fa-solid fa-calendar"></i> 📅 Tanggal Pemeriksaan</div>
            <div class="obj-field">
                <label for="objDate">Tanggal</label>
                <input type="date" id="objDate" class="form-input" value="${saved.obj_measurement_date || new Date().toISOString().split('T')[0]}">
            </div>
        </div>

        <div class="obj-actions">
            <button class="btn btn-secondary" id="btnSkipObjective" type="button">
                <i class="fa-solid fa-house"></i> Beranda
            </button>
            <button class="btn btn-primary" id="btnSaveObjective" type="button">
                Simpan Data
            </button>
        </div>
    `;

    showPage('objective');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Tombol 'Beranda' — kembali ke dashboard tanpa simpan
    $('btnSkipObjective').addEventListener('click', function () {
        showPage('dashboard');
    });

    $('btnSaveObjective').addEventListener('click', function () {
        state.objectiveData = {
            obj_systolic_bp: $('objSystolic').value ? parseInt($('objSystolic').value) : null,
            obj_diastolic_bp: $('objDiastolic').value ? parseInt($('objDiastolic').value) : null,
            obj_urine_protein: $('objProtein').value,
            obj_urine_glucose: $('objGlucose').value,
            obj_blood_glucose: $('objGlucoseBlood').value ? parseInt($('objGlucoseBlood').value) : null,
            obj_cholesterol: $('objCholesterol').value ? parseInt($('objCholesterol').value) : null,
            obj_hemoglobin: $('objHemoglobin').value ? parseFloat($('objHemoglobin').value) : null,
            obj_measurement_date: $('objDate').value || null
        };
        showResultFinal();
    });
}

// ===== TAMPILKAN HASIL FINAL (Subjektif + Objektif) =====
async function showResultFinal() {
    const skorSubjektif = hitungSkor();
    const gender = currentUser ? currentUser.jenisKelamin : '';

    // FIX: Jika user skip form objektif (state.objectiveData = null),
    // ambil data objektif yang sudah ada di Supabase agar tidak hilang
    let objectiveData = state.objectiveData;
    if (!objectiveData && currentUser && currentUser.id) {
        try {
            const { data: existing } = await supabaseClient
                .from('screening_data')
                .select('obj_systolic_bp, obj_diastolic_bp, obj_urine_protein, obj_urine_glucose, obj_blood_glucose, obj_cholesterol, obj_hemoglobin, obj_measurement_date')
                .eq('user_id', currentUser.id)
                .order('screening_date', { ascending: false })
                .limit(1)
                .maybeSingle();
            if (existing && (existing.obj_systolic_bp || existing.obj_blood_glucose || existing.obj_cholesterol || existing.obj_hemoglobin)) {
                objectiveData = existing;
                console.log('[showResultFinal] Menggunakan data objektif dari Supabase (user skip form)');
            }
        } catch (e) {
            console.warn('[showResultFinal] Gagal ambil data objektif:', e);
        }
    }

    const skorObjektif = objectiveData ? hitungSkorObjektif(objectiveData, gender) : 0;
    const skorTotal = skorSubjektif + skorObjektif;
    const status = tentukanStatus(skorTotal);
    const tipsList = TIPS[status.key] || TIPS.sehat;

    console.log('[showResultFinal] skorSbj:', skorSubjektif, 'skorObj:', skorObjektif, 'total:', skorTotal, 'status:', status.key);
    console.log('[showResultFinal] objectiveData:', state.objectiveData);
    console.log('[showResultFinal] currentUser:', currentUser ? currentUser.id : 'NULL');

    const saved = await saveScreeningResult({
        answers: state.answers,
        objectiveData: objectiveData,
        totalScore: skorTotal,
        skorSubjektif: skorSubjektif,
        skorObjektif: skorObjektif,
        status: status.key,
        statusLabel: status.label,
        statusIcon: status.icon
    });

    console.log('[showResultFinal] saved:', saved);

    const deskripsi = (saved && saved.hasil && saved.hasil.deskripsi)
        ? saved.hasil.deskripsi : 'Tidak ada deskripsi tersedia.';

    let tipsHtml = '';
    // Gunakan status dari hasil yang tersimpan (sumber kebenaran), fallback ke status lokal
    const finalStatus = (saved && saved.hasil) ? saved.hasil : status;
    const finalIcon = finalStatus.statusIcon || status.icon;
    const finalLabel = finalStatus.statusLabel || status.label;
    const finalColor = finalStatus.status || status.color;
    const finalDeskripsi = finalStatus.deskripsi || deskripsi;

    resultPage.innerHTML = `
        <div class="result-status-icon">${finalIcon}</div>
        <div class="result-status-badge ${finalColor}">${finalLabel}</div>
        <div class="result-deskripsi">${finalDeskripsi}</div>
        <div class="result-tips">
            <h3>💙 Kiat untuk Anda:</h3>
            <ul>${tipsHtml}</ul>
        </div>
        <p style="font-size:0.8rem;color:#a0aec0;margin-top:8px;">
            * Hasil ini bersifat indikasi awal dan bukan diagnosis medis.
            Tetap konsultasikan kondisi Anda ke tenaga kesehatan profesional.
        </p>
    `;

    showPage('result');
}

// ===== MENAMPILKAN HASIL DARI DATA TERSIMPAN =====
function showResultFromData(screening) {
    // Deteksi partial data — gunakan showResultPartial jika ada data parsial
    const hasSbj = screening.hasilSbj && screening.hasilSbj !== null;
    const hasObj = screening.hasilObj && screening.hasilObj !== null;

    if (hasSbj && !hasObj) {
        // Hanya subjektif — tampilkan hasil parsial subjektif
        state.answers = screening.answers;
        showResultPartial('sbj');
        return;
    } else if (!hasSbj && hasObj) {
        // Hanya objektif — tampilkan hasil parsial objektif
        state.objectiveData = screening.objectiveData;
        showResultPartial('obj');
        return;
    }

    // Keduanya ada atau full — tampilkan gabungan
    const tipsList = TIPS[screening.status] || TIPS.sehat;
    let tipsHtml = '';
    tipsList.forEach(function (tip) { tipsHtml += '<li>' + tip + '</li>'; });
    const deskripsi = screening.deskripsi || 'Tidak ada deskripsi tersedia.';

    // Gunakan status dari hasil yang tersimpan (sumber kebenaran)
    const finalIcon = screening.statusIcon || '✅';
    const finalLabel = screening.statusLabel || screening.status || 'Sehat';
    const finalColor = screening.status || 'sehat';

    resultPage.innerHTML = `
        <div class="result-status-icon">${finalIcon}</div>
        <div class="result-status-badge ${finalColor}">${finalLabel}</div>
        <div class="result-deskripsi">${deskripsi}</div>
        <div class="result-tips">
            <h3>💙 Kiat untuk Anda:</h3>
            <ul>${tipsHtml}</ul>
        </div>
        ${hasSbj && hasObj ? renderSplitView(screening.hasilSbj, screening.hasilObj) : ''}
        <p style="font-size:0.8rem;color:#a0aec0;margin-top:8px;">
            * Hasil ini bersifat indikasi awal dan bukan diagnosis medis.
            Tetap konsultasikan kondisi Anda ke tenaga kesehatan profesional.
        </p>
    `;
    showPage('result');
}

// ===== KEMBALI KE DASHBOARD =====
function restartApp() {
    // Reset state
    state.currentQuestion = 0;
    state.answers = {};
    state.objectiveData = null;

    // Reset progress
    progressFill.style.width = '0%';
    progressText.textContent = 'Pertanyaan 1 dari 10';
    progressPercent.textContent = '0%';
    progressBarEl.setAttribute('aria-valuenow', 0);

    // Reset konten hasil
    resultPage.innerHTML = '';

    // Kembali ke dashboard
    showPage('dashboard');

    // Fokus
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
}

// ===== FUNGSI NOTIFIKASI =====
function showNotif(type, title, message) {
    notifModalTitle.textContent = title;
    notifModalText.textContent = message;
    if (type === 'error') {
        notifModalIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        notifModalIcon.className = 'notif-modal-icon notif-error';
    } else if (type === 'success') {
        notifModalIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        notifModalIcon.className = 'notif-modal-icon notif-success';
    } else {
        notifModalIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
        notifModalIcon.className = 'notif-modal-icon notif-warning';
    }
    notifModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => btnNotifClose.focus(), 200);
}

btnNotifClose.addEventListener('click', function () {
    notifModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

notifModalOverlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        notifModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== FUNGSI LOGIN (Supabase Auth) =====
async function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        showNotif('error', 'Login Gagal', 'Masukkan username dan password!');
        return;
    }

    var btnLogin = document.getElementById('btnLogin');
    var originalHTML = btnLogin.innerHTML;
    btnLogin.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
    btnLogin.disabled = true;

    try {
        // Cari email berdasarkan username di tabel users
        const { data: userProfile, error: lookupError } = await supabaseClient
            .from('users')
            .select('*')
            .eq('user_name', username)
            .maybeSingle();

        if (lookupError || !userProfile) {
            showNotif('error', 'Login Gagal', 'Username tidak ditemukan!');
            btnLogin.innerHTML = originalHTML;
            btnLogin.disabled = false;
            return;
        }

        // Login ke Supabase Auth menggunakan email dummy dari username
        // Tabel users tidak punya kolom email, jadi generate dari username
        const authEmail = usernameToEmail(username);
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: authEmail,
            password: password
        });

        if (error) {
            showNotif('error', 'Login Gagal', 'Password salah!');
            btnLogin.innerHTML = originalHTML;
            btnLogin.disabled = false;
            return;
        }

        // Simpan data user ke state
        currentUser = {
            id: data.user.id,
            username: userProfile.user_name,
            email: authEmail,
            namaLengkap: userProfile.nama_lengkap,
            tanggalLahir: userProfile.tanggal_lahir,
            jenisKelamin: userProfile.jenis_kelamin,
            role: userProfile.role
        };

        isLoggedIn = true;
        btnLogin.innerHTML = originalHTML;
        btnLogin.disabled = false;

        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';

        showPage('dashboard');
    } catch (e) {
        console.error('Login error:', e);
        showNotif('error', 'Kesalahan', 'Terjadi kesalahan saat login. Periksa koneksi internet Anda.');
        btnLogin.innerHTML = originalHTML;
        btnLogin.disabled = false;
    }
}

// ===== FUNGSI REGISTER (Supabase Auth + users table) =====
async function register() {
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const namaLengkap = document.getElementById('regNama').value.trim();
    const jenisKelamin = document.getElementById('regGender').value;
    const tglLahir = document.getElementById('regTglLahir').value;

    // Validasi
    if (!username || !password || !namaLengkap) {
        showNotif('error', 'Registrasi Gagal', 'Semua kolom bertanda * wajib diisi!');
        return;
    }
    if (username.length < 3) {
        showNotif('error', 'Registrasi Gagal', 'Username minimal 3 karakter!');
        return;
    }
    if (password.length < 6) {
        showNotif('error', 'Registrasi Gagal', 'Password minimal 6 karakter!');
        return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        showNotif('error', 'Registrasi Gagal', 'Username hanya boleh huruf, angka, dan underscore!');
        return;
    }

    var btnRegister = document.getElementById('btnRegister');
    var originalHTML = btnRegister.innerHTML;
    btnRegister.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mendaftarkan...';
    btnRegister.disabled = true;

    try {
        // Cek unique username
        const { data: existingUser } = await supabaseClient
            .from('users')
            .select('id')
            .eq('user_name', username)
            .maybeSingle();

        if (existingUser) {
            showNotif('error', 'Registrasi Gagal', 'Username sudah digunakan! Pilih username lain.');
            btnRegister.innerHTML = originalHTML;
            btnRegister.disabled = false;
            return;
        }

        // Daftar ke Supabase Auth menggunakan email dummy dari username
        // (konsisten dengan login yang menggunakan usernameToEmail)
        const authEmail = usernameToEmail(username);
        const { data: authData, error: authError } = await supabaseClient.auth.signUp({
            email: authEmail,
            password: password
        });

        if (authError) {
            console.error('Auth signup error:', authError);
            if (authError.message.includes('already')) {
                showNotif('error', 'Registrasi Gagal', 'Username sudah terdaftar di sistem!');
            } else {
                showNotif('error', 'Registrasi Gagal', 'Gagal membuat akun. Silakan coba lagi.');
            }
            btnRegister.innerHTML = originalHTML;
            btnRegister.disabled = false;
            return;
        }

        // Simpan data profil ke tabel users
        // Kolom email tidak ada di tabel users, jadi tidak diinsert
        const { error: insertError } = await supabaseClient
            .from('users')
            .insert({
                id: authData.user.id,
                user_name: username,
                password_hash: '',
                nama_lengkap: namaLengkap,
                tanggal_lahir: tglLahir || null,
                jenis_kelamin: jenisKelamin || null,
                role: 'user',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

        if (insertError) {
            console.error('Insert profile error:', insertError);
            showNotif('error', 'Registrasi Gagal', 'Gagal menyimpan data profil. Silakan coba lagi.');
            btnRegister.innerHTML = originalHTML;
            btnRegister.disabled = false;
            return;
        }

        // Berhasil
        showNotif('success', 'Registrasi Berhasil!', 'Akun berhasil dibuat. Silakan login dengan akun Anda.');

        // Bersihkan form
        document.getElementById('regUsername').value = '';
        document.getElementById('regPassword').value = '';
        document.getElementById('regNama').value = '';
        document.getElementById('regGender').value = '';
        document.getElementById('regTglLahir').value = '';

        btnRegister.innerHTML = originalHTML;
        btnRegister.disabled = false;

        // Pindah ke halaman login
        setTimeout(() => showPage('landing'), 1500);
    } catch (e) {
        console.error('Register error:', e);
        showNotif('error', 'Kesalahan', 'Terjadi kesalahan saat registrasi. Periksa koneksi internet Anda.');
        btnRegister.innerHTML = originalHTML;
        btnRegister.disabled = false;
    }
}

// ===== FUNGSI LOGOUT =====
function logout() {
    // Tampilkan modal logout kustom
    logoutModalOverlay.classList.add('active');
    setTimeout(() => btnLogoutCancel.focus(), 200);
    document.body.style.overflow = 'hidden';
}

// ===== KONFIRMASI LOGOUT: KEMBALI =====
btnLogoutCancel.addEventListener('click', function () {
    logoutModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        var btnLogout = document.getElementById('btnLogout');
        if (btnLogout) btnLogout.focus();
    }, 200);
});

// ===== KONFIRMASI LOGOUT: PROSES KELUAR =====
btnLogoutConfirm.addEventListener('click', async function () {
    logoutModalOverlay.classList.remove('active');
    document.body.style.overflow = '';

    // Sign out dari Supabase
    await supabaseClient.auth.signOut();

    // Hapus semua data local
    clearAllData();

    isLoggedIn = false;
    currentUser = null;
    state.currentQuestion = 0;
    state.answers = {};
    progressFill.style.width = '0%';;
    progressText.textContent = 'Pertanyaan 1 dari 10';
    progressPercent.textContent = '0%';
    progressBarEl.setAttribute('aria-valuenow', 0);
    resultPage.innerHTML = '';

    // Kembali ke halaman landing
    showPage('landing');
});

// Expose fungsi ke global
window.login = login;
window.logout = logout;

// ===== INISIALISASI APLIKASI =====
document.addEventListener('DOMContentLoaded', function () {
    // Tampilkan halaman landing dulu
    showPage('landing');

    // Event listener tombol landing
    var btnLandingLogin = document.getElementById('btnLandingLogin');
    if (btnLandingLogin) {
        btnLandingLogin.addEventListener('click', function () {
            showPage('login');
        });
    }

    var btnLandingRegister = document.getElementById('btnLandingRegister');
    if (btnLandingRegister) {
        btnLandingRegister.addEventListener('click', function () {
            showPage('register');
        });
    }

    // Event listener tombol login
    var btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', login);
    }

    // Event listener tombol "Daftar"
    var btnShowRegister = document.getElementById('btnShowRegister');
    if (btnShowRegister) {
        btnShowRegister.addEventListener('click', function () {
            showPage('register');
        });
    }

    // Event listener tombol "Kembali ke Login"
    var btnBackToLogin = document.getElementById('btnBackToLogin');
    if (btnBackToLogin) {
        btnBackToLogin.addEventListener('click', function () {
            showPage('login');
        });
    }

    // Event listener tombol "Daftar Sekarang"
    var btnRegister = document.getElementById('btnRegister');
    if (btnRegister) {
        btnRegister.addEventListener('click', register);
    }

    // Password toggle — Login
    var btnToggleLoginPass = document.getElementById('btnToggleLoginPass');
    if (btnToggleLoginPass) {
        btnToggleLoginPass.addEventListener('click', function () {
            var input = document.getElementById('loginPassword');
            var icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fa-solid fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fa-solid fa-eye';
            }
        });
    }

    // Password toggle — Register
    var btnToggleRegPass = document.getElementById('btnToggleRegPass');
    if (btnToggleRegPass) {
        btnToggleRegPass.addEventListener('click', function () {
            var input = document.getElementById('regPassword');
            var icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fa-solid fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fa-solid fa-eye';
            }
        });
    }

    // Enter key on login fields
    var loginPass = document.getElementById('loginPassword');
    if (loginPass) {
        loginPass.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') login();
        });
    }

    // Enter key on register button
    var regPass = document.getElementById('regPassword');
    if (regPass) {
        regPass.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') register();
        });
    }

    // Event listener bottom navigation
    var bottomTabs = document.querySelectorAll('.bottom-nav-tab');
    bottomTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var page = this.dataset.page;
            bottomTabs.forEach(function (t) { t.classList.remove('active'); });
            this.classList.add('active');
            showPage(page);
        });
    });

    // Event listener tombol link ke Tips
    var btnTipsLink = document.getElementById('btnTipsLink');
    if (btnTipsLink) {
        btnTipsLink.addEventListener('click', function () {
            showPage('tips');
        });
    }

    // Tutup logout modal dengan Escape
    logoutModalOverlay.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            logoutModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(function () {
                var btnLogout = document.getElementById('btnLogout');
                if (btnLogout) btnLogout.focus();
            }, 200);
        }
    });
});
