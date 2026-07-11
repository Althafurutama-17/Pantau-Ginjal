/**
 * =========================================
 *  STORAGE MANAGER — localStorage Wrapper
 *  File: js/storage.js
 *  Deskripsi: Menyimpan & mengambil data
 *  skrining ke/dari localStorage browser
 * =========================================
 */

const STORAGE_KEY = 'ginjal_screenings';

/**
 * Menyimpan hasil skrining baru ke localStorage DAN Supabase.
 * @param {Object} result - Data hasil skrining
 * @param {number[]} result.answers - Array 10 nilai jawaban (0-3)
 * @param {number} result.totalScore - Skor total
 * @param {string} result.status - Key status ('sehat'|'waspada'|'konsultasi')
 * @param {string} result.statusLabel - Label status ('Sehat / Normal', dll)
 * @param {string} result.statusIcon - Icon status ('✅', '⚠️', '🔴')
 */
async function saveScreeningResult(result) {
    const screenings = getAllScreenings();

    const newEntry = {
        id: 'screening_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        answers: result.answers,
        totalScore: result.totalScore,
        status: result.status,
        statusLabel: result.statusLabel,
        statusIcon: result.statusIcon,
        screeningDate: new Date().toISOString(),
        createdAt: new Date().toISOString()
    };

    screenings.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(screenings));

    // Simpan ke Supabase jika user sudah login
    if (typeof currentUser !== 'undefined' && currentUser && currentUser.id) {
        try {
            // Map jawaban ke field screening_data
            const answers = result.answers;
            const foamyUrin = answers[2] >= 2; // Q3: urine berbusa
            const colorMap = { 0: 'normal', 1: 'agak gelap', 2: 'gelap', 3: 'sangat gelap' };
            const colorUrin = colorMap[answers[2]] || 'normal';

            // Hitung GFR estimasi (simplified - berdasarkan skor)
            // Dalam aplikasi nyata, GFR dihitung dari data medis
            const estimatedGFR = Math.max(15, 120 - (result.totalScore * 3));

            // Dipstick data (JSONB)
            const dipstick = {
                protein: answers[2] >= 1 ? 'positif' : 'negatif',
                blood: answers[4] >= 2 ? 'positif' : 'negatif',
                glucose: 'negatif',
                answers_snapshot: answers
            };

            const { error } = await supabaseClient
                .from('screening_data')
                .insert({
                    user_id: currentUser.id,
                    subjective_foamy_urin: foamyUrin,
                    subjective_color_urin: colorUrin,
                    objective_gfr: estimatedGFR,
                    objective_dipstick: dipstick,
                    screening_date: new Date().toISOString(),
                    notes: 'Skor: ' + result.totalScore + '/30 - ' + result.statusLabel
                });

            if (error) {
                console.warn('Gagal simpan ke Supabase:', error);
            }
        } catch (e) {
            console.warn('Error simpan ke Supabase:', e);
        }
    }

    return newEntry;
}

/**
 * Mengambil semua data skrining dari localStorage.
 * @returns {Array} Array of screening objects, sorted descending by date
 */
function getAllScreenings() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.warn('Gagal membaca localStorage:', e);
        return [];
    }
}

/**
 * Mengambil hasil skrining terakhir.
 * @returns {Object|null} Screening terakhir, atau null jika belum ada
 */
function getLatestScreening() {
    const screenings = getAllScreenings();
    return screenings.length > 0 ? screenings[screenings.length - 1] : null;
}

/**
 * Mengambil hasil skrining berdasarkan ID.
 * @param {string} id - ID screening
 * @returns {Object|null}
 */
function getScreeningById(id) {
    const screenings = getAllScreenings();
    return screenings.find(s => s.id === id) || null;
}

/**
 * Mengambil jumlah total skrining yang pernah dilakukan.
 * @returns {number}
 */
function getScreeningCount() {
    return getAllScreenings().length;
}

/**
 * Menghapus semua data skrining dari localStorage.
 */
function clearAllData() {
    localStorage.removeItem(STORAGE_KEY);
}

/**
 * Menyimpan kuesioner yang sedang berjalan (partial).
 * @param {Object} partial - { currentQuestion: number, answers: number[] }
 */
function savePartialQuestionnaire(partial) {
    const key = 'ginjal_partial';
    const data = {
        currentQuestion: partial.currentQuestion,
        answers: partial.answers,
        savedAt: new Date().toISOString()
    };
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Mengambil kuesioner yang sedang berjalan.
 * @returns {Object|null} { currentQuestion, answers, savedAt } atau null
 */
function getPartialQuestionnaire() {
    try {
        const data = localStorage.getItem('ginjal_partial');
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

/**
 * Menghapus kuesioner yang sedang berjalan.
 */
function clearPartialQuestionnaire() {
    localStorage.removeItem('ginjal_partial');
}
