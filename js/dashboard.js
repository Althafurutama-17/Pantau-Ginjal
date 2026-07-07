/**
 * =========================================
 *  DASHBOARD MANAGER — Skrining Kesehatan Ginjal
 *  File: js/dashboard.js
 *  Deskripsi: Logika halaman dashboard,
 *  render status, kuesioner, tips edukasi
 * =========================================
 */

// ===== NAMA BULAN BAHASA INDONESIA =====
const MONTH_NAMES_ID = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Format tanggal ke format Indonesia.
 * Contoh: "07 Juli 2026, 10:30"
 * @param {string} isoString - ISO date string
 * @returns {string} Tanggal dalam format Indonesia
 */
function formatDateIndonesia(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = MONTH_NAMES_ID[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return day + ' ' + month + ' ' + year + ', ' + hours + ':' + minutes;
}

// ===== DATA TIPS EDUKASI KESEHATAN GINJAL =====
const HEALTH_TIPS = [
    {
        id: 'pengertian',
        icon: '<i class="fa-solid fa-book-medical"></i>',
        title: 'Apa itu Penyakit Ginjal?',
        content: `
            <p>Penyakit ginjal adalah kondisi ketika ginjal tidak dapat berfungsi dengan baik dalam menyaring limbah dan kelebihan cairan dari darah. Jika tidak ditangani, dapat menyebabkan penumpukan racun dalam tubuh yang berbahaya bagi kesehatan.</p>
            <p>Penyakit ginjal sering disebut sebagai <strong>"silent killer"</strong> karena pada tahap awal sering tidak menimbulkan gejala yang jelas. Banyak orang baru menyadari setelah kondisinya sudah parah.</p>
            <div class="highlight-box">
                📊 Menurut data Kementerian Kesehatan RI, sekitar 1 dari 10 orang dewasa di Indonesia berisiko mengalami gangguan ginjal. Deteksi dini sangat penting untuk mencegah kerusakan lebih lanjut.
            </div>
        `
    },
    {
        id: 'fungsi',
        icon: '<i class="fa-solid fa-gears"></i>',
        title: 'Mengapa Ginjal Penting?',
        content: `
            <div class="sub-heading">✅ Fungsi Ginjal</div>
            <ul style="list-style:none;padding:0;">
                <li style="padding:5px 0 5px 28px;position:relative;">💧 Menyaring limbah dan racun dari darah</li>
                <li style="padding:5px 0 5px 28px;position:relative;">⚖️ Mengatur keseimbangan cairan dan elektrolit</li>
                <li style="padding:5px 0 5px 28px;position:relative;">💉 Menghasilkan hormon untuk mengatur tekanan darah</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🩸 Memproduksi sel darah merah (eritropoietin)</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🧪 Menjaga keseimbangan asam-basa dalam tubuh</li>
            </ul>
            <div class="sub-heading">⚠️ Bahaya Jika Ginjal Rusak</div>
            <ul style="list-style:none;padding:0;">
                <li style="padding:5px 0 5px 28px;position:relative;">☠️ Penumpukan racun dalam darah (uremia) — bisa menyebabkan kerusakan otak</li>
                <li style="padding:5px 0 5px 28px;position:relative;">📈 Tekanan darah tinggi yang sulit dikendalikan</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🩸 Anemia (kekurangan sel darah merah) — menyebabkan lemas dan pucat</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🦴 Gangguan tulang karena ketidakseimbangan kalsium dan fosfor</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🏥 Gagal ginjal stadium akhir — membutuhkan cuci darah (dialisis) atau transplantasi ginjal</li>
            </ul>
            <div class="highlight-box warning">
                🚨 Setiap kerusakan ginjal bersifat permanen. Ginjal yang rusak tidak bisa diperbaiki. Oleh karena itu, pencegahan dan deteksi dini sangat penting!
            </div>
        `
    },
    {
        id: 'gejala',
        icon: '<i class="fa-solid fa-magnifying-glass"></i>',
        title: 'Gejala & Indikasi Awal',
        content: `
            <p>Gejala awal penyakit ginjal sering tidak disadari karena mirip dengan penyakit ringan biasa. Waspadai tanda-tanda berikut:</p>
            <ul style="list-style:none;padding:0;">
                <li style="padding:5px 0 5px 28px;position:relative;">😴 <strong>Kelelahan tanpa sebab jelas</strong> — tubuh terasa lemah meski tidak banyak beraktivitas</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🦶 <strong>Pembengkakan di kaki/pergelangan kaki</strong> — karena penumpukan cairan (edema)</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🫧 <strong>Urine berbusa atau berbuih</strong> — tanda protein dalam urine (proteinuria)</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🌙 <strong>Sering buang air kecil di malam hari</strong> — lebih dari 2 kali per malam</li>
                <li style="padding:5px 0 5px 28px;position:relative;">💢 <strong>Nyeri pinggang belakang</strong> — terutama di area ginjal (pinggang bagian atas)</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🍽️ <strong>Penurunan nafsu makan</strong> — karena penumpukan racun memengaruhi sistem pencernaan</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🖐️ <strong>Gatal-gatal pada kulit</strong> — akibat penumpukan fosfor dan limbah di darah</li>
                <li style="padding:5px 0 5px 28px;position:relative;">😮‍💨 <strong>Sesak napas setelah aktivitas ringan</strong> — karena kelebihan cairan di paru-paru</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🤢 <strong>Mual atau muntah</strong> — terutama di pagi hari, akibat penumpukan racun</li>
                <li style="padding:5px 0 5px 28px;position:relative;">🩺 <strong>Riwayat hipertensi</strong> — tekanan darah tinggi sulit terkontrol meski sudah minum obat</li>
            </ul>
            <div class="highlight-box warning">
                🩺 Jika Anda mengalami 2 atau lebih gejala di atas, segera konsultasikan ke dokter untuk pemeriksaan lebih lanjut!
            </div>
        `
    },
    {
        id: 'pencegahan',
        icon: '<i class="fa-solid fa-shield-heart"></i>',
        title: 'Pencegahan & Penanganan',
        content: `
            <div class="sub-heading">✅ 10 Cara Menjaga Kesehatan Ginjal</div>
            <ol style="padding-left:20px;margin:8px 0;">
                <li style="padding:4px 0;"><strong>Batasi konsumsi garam</strong> — maksimal 1 sendok teh (5 gram) per hari. Hindari keripik, mie instan, dan makanan olahan.</li>
                <li style="padding:4px 0;"><strong>Minum air putih 8 gelas/hari</strong> — sekitar 2 liter, kecuali ada kondisi khusus yang membatasi cairan.</li>
                <li style="padding:4px 0;"><strong>Cek tekanan darah rutin</strong> — minimal 1 bulan sekali. Hipertensi adalah penyebab utama penyakit ginjal.</li>
                <li style="padding:4px 0;"><strong>Hindari NSAID berlebihan</strong> — seperti ibuprofen, aspirin, diklofenak. Obat ini bisa merusak ginjal jika digunakan jangka panjang.</li>
                <li style="padding:4px 0;"><strong>Olahraga ringan 30 menit/hari</strong> — jalan kaki, bersepeda santai, atau berenang.</li>
                <li style="padding:4px 0;"><strong>Kurangi protein hewani berlebih</strong> — daging merah, jeroan, dan makanan tinggi protein membebani kerja ginjal.</li>
                <li style="padding:4px 0;"><strong>Perbanyak sayur dan buah segar</strong> — pilih yang rendah kalium seperti apel, anggur, kol, mentimun.</li>
                <li style="padding:4px 0;"><strong>Kontrol gula darah</strong> — jika Anda diabetes, jaga gula darah tetap stabil karena diabetes adalah penyebab utama gagal ginjal.</li>
                <li style="padding:4px 0;"><strong>Hindari alkohol & kurangi kafein</strong> — alkohol dan kafein berlebih dapat memengaruhi tekanan darah dan hidrasi.</li>
                <li style="padding:4px 0;"><strong>Jangan menahan buang air kecil</strong> — menahan kencing meningkatkan tekanan pada ginjal dan risiko infeksi saluran kemih.</li>
            </ol>
            <div class="sub-heading">🩺 Kapan Harus ke Dokter?</div>
            <ul style="list-style:none;padding:0;">
                <li style="padding:5px 0 5px 28px;position:relative;">📋 Jika hasil skrining menunjukkan <strong>skor 13-30 (Konsultasi / Risiko Tinggi)</strong></li>
                <li style="padding:5px 0 5px 28px;position:relative;">🤒 Jika Anda memiliki <strong>2 atau lebih gejala</strong> yang disebutkan di atas</li>
                <li style="padding:5px 0 5px 28px;position:relative;">👨‍👩‍👧‍👦 Jika ada <strong>riwayat keluarga</strong> dengan penyakit ginjal atau diabetes</li>
                <li style="padding:5px 0 5px 28px;position:relative;">💊 Jika Anda mengonsumsi obat-obatan tertentu dalam jangka panjang</li>
                <li style="padding:5px 0 5px 28px;position:relative;">📈 Jika tekanan darah Anda <strong>sulit terkontrol</strong> meski sudah minum obat hipertensi</li>
            </ul>
            <div class="highlight-box">
                💙 Ingatlah: Deteksi dini menyelamatkan ginjal Anda! Jangan ragu untuk memeriksakan diri ke dokter secara rutin.
            </div>
        `
    }
];

// ===== DASHBOARD MANAGER =====
const DashboardManager = {
    /**
     * Inisialisasi dashboard: render semua konten.
     * Dipanggil setiap kali halaman dashboard ditampilkan.
     */
    init: function () {
        const latestScreening = getLatestScreening();
        this.renderHealthStatus(latestScreening);
        this.renderQuestionnaireAccess(latestScreening);
        this.renderTips();
        this.setupAccordion();
        this.setupTabNavigation();
    },

    /**
     * Merender kartu Status Kesehatan.
     * @param {Object|null} screening - Data screening terakhir atau null
     */
    renderHealthStatus: function (screening) {
        const container = document.getElementById('dashboard-health-status');
        if (!container) return;

        if (!screening) {
            // Belum pernah skrining
            container.innerHTML = `
                <div class="health-status">
                    <div class="health-status-icon"><i class="fa-solid fa-stethoscope"></i></div>
                    <span class="health-badge status-belum" role="status">❌ Belum Pernah Skrining</span>
                    <p class="health-empty-text">Anda belum pernah melakukan skrining kesehatan ginjal. Yuk, mulai deteksi dini sekarang!</p>
                    <div class="health-actions">
                        <button class="btn btn-primary" id="dashboard-btn-start" type="button">
                            Mulai Kuesioner →
                        </button>
                    </div>
                </div>
            `;
            // Event listener untuk tombol "Mulai Kuesioner"
            const btnStart = document.getElementById('dashboard-btn-start');
            if (btnStart) {
                btnStart.addEventListener('click', function () {
                    window.startQuestionnaire && window.startQuestionnaire();
                });
            }
        } else {
            // Sudah pernah skrining
            const statusClass = 'status-' + screening.status;
            container.innerHTML = `
                <div class="health-status">
                    <div class="health-status-icon">${screening.statusIcon}</div>
                    <span class="health-badge ${statusClass}" role="status">${screening.statusIcon} ${screening.statusLabel}</span>
                    <p class="health-info">Skor: <strong>${screening.totalScore}</strong> dari 30</p>
                    <p class="health-info">Terakhir skrining: <strong>${formatDateIndonesia(screening.screeningDate)}</strong></p>
                    <div class="health-actions">
                        <button class="btn btn-secondary" id="dashboard-btn-detail" type="button">
                            Lihat Detail Hasil →
                        </button>
                    </div>
                </div>
            `;
            // Event listener untuk tombol "Lihat Detail Hasil"
            const btnDetail = document.getElementById('dashboard-btn-detail');
            if (btnDetail) {
                btnDetail.addEventListener('click', function () {
                    window.showLastResult && window.showLastResult();
                });
            }
        }
    },

    /**
     * Merender kartu Akses Kuesioner.
     * @param {Object|null} screening - Data screening terakhir atau null
     */
    renderQuestionnaireAccess: function (screening) {
        const container = document.getElementById('dashboard-questionnaire-access');
        if (!container) return;

        const partial = getPartialQuestionnaire();
        let statusHtml = '';

        if (partial && partial.answers && partial.answers.some(function (a) { return a !== null; })) {
            // Ada kuesioner yang sedang berjalan
            const answeredCount = partial.answers.filter(function (a) { return a !== null; }).length;
            const progressPct = Math.round((answeredCount / 10) * 100);
            statusHtml = `
                <div class="qa-status">
                    <p class="qa-status-text">
                        Status: Sedang berjalan <strong>(${answeredCount}/10)</strong>
                    </p>
                    <div class="qa-progress-mini">
                        <div class="progress-label">
                            <span>Progress</span>
                            <span>${progressPct}%</span>
                        </div>
                        <div class="progress-track">
                            <div class="progress-fill" style="width:${progressPct}%"></div>
                        </div>
                    </div>
                    <button class="btn btn-primary" id="dashboard-btn-resume" type="button">
                        Lanjutkan Kuesioner →
                    </button>
                </div>
            `;
        } else if (screening) {
            // Sudah pernah selesai
            statusHtml = `
                <div class="qa-status">
                    <p class="qa-status-text">
                        Status: <span class="status-done">Selesai ✅ (10/10)</span>
                    </p>
                    <button class="btn btn-primary" id="dashboard-btn-ulang" type="button">
                        Isi Ulang Kuesioner
                    </button>
                </div>
            `;
        } else {
            // Belum pernah
            statusHtml = `
                <div class="qa-status">
                    <p class="qa-status-text">
                        Status: <span class="status-empty">Belum diisi</span>
                    </p>
                    <button class="btn btn-primary" id="dashboard-btn-mulai" type="button">
                        Mulai Kuesioner →
                    </button>
                </div>
            `;
        }

        container.innerHTML = statusHtml;

        // Event listeners
        const btnMulai = document.getElementById('dashboard-btn-mulai');
        if (btnMulai) btnMulai.addEventListener('click', function () { window.startQuestionnaire && window.startQuestionnaire(); });

        const btnUlang = document.getElementById('dashboard-btn-ulang');
        if (btnUlang) btnUlang.addEventListener('click', function () { window.startQuestionnaire && window.startQuestionnaire(); });

        const btnResume = document.getElementById('dashboard-btn-resume');
        if (btnResume) btnResume.addEventListener('click', function () { window.resumeQuestionnaire && window.resumeQuestionnaire(); });
    },

    /**
     * Merender Tips & Kiat Kesehatan Ginjal (accordion).
     */
    renderTips: function () {
        const container = document.getElementById('dashboard-tips-content');
        if (!container) return;

        let tipsHtml = '';
        HEALTH_TIPS.forEach(function (tip, index) {
            tipsHtml += `
                <div class="accordion-item" id="accordion-${tip.id}">
                    <button class="accordion-header"
                            aria-expanded="false"
                            aria-controls="accordion-content-${tip.id}"
                            id="accordion-btn-${tip.id}"
                            type="button">
                        <span class="accordion-icon">${tip.icon}</span>
                        <span class="accordion-title">${tip.title}</span>
                        <span class="accordion-arrow">▼</span>
                    </button>
                    <div class="accordion-content"
                         id="accordion-content-${tip.id}"
                         role="region"
                         aria-labelledby="accordion-btn-${tip.id}">
                        <div class="accordion-content-inner">
                            ${tip.content}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = tipsHtml;
    },

    /**
     * Setup event listeners untuk accordion.
     */
    setupAccordion: function () {
        var headers = document.querySelectorAll('.accordion-header');
        headers.forEach(function (header) {
            header.addEventListener('click', function () {
                var item = this.closest('.accordion-item');
                var isActive = item.classList.contains('active');

                // Tutup semua accordion (opsional: hanya satu yang terbuka)
                document.querySelectorAll('.accordion-item.active').forEach(function (openItem) {
                    if (openItem !== item) {
                        openItem.classList.remove('active');
                        var openBtn = openItem.querySelector('.accordion-header');
                        if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle yang diklik
                if (isActive) {
                    item.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    },

    /**
     * Setup navigasi tab di dashboard.
     */
    setupTabNavigation: function () {
        var tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var page = this.dataset.page;

                // Update active tab
                tabs.forEach(function (t) { t.classList.remove('active'); });
                this.classList.add('active');

                // Navigasi
                if (page === 'dashboard') {
                    showPage('dashboard');
                } else if (page === 'riwayat') {
                    // Riwayat - placeholder
                    alert('Fitur Riwayat sedang dalam pengembangan. Nantikan update selanjutnya!');
                    // Kembalikan tab ke dashboard
                    DashboardManager.activateDashboardTab();
                } else if (page === 'profil') {
                    showPage('profile');
                }
            });
        });
    },

    /**
     * Update tab aktif saat halaman dashboard ditampilkan.
     */
    activateDashboardTab: function () {
        var tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(function (t) {
            t.classList.remove('active');
            if (t.dataset.page === 'dashboard') {
                t.classList.add('active');
            }
        });
    },

    /**
     * Update tab aktif saat halaman profil ditampilkan.
     */
    activateProfileTab: function () {
        var tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(function (t) {
            t.classList.remove('active');
            if (t.dataset.page === 'profil') {
                t.classList.add('active');
            }
        });
    },

    /**
     * Merender halaman profil pengguna.
     */
    renderProfile: function () {
        var container = document.getElementById('profile-content');
        if (!container) return;

        var screeningCount = getScreeningCount();
        var latest = getLatestScreening();

        container.innerHTML = `
            <div class="profile-info">
                <div class="profile-avatar">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div class="profile-name">User1</div>
                <div class="profile-role"><i class="fa-solid fa-user-check"></i> Pengguna Terdaftar</div>

                <div class="profile-details">
                    <div class="profile-detail-item">
                        <span class="label">Username</span>
                        <span class="value">user1</span>
                    </div>
                    <div class="profile-detail-item">
                        <span class="label">Role</span>
                        <span class="value">Masyarakat Umum</span>
                    </div>
                    <div class="profile-detail-item">
                        <span class="label">Total Skrining</span>
                        <span class="value">${screeningCount} kali</span>
                    </div>
                    <div class="profile-detail-item">
                        <span class="label">Skrining Terakhir</span>
                        <span class="value">${latest ? formatDateIndonesia(latest.screeningDate) : '-'}</span>
                    </div>
                </div>

                <div class="profile-logout-section">
                    <button class="btn btn-danger" id="btnLogout" type="button">
                        <i class="fa-solid fa-right-from-bracket"></i> Log Out
                    </button>
                    <p style="font-size:0.8rem;color:#a0aec0;margin-top:10px;">
                        Semua data skrining akan dihapus saat logout.
                    </p>
                </div>
            </div>
        `;

        // Event listener logout
        var btnLogout = document.getElementById('btnLogout');
        if (btnLogout) {
            btnLogout.addEventListener('click', function () {
                window.logout && window.logout();
            });
        }
    }
};
