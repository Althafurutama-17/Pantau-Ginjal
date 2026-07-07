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
 * Menyimpan hasil skrining baru ke localStorage.
 * @param {Object} result - Data hasil skrining
 * @param {number[]} result.answers - Array 10 nilai jawaban (0-3)
 * @param {number} result.totalScore - Skor total
 * @param {string} result.status - Key status ('sehat'|'waspada'|'konsultasi')
 * @param {string} result.statusLabel - Label status ('Sehat / Normal', dll)
 * @param {string} result.statusIcon - Icon status ('✅', '⚠️', '🔴')
 */
function saveScreeningResult(result) {
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
