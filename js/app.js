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
    currentPage: 'login',   // 'login' | 'dashboard' | 'questionnaire' | 'result' | 'profile'
    currentQuestion: 0,     // indeks pertanyaan saat ini (0-9)
    answers: {}             // Objek: { 'subj_foamy_urine': 0, 'subj_pruritus': 1, ... }
};

// ===== REFERENSI DOM =====
const $ = (id) => document.getElementById(id);
const loginPage      = $('page-login');
const profilePage    = $('page-profile');
const homePage       = $('page-home');
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

// ===== FUNGSI NAVIGASI HALAMAN =====
function showPage(pageName) {
    // Sembunyikan semua halaman
    landingPage.classList.remove('active');
    loginPage.classList.remove('active');
    registerPage.classList.remove('active');
    homePage.classList.remove('active');
    dashboardPage.classList.remove('active');
    profilePage.classList.remove('active');
    questionnairePage.classList.remove('active');
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
        // Dashboard tidak perlu tombol footer — navigasi via tab
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
    clearPartialQuestionnaire();
    showPage('questionnaire');
    renderQuestion();
}

// ===== MELANJUTKAN KUESIONER (dari partial save) =====
async function resumeQuestionnaire() {
    var partial = getPartialQuestionnaire();
    if (partial && partial.answers) {
        state.currentQuestion = partial.currentQuestion || 0;
        state.answers = partial.answers;
    } else {
        state.currentQuestion = 0;
        state.answers = {};
    }
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

    // Simpan progress parsial ke localStorage
    savePartialQuestionnaire({
        currentQuestion: state.currentQuestion,
        answers: state.answers
    });

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
    if (skor <= 5) {
        return {
            key: 'sehat',
            label: 'Sehat',
            icon: '<i class="fa-solid fa-circle-check"></i>',
            color: 'sehat'
        };
    } else if (skor <= 10) {
        return {
            key: 'waspada',
            label: 'Waspada',
            icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
            color: 'waspada'
        };
    } else if (skor <= 15) {
        return {
            key: 'risiko_tinggi',
            label: 'Risiko Tinggi',
            icon: '<i class="fa-solid fa-circle-exclamation"></i>',
            color: 'risiko_tinggi'
        };
    } else {
        return {
            key: 'gawat_darurat',
            label: 'Gawat Darurat',
            icon: '<i class="fa-solid fa-skull-crossbones"></i>',
            color: 'gawat_darurat'
        };
    }
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

    // Tampilkan modal
    modalOverlay.classList.add('active');

    // Fokus ke tombol konfirmasi
    setTimeout(() => btnModalConfirm.focus(), 200);

    // Cegah scroll di belakang modal
    document.body.style.overflow = 'hidden';
}

// ===== KONFIRMASI MODAL: TAMPILKAN HASIL =====
btnModalConfirm.addEventListener('click', function () {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    showResult();
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

// ===== MENAMPILKAN HALAMAN HASIL (dari state saat ini) =====
async function showResult() {
    const skor = hitungSkor();
    const status = tentukanStatus(skor);
    const tipsList = TIPS[status.key] || TIPS.sehat;

    // Simpan ke Supabase
    await saveScreeningResult({
        answers: state.answers,
        totalScore: skor,
        status: status.key,
        statusLabel: status.label,
        statusIcon: status.icon
    });

    // Hapus partial questionnaire
    clearPartialQuestionnaire();

    // Bangun HTML tips
    let tipsHtml = '';
    tipsList.forEach((tip) => {
        tipsHtml += `<li>${tip}</li>`;
    });

    resultPage.innerHTML = `
        <div class="result-status-icon">${status.icon}</div>
        <div class="result-status-badge ${status.color}">${status.label}</div>
        <div class="result-score">
            Skor Anda: <strong>${skor}</strong> dari maksimal 20
        </div>
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
    const tipsList = TIPS[screening.status] || TIPS.sehat;

    let tipsHtml = '';
    tipsList.forEach(function (tip) {
        tipsHtml += '<li>' + tip + '</li>';
    });

    resultPage.innerHTML = `
        <div class="result-status-icon">${screening.statusIcon}</div>
        <div class="result-status-badge ${screening.status}">${screening.statusLabel}</div>
        <div class="result-score">
            Skor Anda: <strong>${screening.totalScore}</strong> dari maksimal 20
        </div>
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

// ===== KEMBALI KE DASHBOARD =====
function restartApp() {
    // Reset state
    state.currentQuestion = 0;
    state.answers = {};

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
    clearPartialQuestionnaire();

    // Reset state
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
