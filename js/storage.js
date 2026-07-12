/**
 * =========================================
 *  STORAGE MANAGER — Full Supabase
 *  File: js/storage.js
 *  Deskripsi: Menyimpan & mengambil data
 *  skrining ke/dari Supabase (Cloud)
 * =========================================
 */

// ===== KEY UNTUK PARTIAL QUESTIONNAIRE (tetap localStorage) =====
const PARTIAL_KEY = 'ginjal_partial';

// ===== HELPER: Map kolom subj_* ke/from objek answers =====
const SUBJECTIVE_KEYS = [
    'subj_foamy_urine', 'subj_pruritus', 'subj_fatigue', 'subj_edema',
    'subj_nocturia', 'subj_dry_mouth', 'subj_taste_change', 'subj_nail_change',
    'subj_skin_change', 'subj_sleep_disturbance'
];

/**
 * Map answers object → kolom Supabase.
 */
function mapAnswersToSupabase(answers) {
    const data = {};
    SUBJECTIVE_KEYS.forEach(key => { data[key] = answers[key] || 0; });
    return data;
}

/**
 * Map kolom Supabase → answers object.
 */
function mapSupabaseToAnswers(row) {
    const answers = {};
    SUBJECTIVE_KEYS.forEach(key => { answers[key] = row[key] || 0; });
    return answers;
}

/**
 * Hitung skor dari answers object.
 */
function hitungSkorFromAnswers(answers) {
    return Object.values(answers).reduce((total, val) => total + (val || 0), 0);
}

/**
 * Tentukan status key berdasarkan skor.
 */
function tentukanStatusKey(skor) {
    if (skor <= 5) return 'sehat';
    if (skor <= 10) return 'waspada';
    if (skor <= 15) return 'risiko_tinggi';
    return 'gawat_darurat';
}

/**
 * Tentukan status label berdasarkan skor.
 */
function tentukanStatusLabel(skor) {
    if (skor <= 5) return 'Sehat';
    if (skor <= 10) return 'Waspada';
    if (skor <= 15) return 'Risiko Tinggi';
    return 'Gawat Darurat';
}

/**
 * Tentukan status icon berdasarkan skor.
 */
function tentukanStatusIcon(skor) {
    if (skor <= 5) return '✅';
    if (skor <= 10) return '⚠️';
    if (skor <= 15) return '🔴';
    return '🚨';
}

/**
 * Map answers object ke format display untuk aplikasi.
 */
function mapAnswersToDisplay(answers) {
    return {
        id: null,
        answers: answers,
        totalScore: hitungSkorFromAnswers(answers),
        status: tentukanStatusKey(hitungSkorFromAnswers(answers)),
        statusLabel: tentukanStatusLabel(hitungSkorFromAnswers(answers)),
        statusIcon: tentukanStatusIcon(hitungSkorFromAnswers(answers))
    };
}

// ===== FUNGSI UTAMA — SUPABASE =====

/**
 * Menyimpan hasil skrining baru ke Supabase.
 * @param {Object} result - Data hasil skrining
 * @param {Object} result.answers - Objek jawaban { 'subj_foamy_urine': 0, ... }
 * @param {number} result.totalScore - Skor total (0-20)
 * @param {string} result.status - Key status
 * @param {string} result.statusLabel - Label status
 * @param {string} result.statusIcon - Icon status
 * @returns {Object|null} Data yang tersimpan atau null jika gagal
 */
async function saveScreeningResult(result) {
    if (typeof currentUser === 'undefined' || !currentUser || !currentUser.id) {
        console.warn('User belum login, data tidak disimpan ke Supabase');
        return null;
    }

    try {
        const subjData = mapAnswersToSupabase(result.answers);

        const { data, error } = await supabaseClient
            .from('screening_data')
            .insert({
                user_id: currentUser.id,
                ...subjData,
                objective_gfr: Math.max(15, 120 - (result.totalScore * 6)),
                objective_dipstick: { answers_snapshot: result.answers },
                screening_date: new Date().toISOString(),
                notes: 'Skor: ' + result.totalScore + '/20 - ' + result.statusLabel
            })
            .select()
            .single();

        if (error) {
            console.warn('Gagal simpan ke Supabase:', error);
            return null;
        }

        return {
            id: data.id,
            ...result,
            screeningDate: data.screening_date,
            createdAt: data.created_at
        };
    } catch (e) {
        console.warn('Error simpan ke Supabase:', e);
        return null;
    }
}

/**
 * Mengambil semua data skrining dari Supabase.
 * @returns {Promise<Array>}
 */
async function getAllScreenings() {
    if (typeof currentUser === 'undefined' || !currentUser || !currentUser.id) return [];

    try {
        const { data, error } = await supabaseClient
            .from('screening_data')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('screening_date', { ascending: false });

        if (error) { console.warn('Gagal mengambil data:', error); return []; }

        return (data || []).map(row => {
            const answers = mapSupabaseToAnswers(row);
            const score = hitungSkorFromAnswers(answers);
            return {
                id: row.id, answers, totalScore: score,
                status: tentukanStatusKey(score),
                statusLabel: tentukanStatusLabel(score),
                statusIcon: tentukanStatusIcon(score),
                screeningDate: row.screening_date, createdAt: row.created_at
            };
        });
    } catch (e) { console.warn('Error:', e); return []; }
}

/**
 * Mengambil hasil skrining terakhir dari Supabase.
 * @returns {Promise<Object|null>}
 */
async function getLatestScreening() {
    if (typeof currentUser === 'undefined' || !currentUser || !currentUser.id) return null;

    try {
        const { data, error } = await supabaseClient
            .from('screening_data')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('screening_date', { ascending: false })
            .limit(1)
            .single();

        if (error || !data) return null;

        const answers = mapSupabaseToAnswers(data);
        const score = hitungSkorFromAnswers(answers);
        return {
            id: data.id, answers, totalScore: score,
            status: tentukanStatusKey(score),
            statusLabel: tentukanStatusLabel(score),
            statusIcon: tentukanStatusIcon(score),
            screeningDate: data.screening_date, createdAt: data.created_at
        };
    } catch (e) { return null; }
}

/**
 * Mengambil jumlah total skrining dari Supabase.
 * @returns {Promise<number>}
 */
async function getScreeningCount() {
    if (typeof currentUser === 'undefined' || !currentUser || !currentUser.id) return 0;

    try {
        const { count, error } = await supabaseClient
            .from('screening_data')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', currentUser.id);

        if (error) return 0;
        return count || 0;
    } catch (e) { return 0; }
}

/**
 * Menghapus semua data skrining dari Supabase.
 */
async function clearAllData() {
    if (typeof currentUser === 'undefined' || !currentUser || !currentUser.id) return;

    try {
        const { error } = await supabaseClient
            .from('screening_data')
            .delete()
            .eq('user_id', currentUser.id);

        if (error) console.warn('Gagal menghapus data:', error);
    } catch (e) { console.warn('Error:', e); }
}

// ===== PARTIAL QUESTIONNAIRE (tetap localStorage) =====

/**
 * Menyimpan kuesioner yang sedang berjalan (partial) ke localStorage.
 * @param {Object} partial - { currentQuestion: number, answers: Object }
 */
function savePartialQuestionnaire(partial) {
    const data = {
        currentQuestion: partial.currentQuestion,
        answers: partial.answers,
        savedAt: new Date().toISOString()
    };
    localStorage.setItem(PARTIAL_KEY, JSON.stringify(data));
}

/**
 * Mengambil kuesioner yang sedang berjalan dari localStorage.
 * @returns {Object|null}
 */
function getPartialQuestionnaire() {
    try {
        const data = localStorage.getItem(PARTIAL_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) { return null; }
}

/**
 * Menghapus kuesioner yang sedang berjalan dari localStorage.
 */
function clearPartialQuestionnaire() {
    localStorage.removeItem(PARTIAL_KEY);
}
