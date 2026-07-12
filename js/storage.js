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

const OBJECTIVE_KEYS = [
    'obj_systolic_bp', 'obj_diastolic_bp', 'obj_urine_protein', 'obj_urine_glucose',
    'obj_blood_glucose', 'obj_cholesterol', 'obj_hemoglobin', 'obj_measurement_date'
];

const ALL_SELECT_COLUMNS = [...SUBJECTIVE_KEYS, ...OBJECTIVE_KEYS, 'id', 'user_id', 'screening_date', 'hasil'].join(', ');

/**
 * Map answers object → kolom Supabase.
 */
function mapAnswersToSupabase(answers) {
    const data = {};
    SUBJECTIVE_KEYS.forEach(key => { data[key] = answers[key] || 0; });
    return data;
}

function mapObjectiveToSupabase(objData) {
    const data = {};
    OBJECTIVE_KEYS.forEach(key => { data[key] = objData[key] || null; });
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

function mapSupabaseToObjective(row) {
    const obj = {};
    OBJECTIVE_KEYS.forEach(key => { obj[key] = row[key] || null; });
    return obj;
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
 * Generate object hasil berdasarkan skor.
 * Disimpan sebagai TEXT (JSON.stringify) di kolom 'hasil' Supabase.
 */
function generateHasil(skor, skorSubjektif, skorObjektif) {
    let status, statusLabel, statusIcon, level, deskripsi;

    if (skor <= 8) {
        status = 'sehat'; statusLabel = 'Sehat'; statusIcon = '✅'; level = 1;
        deskripsi = 'Kondisi kesehatan ginjal Anda tampak normal. Pertahankan pola hidup sehat!';
    } else if (skor <= 16) {
        status = 'waspada'; statusLabel = 'Waspada'; statusIcon = '⚠️'; level = 2;
        deskripsi = 'Terdapat beberapa indikator yang perlu diperhatikan. Periksakan diri ke dokter dalam 2 minggu.';
    } else if (skor <= 24) {
        status = 'risiko_tinggi'; statusLabel = 'Risiko Tinggi'; statusIcon = '🔴'; level = 3;
        deskripsi = 'Kombinasi gejala subjektif dan data objektif menunjukkan risiko tinggi. Segera konsultasi ke dokter spesialis ginjal.';
    } else {
        status = 'gawat_darurat'; statusLabel = 'Gawat Darurat'; statusIcon = '🚨'; level = 4;
        deskripsi = 'Kondisi ini memerlukan penanganan medis segera. Segera pergi ke IGD atau fasilitas kesehatan terdekat!';
    }

    return { skor, skorSubjektif: skorSubjektif || 0, skorObjektif: skorObjektif || 0, status, statusLabel, statusIcon, level, deskripsi };
}

/**
 * Parse kolom 'hasil' dari Supabase (bisa berupa string atau object).
 */
function parseHasil(hasil) {
    if (!hasil) return null;
    if (typeof hasil === 'object') return hasil;
    try {
        return JSON.parse(hasil);
    } catch (e) {
        return null;
    }
}

/**
 * Menyimpan hasil skrining ke Supabase (UPSERT).
 * Kolom yang digunakan sesuai schema aktual:
 *   id, user_id, screening_date, hasil, subj_*
 * @param {Object} result
 * @returns {Object|null}
 */
async function saveScreeningResult(result) {
    if (typeof currentUser === 'undefined' || !currentUser || !currentUser.id) {
        console.warn('User belum login, data tidak disimpan ke Supabase');
        return null;
    }

    try {
        const subjData = mapAnswersToSupabase(result.answers);
        const objData = result.objectiveData ? mapObjectiveToSupabase(result.objectiveData) : {};
        const hasilObj = generateHasil(result.totalScore, result.skorSubjektif, result.skorObjektif);
        const hasilText = JSON.stringify(hasilObj);
        const now = new Date().toISOString();

        // Cek apakah user sudah punya data screening
        const { data: existing } = await supabaseClient
            .from('screening_data')
            .select('id')
            .eq('user_id', currentUser.id)
            .limit(1)
            .maybeSingle();

        let data, error;
        const saveData = { ...subjData, ...objData, hasil: hasilText, screening_date: now };

        if (existing) {
            // UPDATE — ganti data lama dengan data baru
            const res = await supabaseClient
                .from('screening_data')
                .update(saveData)
                .eq('id', existing.id)
                .select()
                .single();
            data = res.data;
            error = res.error;
        } else {
            // INSERT — buat baris baru
            const res = await supabaseClient
                .from('screening_data')
                .insert({ user_id: currentUser.id, ...saveData })
                .select()
                .single();
            data = res.data;
            error = res.error;
        }

        if (error) {
            console.warn('Gagal simpan ke Supabase:', error);
            return null;
        }

        return {
            id: data.id,
            ...result,
            hasil: hasilObj,
            screeningDate: data.screening_date
        };
    } catch (e) {
        console.warn('Error simpan ke Supabase:', e);
        return null;
    }
}

/**
 * Mengambil semua data skrining dari Supabase.
 * Kolom aktual: id, user_id, screening_date, hasil, subj_*
 * @returns {Promise<Array>}
 */
async function getAllScreenings() {
    if (typeof currentUser === 'undefined' || !currentUser || !currentUser.id) return [];

    try {
        const { data, error } = await supabaseClient
            .from('screening_data')
            .select(ALL_SELECT_COLUMNS)
            .eq('user_id', currentUser.id)
            .order('screening_date', { ascending: false });

        if (error) { console.warn('Gagal mengambil data:', error); return []; }

        return (data || []).map(row => {
            const answers = mapSupabaseToAnswers(row);
            const objData = mapSupabaseToObjective(row);
            const hasilParsed = parseHasil(row.hasil);

            if (hasilParsed) {
                return {
                    id: row.id,
                    answers,
                    objectiveData: objData,
                    totalScore: hasilParsed.skor,
                    skorSubjektif: hasilParsed.skorSubjektif,
                    skorObjektif: hasilParsed.skorObjektif,
                    status: hasilParsed.status,
                    statusLabel: hasilParsed.statusLabel,
                    statusIcon: hasilParsed.statusIcon,
                    level: hasilParsed.level,
                    deskripsi: hasilParsed.deskripsi,
                    screeningDate: row.screening_date
                };
            }

            // Fallback: hitung dari subj_* kolom
            const score = hitungSkorFromAnswers(answers);
            return {
                id: row.id, answers, objectiveData: objData, totalScore: score,
                status: tentukanStatusKey(score),
                statusLabel: tentukanStatusLabel(score),
                statusIcon: tentukanStatusIcon(score),
                screeningDate: row.screening_date
            };
        });
    } catch (e) { console.warn('Error:', e); return []; }
}

/**
 * Mengambil hasil skrining terakhir dari Supabase.
 * Kolom aktual: id, user_id, screening_date, hasil, subj_*
 * @returns {Promise<Object|null>}
 */
async function getLatestScreening() {
    if (typeof currentUser === 'undefined' || !currentUser || !currentUser.id) return null;

    try {
        const { data, error } = await supabaseClient
            .from('screening_data')
            .select(ALL_SELECT_COLUMNS)
            .eq('user_id', currentUser.id)
            .order('screening_date', { ascending: false })
            .limit(1)
            .single();

        if (error || !data) return null;

        const answers = mapSupabaseToAnswers(data);
        const objData = mapSupabaseToObjective(data);
        const hasilParsed = parseHasil(data.hasil);

        if (hasilParsed) {
            return {
                id: data.id,
                answers,
                objectiveData: objData,
                totalScore: hasilParsed.skor,
                skorSubjektif: hasilParsed.skorSubjektif,
                skorObjektif: hasilParsed.skorObjektif,
                status: hasilParsed.status,
                statusLabel: hasilParsed.statusLabel,
                statusIcon: hasilParsed.statusIcon,
                level: hasilParsed.level,
                deskripsi: hasilParsed.deskripsi,
                screeningDate: data.screening_date
            };
        }

        // Fallback: hitung dari subj_* kolom
        const score = hitungSkorFromAnswers(answers);
        return {
            id: data.id, answers, objectiveData: objData, totalScore: score,
            status: tentukanStatusKey(score),
            statusLabel: tentukanStatusLabel(score),
            statusIcon: tentukanStatusIcon(score),
            screeningDate: data.screening_date
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
