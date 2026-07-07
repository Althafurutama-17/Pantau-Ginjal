/**
 * =========================================
 *  APLIKASI SKRINING KESEHATAN GINJAL
 *  File: js/app.js
 *  Deskripsi: Semua logika JavaScript aplikasi
 *  Single Page Application — Client-side
 * =========================================
 */

// ===== DATA PERTANYAAN =====
// Array berisi 10 pertanyaan dengan opsi jawaban berskala
const QUESTIONS = [
    {
        id: 1,
        text: "Seberapa sering Anda merasa mudah lelah tanpa sebab yang jelas?",
        options: [
            { label: "Tidak Pernah", value: 0 },
            { label: "Kadang-kadang", value: 1 },
            { label: "Sering", value: 2 },
            { label: "Sangat Sering", value: 3 }
        ]
    },
    {
        id: 2,
        text: "Seberapa sering Anda mengalami pembengkakan di kaki atau pergelangan kaki?",
        options: [
            { label: "Tidak Pernah", value: 0 },
            { label: "Kadang-kadang", value: 1 },
            { label: "Sering", value: 2 },
            { label: "Sangat Sering", value: 3 }
        ]
    },
    {
        id: 3,
        text: "Seberapa sering urine (air kencing) Anda berbusa atau tampak berbuih?",
        options: [
            { label: "Tidak Pernah", value: 0 },
            { label: "Kadang-kadang", value: 1 },
            { label: "Sering", value: 2 },
            { label: "Sangat Sering", value: 3 }
        ]
    },
    {
        id: 4,
        text: "Seberapa sering Anda buang air kecil di malam hari (lebih dari 2 kali)?",
        options: [
            { label: "Tidak Pernah", value: 0 },
            { label: "Kadang-kadang", value: 1 },
            { label: "Sering", value: 2 },
            { label: "Sangat Sering", value: 3 }
        ]
    },
    {
        id: 5,
        text: "Seberapa sering Anda merasakan nyeri atau pegal di bagian pinggang belakang?",
        options: [
            { label: "Tidak Pernah", value: 0 },
            { label: "Kadang-kadang", value: 1 },
            { label: "Sering", value: 2 },
            { label: "Sangat Sering", value: 3 }
        ]
    },
    {
        id: 6,
        text: "Seberapa sering Anda mengalami penurunan nafsu makan?",
        options: [
            { label: "Tidak Pernah", value: 0 },
            { label: "Kadang-kadang", value: 1 },
            { label: "Sering", value: 2 },
            { label: "Sangat Sering", value: 3 }
        ]
    },
    {
        id: 7,
        text: "Seberapa sering Anda merasa gatal-gatal pada kulit tanpa sebab yang jelas?",
        options: [
            { label: "Tidak Pernah", value: 0 },
            { label: "Kadang-kadang", value: 1 },
            { label: "Sering", value: 2 },
            { label: "Sangat Sering", value: 3 }
        ]
    },
    {
        id: 8,
        text: "Seberapa sering Anda mengalami sesak napas setelah melakukan aktivitas ringan?",
        options: [
            { label: "Tidak Pernah", value: 0 },
            { label: "Kadang-kadang", value: 1 },
            { label: "Sering", value: 2 },
            { label: "Sangat Sering", value: 3 }
        ]
    },
    {
        id: 9,
        text: "Seberapa sering Anda merasa mual atau ingin muntah?",
        options: [
            { label: "Tidak Pernah", value: 0 },
            { label: "Kadang-kadang", value: 1 },
            { label: "Sering", value: 2 },
            { label: "Sangat Sering", value: 3 }
        ]
    },
    {
        id: 10,
        text: "Apakah Anda memiliki riwayat tekanan darah tinggi (hipertensi)?",
        options: [
            { label: "Tidak Pernah", value: 0 },
            { label: "Kadang-kadang", value: 1 },
            { label: "Sering", value: 2 },
            { label: "Sangat Sering", value: 3 }
        ]
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
    ]
};

// ===== STATE APLIKASI =====
let isLoggedIn = false;  // Status login (false = belum login)

const state = {
    currentPage: 'login',   // 'login' | 'dashboard' | 'questionnaire' | 'result' | 'profile'
    currentQuestion: 0,     // indeks pertanyaan saat ini (0-9)
    answers: new Array(10).fill(null)  // menyimpan nilai jawaban tiap pertanyaan
};

// ===== REFERENSI DOM =====
const $ = (id) => document.getElementById(id);
const loginPage      = $('page-login');
const profilePage    = $('page-profile');
const homePage       = $('page-home');
const dashboardPage  = $('page-dashboard');
const questionnairePage = $('page-questionnaire');
const resultPage     = $('page-result');
const dashboardNav   = $('dashboardNav');
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

// ===== FUNGSI NAVIGASI HALAMAN =====
function showPage(pageName) {
    // Sembunyikan semua halaman
    loginPage.classList.remove('active');
    homePage.classList.remove('active');
    dashboardPage.classList.remove('active');
    profilePage.classList.remove('active');
    questionnairePage.classList.remove('active');
    resultPage.classList.remove('active');

    // Atur visibilitas navigasi dashboard
    if (pageName === 'login') {
        loginPage.classList.add('active');
        progressSection.classList.remove('visible');
        dashboardNav.style.display = 'none';
    } else if (pageName === 'dashboard') {
        dashboardPage.classList.add('active');
        progressSection.classList.remove('visible');
        dashboardNav.style.display = 'flex';
        // Aktifkan tab Dashboard
        DashboardManager.activateDashboardTab();
        // Inisialisasi dashboard
        DashboardManager.init();
    } else if (pageName === 'profile') {
        profilePage.classList.add('active');
        progressSection.classList.remove('visible');
        dashboardNav.style.display = 'flex';
        // Aktifkan tab Profil
        DashboardManager.activateProfileTab();
        // Render profil
        DashboardManager.renderProfile();
    } else if (pageName === 'questionnaire') {
        questionnairePage.classList.add('active');
        progressSection.classList.add('visible');
        dashboardNav.style.display = 'none';
    } else if (pageName === 'result') {
        resultPage.classList.add('active');
        progressSection.classList.remove('visible');
        dashboardNav.style.display = 'none';
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
        const hasAnswer = state.answers[state.currentQuestion] !== null;

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
    state.answers = new Array(10).fill(null);
    clearPartialQuestionnaire();
    showPage('questionnaire');
    renderQuestion();
}

// ===== MELANJUTKAN KUESIONER (dari partial save) =====
function resumeQuestionnaire() {
    var partial = getPartialQuestionnaire();
    if (partial && partial.answers) {
        state.currentQuestion = partial.currentQuestion || 0;
        state.answers = partial.answers;
    } else {
        state.currentQuestion = 0;
        state.answers = new Array(10).fill(null);
    }
    showPage('questionnaire');
    renderQuestion();
}

// ===== MENAMPILKAN HASIL TERAKHIR DARI LOCALSTORAGE =====
function showLastResult() {
    var screening = getLatestScreening();
    if (screening) {
        // Muat data ke state untuk kompatibilitas
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
    const selectedValue = state.answers[idx];

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
                       data-question-index="${idx}">
                <label for="q${q.id}-opt${opt.value}">
                    <span class="radio-circle"></span>
                    <span>${opt.label}</span>
                    <span class="option-score">(${opt.value === 0 ? 'Tidak pernah' : opt.value === 1 ? 'Kadang' : opt.value === 2 ? 'Sering' : 'Sangat sering'})</span>
                </label>
            </div>
        `;
    });

    questionContainer.innerHTML = `
        <div class="question-number">Pertanyaan ${idx + 1} dari ${QUESTIONS.length}</div>
        <div class="question-text">${q.text}</div>
        <div class="options-group" role="radiogroup" aria-label="Pilihan jawaban pertanyaan ${idx + 1}">
            ${optionsHtml}
        </div>
    `;

    // Event listener untuk radio buttons
    document.querySelectorAll('input[name="q-' + q.id + '"]').forEach((radio) => {
        radio.addEventListener('change', function () {
            state.answers[parseInt(this.dataset.questionIndex)] = parseInt(this.value);
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
    const current = state.currentQuestion + 1;
    const percent = Math.round((current / total) * 100);

    progressFill.style.width = percent + '%';
    progressText.textContent = 'Pertanyaan ' + current + ' dari ' + total;
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
    // Pastikan jawaban sudah dipilih
    if (state.answers[state.currentQuestion] === null) return;

    // Simpan progress parsial ke localStorage
    savePartialQuestionnaire({
        currentQuestion: state.currentQuestion,
        answers: state.answers
    });

    const isLast = state.currentQuestion === QUESTIONS.length - 1;

    if (isLast) {
        // Tampilkan modal konfirmasi
        showConfirmationModal();
    } else {
        state.currentQuestion++;
        renderQuestion();
    }
}

// ===== FUNGSI MENGHITUNG SKOR TOTAL =====
// Menjumlahkan semua nilai jawaban pengguna
function hitungSkor() {
    return state.answers.reduce((total, val) => total + (val !== null ? val : 0), 0);
}

// ===== FUNGSI MENENTUKAN STATUS KESEHATAN =====
// Berdasarkan skor total, tentukan kategori
function tentukanStatus(skor) {
    if (skor <= 5) {
        return {
            key: 'sehat',
            label: 'Sehat / Normal',
            icon: '<i class="fa-solid fa-circle-check"></i>',
            color: 'sehat'
        };
    } else if (skor <= 12) {
        return {
            key: 'waspada',
            label: 'Waspada / Risiko Ringan',
            icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
            color: 'waspada'
        };
    } else {
        return {
            key: 'konsultasi',
            label: 'Konsultasi / Risiko Tinggi',
            icon: '<i class="fa-solid fa-circle-exclamation"></i>',
            color: 'konsultasi'
        };
    }
}

// ===== MENAMPILKAN MODAL KONFIRMASI =====
function showConfirmationModal() {
    // Bangun ringkasan jawaban
    let summaryHtml = '';
    QUESTIONS.forEach((q, idx) => {
        const answerValue = state.answers[idx];
        const answerLabel = answerValue !== null
            ? q.options.find(o => o.value === answerValue).label
            : '<em style="color:#e53e3e;">Belum dijawab</em>';
        summaryHtml += `
            <div class="modal-summary-item">
                <span class="q-num">${idx + 1}.</span>
                <span class="q-text">${q.text}</span>
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
function showResult() {
    const skor = hitungSkor();
    const status = tentukanStatus(skor);
    const tipsList = TIPS[status.key];

    // Simpan ke localStorage
    saveScreeningResult({
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
            Skor Anda: <strong>${skor}</strong> dari maksimal 30
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
            Skor Anda: <strong>${screening.totalScore}</strong> dari maksimal 30
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
    state.answers = new Array(10).fill(null);

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

// ===== FUNGSI LOGIN =====
function login() {
    isLoggedIn = true;
    showPage('dashboard');
}

// ===== FUNGSI LOGOUT =====
function logout() {
    // Tampilkan konfirmasi
    var confirmed = confirm('Apakah Anda yakin ingin keluar? Semua data skrining akan dihapus.');
    if (!confirmed) return;

    // Hapus semua data
    clearAllData();
    clearPartialQuestionnaire();

    // Reset state
    isLoggedIn = false;
    state.currentQuestion = 0;
    state.answers = new Array(10).fill(null);
    progressFill.style.width = '0%';
    progressText.textContent = 'Pertanyaan 1 dari 10';
    progressPercent.textContent = '0%';
    progressBarEl.setAttribute('aria-valuenow', 0);
    resultPage.innerHTML = '';

    // Kembali ke halaman login
    showPage('login');
}

// Expose fungsi ke global
window.login = login;
window.logout = logout;

// ===== INISIALISASI APLIKASI =====
document.addEventListener('DOMContentLoaded', function () {
    // Tampilkan halaman login dulu
    showPage('login');

    // Event listener tombol login
    var btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', login);
    }
});
