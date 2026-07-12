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

const ALL_SELECT_COLUMNS = [...SUBJECTIVE_KEYS, ...OBJECTIVE_KEYS, 'id', 'user_id', 'screening_date', 'hasil', 'hasil_sbj', 'hasil_obj'].join(', ');

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
 * Generate object hasil parsial berdasarkan skor satu jenis (subjektif atau objektif).
 * Menggunakan persentase karena max subjektif (20) dan objektif (15) berbeda.
 * @param {number} skor - Skor jenis tersebut
 * @param {number} totalMaksimal - Total maksimal (20 untuk subjektif, 15 untuk objektif)
 * @param {string} type - 'subjektif' atau 'objektif'
 */
function generateHasilPartial(skor, totalMaksimal, type) {
    const pct = (skor / totalMaksimal) * 100;
    let status, statusLabel, statusIcon, level, deskripsi;

    if (pct <= 25) {
        status = 'sehat'; statusLabel = 'Sehat'; statusIcon = '✅'; level = 1;
        deskripsi = type === 'subjektif'
            ? 'Kondisi ginjal tampak normal berdasarkan gejala yang dilaporkan.'
            : 'Parameter pemeriksaan dalam batas normal.';
    } else if (pct <= 50) {
        status = 'waspada'; statusLabel = 'Waspada'; statusIcon = '⚠️'; level = 2;
        deskripsi = type === 'subjektif'
            ? 'Terdapat beberapa gejala yang perlu diperhatikan. Konsultasikan ke dokter.'
            : 'Beberapa parameter menunjukkan penyimpangan. Perlu evaluasi lebih lanjut.';
    } else if (pct <= 75) {
        status = 'risiko_tinggi'; statusLabel = 'Risiko Tinggi'; statusIcon = '🔴'; level = 3;
        deskripsi = type === 'subjektif'
            ? 'Gejala yang dilaporkan menunjukkan risiko tinggi gangguan ginjal.'
            : 'Beberapa parameter menunjukkan abnormalitas signifikan.';
    } else {
        status = 'gawat_darurat'; statusLabel = 'Gawat Darurat'; statusIcon = '🚨'; level = 4;
        deskripsi = type === 'subjektif'
            ? 'Gejala yang dilaporkan sangat mengkhawatirkan. Segera periksakan ke dokter.'
            : 'Parameter pemeriksaan menunjukkan kondisi darurat.';
    }

    return { skor, total_maksimal: totalMaksimal, status, statusLabel, statusIcon, level, deskripsi };
}

/**
 * Generate object hasil berdasarkan skor gabungan.
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
    console.log('[saveScreeningResult] currentUser:', currentUser ? currentUser.id : 'NULL');
    console.log('[saveScreeningResult] result:', result);

    if (typeof currentUser === 'undefined' || !currentUser || !currentUser.id) {
        console.warn('[saveScreeningResult] User belum login, data tidak disimpan ke Supabase');
        return null;
    }

    try {
        const subjData = mapAnswersToSupabase(result.answers);
        const objData = result.objectiveData ? mapObjectiveToSupabase(result.objectiveData) : {};

        // Hitung skor dari data yang tersedia
        const skorSbj = result.skorSubjektif || hitungSkorFromAnswers(result.answers);
        const skorObj = result.skorObjektif || 0;
        const totalSkor = skorSbj + skorObj;

        // Generate HASIL GABUNGAN (sumber kebenaran utama)
        const hasilGabungan = generateHasil(totalSkor, skorSbj, skorObj);
        const hasilText = JSON.stringify(hasilGabungan);

        // Generate HASIL PARSIAL (untuk tampilan parsial)
        const hasilSbj = generateHasilPartial(skorSbj, 20, 'subjektif');
        const hasilSbjText = JSON.stringify(hasilSbj);

        let hasilObjText = null;
        if (result.objectiveData) {
            hasilObjText = JSON.stringify(generateHasilPartial(skorObj, 15, 'objektif'));
        }

        console.log('[saveScreeningResult] skorSbj:', skorSbj, 'skorObj:', skorObj, 'total:', totalSkor);
        console.log('[saveScreeningResult] hasil_obj:', hasilObjText);

        const now = new Date().toISOString();

        // Ambil hasil_obj lama dari baris sebelumnya (untuk dipertahankan jika user skip)
        let oldHasilObj = null;
        try {
            const oldRes = await supabaseClient
                .from('screening_data')
                .select('hasil_obj')
                .eq('user_id', currentUser.id)
                .order('screening_date', { ascending: false })
                .limit(1);
            if (oldRes.data && oldRes.data.length > 0 && oldRes.data[0].hasil_obj) {
                oldHasilObj = oldRes.data[0].hasil_obj;
                console.log('[saveScreeningResult] Ditemukan hasil_obj lama');
            }
        } catch (e) {
            console.warn('[saveScreeningResult] Gagal ambil hasil_obj lama:', e);
        }

        let data, error;
        let finalHasilObjText = hasilObjText;

        // FIX BUG: Jika user skip objektif (hasilObjText = null) tapi data lama ada,
        // pertahankan data lama agar tidak hilang
        if (!finalHasilObjText && oldHasilObj) {
            finalHasilObjText = oldHasilObj;
            console.log('[saveScreeningResult] Pertahankan hasil_obj lama');
        }

        const saveData = { ...subjData, ...objData, hasil: hasilText, hasil_sbj: hasilSbjText, hasil_obj: finalHasilObjText, screening_date: now };

        // Selalu INSERT baris baru (riwayat)
        console.log('[saveScreeningResult] INSERT baru');
        const res = await supabaseClient
            .from('screening_data')
            .insert({ user_id: currentUser.id, ...saveData });
        error = res.error;
        if (!error) {
            data = { id: null, ...saveData };
            console.log('[saveScreeningResult] INSERT berhasil, hasil_obj:', finalHasilObjText ? 'ADA' : 'NULL');
        } else {
            console.error('[saveScreeningResult] INSERT gagal:', error);
        }

        if (error) {
            console.warn('[saveScreeningResult] Gagal simpan ke Supabase:', error);
            return null;
        }

        console.log('[saveScreeningResult] Berhasil simpan! data.id:', data ? data.id : 'null');

        return {
            id: data ? data.id : null,
            ...result,
            hasil: hasilGabungan,
            hasilSbj: hasilSbj,
            hasilObj: hasilObjText ? JSON.parse(hasilObjText) : null,
            screeningDate: now
        };
    } catch (e) {
        console.error('[saveScreeningResult] Error:', e.message, e);
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
            const hasilSbjParsed = parseHasil(row.hasil_sbj);
            const hasilObjParsed = parseHasil(row.hasil_obj);

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
                    screeningDate: row.screening_date,
                    hasilSbj: hasilSbjParsed,
                    hasilObj: hasilObjParsed
                };
            }

            // Fallback: hitung dari subj_* kolom
            const score = hitungSkorFromAnswers(answers);
            return {
                id: row.id, answers, objectiveData: objData, totalScore: score,
                status: tentukanStatusKey(score),
                statusLabel: tentukanStatusLabel(score),
                statusIcon: tentukanStatusIcon(score),
                screeningDate: row.screening_date,
                hasilSbj: hasilSbjParsed,
                hasilObj: hasilObjParsed
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
        const hasilSbjParsed = parseHasil(data.hasil_sbj);
        const hasilObjParsed = parseHasil(data.hasil_obj);

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
                screeningDate: data.screening_date,
                hasilSbj: hasilSbjParsed,
                hasilObj: hasilObjParsed
            };
        }

        // Fallback: hitung dari subj_* kolom
        const score = hitungSkorFromAnswers(answers);
        return {
            id: data.id, answers, objectiveData: objData, totalScore: score,
            status: tentukanStatusKey(score),
            statusLabel: tentukanStatusLabel(score),
            statusIcon: tentukanStatusIcon(score),
            screeningDate: data.screening_date,
            hasilSbj: hasilSbjParsed,
            hasilObj: hasilObjParsed
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
