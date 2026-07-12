# 📋 DOKUMENTASI APLIKASI
## Skrining Kesehatan Ginjal — "Pantau Ginjal"

---

## 1. RINGKASAN PROYEK

| Item | Keterangan |
|------|-----------|
| **Nama** | Pantau Ginjal — Aplikasi Skrining Kesehatan Ginjal |
| **Tipe** | Single Page Application (SPA) |
| **Versi** | 2.1.0 |
| **Bahasa** | HTML5 + CSS3 + Vanilla JavaScript |
| **Backend** | Supabase (Auth + Database) |
| **Penyimpanan** | **100% Supabase** — tidak ada localStorage |
| **Target Pengguna** | Masyarakat umum, khususnya lansia (≥60 tahun) |
| **Bahasa Konten** | Bahasa Indonesia |

---

## 2. STRUKTUR FILE

```
EPIDEMIC UI/
├── index.html              ← Halaman utama SPA
├── DOKUMENTASI.md          ← Dokumentasi ini
├── README.md               ← Readme proyek
├── github_code.md          ← Cheat sheet Git
├── Logo 2.jpeg             ← Logo aplikasi
├── css/
│   ├── style.css           ← Gaya utama (pertanyaan, hasil, navigasi, dll)
│   └── dashboard.css       ← Gaya halaman dashboard & profil
└── js/
    ├── supabase.js         ← Konfigurasi koneksi Supabase
    ├── storage.js          ← Manajemen penyimpanan data (Supabase)
    ├── dashboard.js        ← Logika halaman dashboard, profil, tips
    └── app.js              ← Logika utama aplikasi
```

---

## 3. TEKNOLOGI & DEPENDENSI

| Teknologi | Kegunaan |
|-----------|----------|
| **HTML5** | Struktur halaman |
| **CSS3** | Gaya tampilan, responsif, animasi |
| **Vanilla JavaScript** | Logika aplikasi (tanpa framework) |
| **Supabase JS v2** | Backend-as-a-Service (Auth + Database) |
| **Font Awesome 6.5** | Ikon UI |
| **Material Icons** | Ikon tambahan |
| **Google Fonts** | Font Segoe UI / Roboto |

> **Catatan:** Tidak ada build tool, bundler, atau framework frontend. Aplikasi langsung dibuka via `file://` atau server lokal.

---

## 4. ARSITEKTUR APLIKASI

### 4.1 Alur Halaman (Page Flow)

```
┌─────────────┐
│   LANDING   │  ← Halaman pembuka (belum login)
└──────┬──────┘
       │
   ┌───┴───┐
   │       │
┌──▼──┐ ┌──▼─────┐
│LOGIN│ │REGISTER│
└──┬──┘ └──┬─────┘
   │       │
   └───┬───┘
       │
┌──────▼──────┐
│  DASHBOARD  │  ← Halaman utama setelah login
└──────┬──────┘
       │
   ┌───┼───────────┬──────────┐
   │   │           │          │
┌──▼───▼──┐ ┌──────▼──┐ ┌────▼────┐
│QUESTION │ │CHECKUP  │ │  TIPS   │
│NAIRE    │ │MEDIS    │ │  PAGE   │
└──┬──────┘ └──┬──────┘ └─────────┘
   │           │
   └──────┬────┘
          ▼
   ┌──────────┐
   │  HASIL   │  ← Tampilan hasil skrining (gabungan/parsial)
   └──────────┘
```

### 4.2 Halaman yang Tersedia

| ID Halaman | Fungsi |
|------------|--------|
| `page-landing` | Halaman pembuka dengan tombol Login & Daftar |
| `page-login` | Form login (username + password) |
| `page-register` | Form registrasi (username, password, nama, jenis kelamin, tanggal lahir) |
| `page-dashboard` | Dashboard utama — status kesehatan, akses kuesioner, checkup medis, tips |
| `page-questionnaire` | Halaman kuesioner 10 pertanyaan |
| `page-objective` | Form input data checkup medis (tekanan darah, gula, kolesterol, Hb, dll) |
| `page-result` | Halaman hasil skrining (lengkap atau parsial) |
| `page-tips` | Halaman tips & edukasi kesehatan ginjal (accordion) |
| `page-profile` | Halaman profil pengguna + tombol logout |
| `page-riwayat` | Halaman riwayat (dalam pengembangan) |

> **Catatan:** Halaman `page-home` (Beranda/Selamat Datang) telah dihapus. Tombol "Beranda" sekarang langsung mengarah ke Dashboard.

---

## 5. SISTEM AUTENTIKASI

### 5.1 Login
- Menggunakan **Supabase Auth** (`signInWithPassword`)
- Aplikasi mencari username di tabel `users` terlebih dahulu
- Karena Supabase Auth berbasis email, aplikasi membuat **email dummy** dari username:
  ```
  username → username@app-skrginjal.supabase.co
  ```
- Password dikirim langsung ke Supabase Auth

### 5.2 Registrasi
1. Validasi input (username ≥3 karakter, password ≥6 karakter, format username)
2. Cek keunikan username di tabel `users`
3. Daftar ke Supabase Auth dengan email dummy
4. Simpan profil pengguna ke tabel `users`
5. Redirect ke halaman landing setelah 1,5 detik

### 5.3 Logout
- Konfirmasi via modal kustom
- Sign out dari Supabase Auth
- Hapus data skrining dari Supabase (`clearAllData()`)
- Reset state aplikasi
- Kembali ke halaman landing

### 5.4 Data User yang Disimpan

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid | Primary key (dari Supabase Auth) |
| `user_name` | varchar | Username unik |
| `password_hash` | text | (kosong — auth dihandle Supabase) |
| `nama_lengkap` | text | Nama lengkap |
| `tanggal_lahir` | date | Tanggal lahir |
| `jenis_kelamin` | varchar | Laki-laki / Perempuan |
| `role` | varchar | Role user (default: `user`) |
| `created_at` | timestamptz | Waktu pembuatan akun |
| `updated_at` | timestamptz | Waktu update terakhir |

---

## 6. SISTEM SKRINING (KUESIONER)

### 6.1 Pertanyaan

Aplikasi memiliki **10 pertanyaan subjektif** berdasarkan indikator medis ginjal. Setiap pertanyaan memiliki **3 opsi jawaban** dengan nilai numerik:

| Nilai | Label |
|-------|-------|
| 0 | Tidak pernah / Tidak ada perubahan |
| 1 | Kadang-kadang / Perubahan ringan |
| 2 | Sering / Perubahan jelas |

### 6.2 Daftar 10 Pertanyaan

| No | Kode Kolom | Pertanyaan | Periode |
|----|-----------|------------|---------|
| 1 | `subj_foamy_urine` | Frekuensi urine berbusa/berbuih | 1 minggu |
| 2 | `subj_pruritus` | Frekuensi gatal-gatal kulit tanpa sebab | 1 minggu |
| 3 | `subj_fatigue` | Frekuensi mudah lelah tanpa sebab | 1 minggu |
| 4 | `subj_edema` | Pembengkakan di kaki/pergelangan kaki | 1 minggu |
| 5 | `subj_nocturia` | Terbangun malam untuk BAKe (>2 kali) | 1 minggu |
| 6 | `subj_dry_mouth` | Frekuensi mulut terasa kering | 1 minggu |
| 7 | `subj_taste_change` | Perubahan rasa di mulut | 1 minggu |
| 8 | `subj_nail_change` | Perubahan pada kuku (pucat, rapuh) | 1 bulan |
| 9 | `subj_skin_change` | Perubahan pada kulit (kering, pucat) | 1 bulan |
| 10 | `subj_sleep_disturbance` | Kesulitan tidur / tidur tidak nyenyak | 1 minggu |

### 6.3 Sistem Penilaian

#### Skor Subjektif (dari kuesioner)
```
Total Skor Subjektif = Jumlah semua jawaban (0-2 per pertanyaan)
Maksimal Skor Subjektif = 20 (10 × 2)
```

#### Skor Objektif (dari data checkup medis — 6 parameter, max 3 per parameter)

| Parameter | Normal | Penyimpangan |
|-----------|--------|-------------|
| Tekanan Darah | ≤120/80 mmHg | Skor 1-3 tergantung tingkat keparahan |
| Protein Urine | Negatif | +1 → skor 2, +2/+3 → skor 3 |
| Glukosa Urine | Negatif | +1 → skor 1, +2 → skor 2, +3 → skor 3 |
| Gula Darah | <100 mg/dL | 100-125 → 1, 126-199 → 2, ≥200 → 3 |
| Kolesterol | <200 mg/dL | 200-239 → 1, 240-279 → 2, ≥280 → 3 |
| Hemoglobin | Pria ≥13 / Wanita ≥12 g/dL | Turun 1 → 1, turun 1-3 → 2, turun >3 → 3 |

```
Maksimal Skor Objektif = 15
```

#### Skor Total Gabungan
```
Skor Total = Skor Subjektif + Skor Objektif
Maksimal Skor Total = 35 (20 + 15)
```

### 6.4 Kategori Status

| Skor Total | Level | Status | Icon |
|------------|-------|--------|------|
| 0–8 | 1 | Sehat | ✅ |
| 9–16 | 2 | Waspada | ⚠️ |
| 17–24 | 3 | Risiko Tinggi | 🔴 |
| 25–35 | 4 | Gawat Darurat | 🚨 |

### 6.5 Penilaian Parsial

Jika user hanya mengisi subjektif **atau** objektif saja, sistem menggunakan **persentase** untuk menentukan status:

| Persentase | Level | Status |
|------------|-------|--------|
| ≤25% | 1 | Sehat |
| ≤50% | 2 | Waspada |
| ≤75% | 3 | Risiko Tinggi |
| >75% | 4 | Gawat Darurat |

---

## 7. DATA CHECKUP MEDIS (OBJEKTIF)

Halaman input data checkup medis (`page-objective`) memiliki 6 parameter:

1. **Tekanan Darah** — Sistolik & Diastolik (mmHg)
2. **Protein Urine** — Negatif / +1 / +2 / +3
3. **Glukosa Urine** — Negatif / +1 / +2 / +3
4. **Gula Darah** — (mg/dL)
5. **Kolesterol Total** — (mg/dL)
6. **Hemoglobin** — (g/dL, threshold berbeda berdasarkan gender)
7. **Tanggal Pemeriksaan** — Tanggal input data

Tombol aksi:
- **Beranda** (icon rumah) → Kembali ke dashboard tanpa menyimpan
- **Simpan Data** → Simpan & langsung tampilkan hasil

---

## 8. DATABASE SUPABASE

### 8.1 Tabel `users`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid | Primary key |
| `user_name` | varchar | Username unik |
| `password_hash` | text | (kosong) |
| `nama_lengkap` | text | Nama lengkap |
| `tanggal_lahir` | date | Tanggal lahir |
| `jenis_kelamin` | varchar | Jenis kelamin |
| `role` | varchar | Role user |
| `created_at` | timestamptz | Waktu dibuat |
| `updated_at` | timestamptz | Waktu diupdate |

### 8.2 Tabel `screening_data`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | Foreign key → `users.id` |
| `screening_date` | timestamptz | Waktu skrining |
| `hasil` | text | JSON string hasil gabungan |
| `hasil_sbj` | text | JSON string hasil subjektif parsial |
| `hasil_obj` | text | JSON string hasil objektif parsial |
| `subj_foamy_urine` | int4 | Skor urine berbusa (0-2) |
| `subj_pruritus` | int4 | Skor gatal-gatal (0-2) |
| `subj_fatigue` | int4 | Skor kelelahan (0-2) |
| `subj_edema` | int4 | Skor pembengkakan (0-2) |
| `subj_nocturia` | int4 | Skor nokturia (0-2) |
| `subj_dry_mouth` | int4 | Skor mulut kering (0-2) |
| `subj_taste_change` | int4 | Skor perubahan rasa (0-2) |
| `subj_nail_change` | int4 | Skor perubahan kuku (0-2) |
| `subj_skin_change` | int4 | Skor perubahan kulit (0-2) |
| `subj_sleep_disturbance` | int4 | Skor gangguan tidur (0-2) |
| `obj_systolic_bp` | int4 | Tekanan darah sistolik |
| `obj_diastolic_bp` | int4 | Tekanan darah diastolik |
| `obj_urine_protein` | varchar | Protein urine |
| `obj_urine_glucose` | varchar | Glukosa urine |
| `obj_blood_glucose` | int4 | Gula darah |
| `obj_cholesterol` | int4 | Kolesterol total |
| `obj_hemoglobin` | float8 | Hemoglobin |
| `obj_measurement_date` | date | Tanggal pemeriksaan |

### 8.3 Format Kolom `hasil` (JSON string)

```json
{
    "skor": 12,
    "skorSubjektif": 8,
    "skorObjektif": 4,
    "status": "waspada",
    "statusLabel": "Waspada",
    "statusIcon": "⚠️",
    "level": 2,
    "deskripsi": "Terdapat beberapa indikator yang perlu diperhatikan..."
}
```

### 8.4 Format Kolom `hasil_sbj` / `hasil_obj` (JSON string)

```json
{
    "skor": 8,
    "total_maksimal": 20,
    "status": "waspada",
    "statusLabel": "Waspada",
    "statusIcon": "⚠️",
    "level": 2,
    "deskripsi": "Terdapat beberapa gejala yang perlu diperhatikan..."
}
```

> **Catatan:** Kolom `hasil`, `hasil_sbj`, `hasil_obj` bertipe `text`, bukan `jsonb`. Data disimpan sebagai string JSON dan di-parse saat dibaca.

---

## 9. MANAJEMEN DATA (storage.js)

### 9.1 Prinsip Penyimpanan

| Jenis Data | Media Penyimpanan | Keterangan |
|------------|-------------------|------------|
| Data skrining | **Supabase** | Full cloud — INSERT baris baru tiap screening (riwayat) |
| Data user | **Supabase (tabel users)** | Profil pengguna |
| Autentikasi | **Supabase Auth** | Handle oleh Supabase SDK |

> **PENTING:** Semua data 100% tersimpan di Supabase. **Tidak ada localStorage** sama sekali. Partial questionnaire (draft kuesioner) sebelumnya menggunakan localStorage sudah dihapus.

### 9.2 Fungsi Utama

| Fungsi | Tipe | Keterangan |
|--------|------|------------|
| `saveScreeningResult(result)` | async | **INSERT** — simpan hasil skrining baru (riwayat) |
| `getAllScreenings()` | async | Ambil semua data skrining user dari Supabase |
| `getLatestScreening()` | async | Ambil data skrining terakhir |
| `getScreeningCount()` | async | Hitung jumlah skrining user |
| `clearAllData()` | async | Hapus semua data skrining user dari Supabase |

### 9.3 Mekanisme Penyimpanan

```
User isi kuesioner (+ checkup medis) → Simpan ke Supabase
                                           │
                                      ┌────▼────┐
                                      │ INSERT  │
                                      │ baris   │
                                      │ baru    │
                                      └─────────┘
                                           │
                                           ▼
                                   Riwayat tersimpan
                                   (setiap screening = baris baru)
```

> **Penting:** Setiap screening membuat **baris baru** (INSERT), bukan UPSERT. Ini memungkinkan riwayat skrining. Data objektif lama tetap dipertahankan jika user skip form checkup medis pada screening berikutnya.

### 9.4 Helper Functions

| Fungsi | Kegunaan |
|--------|----------|
| `mapAnswersToSupabase(answers)` | Map jawaban kuesioner → kolom `subj_*` |
| `mapObjectiveToSupabase(objData)` | Map data objektif → kolom `obj_*` |
| `mapSupabaseToAnswers(row)` | Map kolom `subj_*` → object answers |
| `mapSupabaseToObjective(row)` | Map kolom `obj_*` → object objectiveData |
| `generateHasil(skor, skorSbj, skorObj)` | Generate JSON hasil gabungan |
| `generateHasilPartial(skor, max, type)` | Generate JSON hasil parsial (subjektif/objektif) |
| `parseHasil(hasil)` | Parse kolom hasil dari string/json |
| `hitungSkorFromAnswers(answers)` | Hitung skor dari answers object |
| `tentukanStatusKey(skor)` | Status key dari skor (0-5: sehat, 6-10: waspada, dll) |
| `tentukanStatusLabel(skor)` | Label status dari skor |
| `tentukanStatusIcon(skor)` | Icon status dari skor |

---

## 10. STATE MANAGEMENT (app.js)

### 10.1 State Global

```javascript
let isLoggedIn = false;    // Status login
let currentUser = null;    // Data user yang login

const state = {
    currentPage: 'login',  // Halaman aktif
    currentQuestion: 0,    // Indeks pertanyaan (0-9)
    answers: {},           // Jawaban: { 'subj_foamy_urine': 0, ... }
    objectiveData: null    // Data checkup medis: { obj_systolic_bp: 120, ... }
};
```

### 10.2 Alur Kuesioner

```
startQuestionnaire()
    │
    ▼
renderQuestion()  ←──── renderNavButtons()
    │                      │
    ▼                      ▼
User pilih jawaban    [Beranda] [← Kembali] [Selanjutnya/Lihat Hasil →]
    │
    ▼
nextQuestion()
    │
    ├── Pertanyaan belum terakhir → renderQuestion() lagi
    │
    └── Pertanyaan terakhir → showConfirmationModal()
                                    │
                          ┌─────────┼─────────┐
                          │         │         │
                          ▼         ▼         ▼
                     [Kembali] [Isi/Update  [Lihat Hasil ✓]
                               Checkup Medis]
                          │         │
                          └─────────┼─────────┐
                                    │         │
                                    ▼         ▼
                            renderObjective  showResultFinal()
                            Form()               │
                              │                  ▼
                              ▼           saveScreeningResult()
                          Simpan Data         → Supabase
                              │                  │
                              ▼                  ▼
                          showResultFinal()  Tampilkan hasil
```

### 10.3 Navigasi Footer

| Halaman | Tombol |
|---------|--------|
| Landing / Login / Register | (tidak ada) |
| Dashboard | (tidak ada — navigasi via bottom tabs) |
| Kuesioner | Beranda (ke dashboard + reset) \| ← Kembali \| Selanjutnya / Lihat Hasil → |
| Checkup Medis | (tombol di dalam form: Beranda \| Simpan Data) |
| Hasil | ← Kembali ke Dashboard |
| Lainnya (tips, profil, riwayat) | (tidak ada) |

---

## 11. TAMPILAN HASIL

### 11.1 Hasil Gabungan (Full)
- Icon status besar (✅ ⚠️ 🔴 🚨)
- Badge status
- Deskripsi hasil
- Tips kesehatan spesifik (5 kiat sesuai status)
- Split view: Subjektif vs Checkup Medis (jika keduanya terisi)

### 11.2 Hasil Parsial
- Jika hanya subjektif → ada banner "Data Belum Lengkap" + tombol "Isi Data Checkup Medis"
- Jika hanya objektif → ada banner "Data Belum Lengkap" + tombol "Isi Kuesioner"
- Menampilkan detail parameter yang sudah diisi

### 11.3 Split View
- Dua kartu berdampingan: Subjektif dan Checkup Medis
- Masing-masing menampilkan status parsial
- Tombol "Detail" untuk lihat hasil parsial masing-masing

---

## 12. DASHBOARD

### 12.1 Kartu Status Kesehatan
4 kondisi berdasarkan kelengkapan data:

| Kondisi | Tampilan |
|---------|----------|
| Belum ada data | Badge "Belum Ada Data" + tombol Mulai Kuesioner + Input Pemeriksaan |
| Hanya subjektif | Badge "Data Belum Lengkap" + skor subjektif + tombol Lihat Hasil Sementara + Isi Checkup Medis |
| Hanya objektif | Badge "Data Belum Lengkap" + skor objektif + tombol Lihat Hasil Sementara + Isi Kuesioner |
| Lengkap | Badge status + total skor + detail + tombol Lihat Hasil Lengkap |

### 12.2 Kartu Kuesioner Skrining
- Status: Selesai ✅ (10/10) atau Belum diisi
- Tombol: Isi Ulang / Mulai Kuesioner

### 12.3 Kartu Data Checkup Medis
- Preview parameter yang sudah diisi (grid)
- Status: sudah terisi / belum diisi
- Tombol: Perbarui / Isi Data Checkup Medis

### 12.4 Kartu Tips & Kiat
- Preview 2 tips pertama
- Tombol "Lihat Semua Tips →"

---

## 13. TIPS & EDUKASI

4 topik edukasi dalam format accordion:

1. **Apa itu Penyakit Ginjal?** — Definisi, silent killer, data Kemenkes
2. **Mengapa Ginjal Penting?** — Fungsi ginjal, bahaya jika rusak
3. **Gejala & Indikasi Awal** — 10 gejala lengkap
4. **Pencegahan & Penanganan** — 10 cara menjaga ginjal + kapan ke dokter

---

## 14. BOTTOM NAVIGASI

4 tab navigasi yang muncul di halaman dashboard, profil, tips, riwayat:

| Tab | Icon | Halaman |
|-----|------|---------|
| Dashboard | 🏠 House | `page-dashboard` |
| Riwayat | 🕰️ Clock | `page-riwayat` |
| Tips | 💡 Lightbulb | `page-tips` |
| Profil | 👤 User | `page-profile` |

---

## 15. TAMPILAN & RESPONSIVITAS

### 15.1 Breakpoints

| Breakpoint | Deskripsi |
|------------|-----------|
| ≤ 400px | Mobile kecil |
| ≤ 600px | Mobile |
| ≤ 768px | Tablet |
| > 1024px | Desktop (max-width: 1000px) |

### 15.2 Fitur Aksesibilitas
- Font size minimum **20px** (ramah lansia)
- Radio button besar dengan label jelas
- ARIA attributes pada elemen interaktif
- Keyboard navigation support
- Warna kontras tinggi
- Focus management setelah modal/tab

### 15.3 Warna Utama

| Variabel | Kode | Kegunaan |
|----------|------|----------|
| Biru Gelap | `#0a5c8a` | Header, aksen utama |
| Biru Medium | `#1a7fc4` | Tombol, progress bar |
| Hijau | `#28a745` | Status sehat |
| Kuning | `#ffc107` | Status waspada |
| Merah | `#dc3545` | Status risiko tinggi |
| Merah Tua | `#721c24` | Status gawat darurat |

---

## 16. CARA MENJALANKAN

### 16.1 Langsung (file://)
Buka `index.html` di browser. Semua file JS/CSS dimuat relatif.

### 16.2 Server Lokal
```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan Node.js
npx serve .

# Menggunakan PHP
php -S localhost:8000
```

Buka `http://localhost:8000` di browser.

---

## 17. KEAMANAN & CATATAN PENTING

### 17.1 Supabase Anon Key
- Anon key Supabase terekspos di `js/supabase.js`
- **Pastikan RLS (Row Level Security) aktif** di Supabase Dashboard
- RLS harus membatasi akses hanya untuk user yang login

### 17.2 Password
- Password dikirim langsung ke Supabase Auth (tidak disimpan di aplikasi)
- Kolom `password_hash` di tabel `users` dikosongkan

### 17.3 Data Sensitif
- Email dummy hanya untuk auth, tidak ditampilkan ke user
- Semua data skrining tersimpan di cloud (Supabase)
- **Tidak ada data tersimpan di localStorage** — privasi lebih terjaga

### 17.4 Registrasi Gagal "Username sudah digunakan"
Jika terjadi error saat registrasi meskipun tabel `users` sudah dikosongkan, hapus juga user dari **Authentication > Users** di Supabase Dashboard, karena Supabase Auth masih menyimpan data auth berdasarkan email dummy (`username@app-skrginjal.supabase.co`).

---

## 18. STATUS & RIWAYAT PERUBAHAN

### v2.1.0 (Current)
- ✅ Halaman `page-home` dihapus — tombol Beranda langsung ke Dashboard
- ✅ Tombol "Simpan & Lihat Hasil" → "Simpan Data"
- ✅ Tombol "← Kembali" → "Beranda" (dengan ikon rumah)
- ✅ **localStorage dihapus total** — 100% Supabase
- ✅ Data objektif (checkup medis) — 6 parameter + tanggal
- ✅ Skoring objektif (max 15) + gabungan subjektif+objektif (max 35)
- ✅ Sistem INSERT (riwayat) — setiap screening = baris baru
- ✅ Partial results (hasil_sbj, hasil_obj) untuk tampilan parsial
- ✅ 4 kategori status dengan skala baru (0-8, 9-16, 17-24, 25-35)
- ✅ Split view subjektif & objektif di halaman hasil
- ✅ Dashboard dinamis (4 kondisi kelengkapan data)
- ✅ Tips edukasi dengan accordion (4 topik)
- ✅ Bottom navigasi (4 tab)
- ✅ Responsive & ramah lansia

### v2.0.0
- ✅ 10 pertanyaan subjektif baru berdasarkan literatur medis
- ✅ Sistem skor 0-20 (4 level status)
- ✅ Full Supabase storage
- ✅ Kolom `hasil` menyimpan JSON hasil perhitungan
- ✅ Tampilan deskripsi hasil di dashboard & halaman hasil
- ✅ Profil tanpa field email

### v1.1.0
- Multi-file structure
- Login & registrasi dengan Supabase Auth
- Dashboard dengan tips edukasi

### v1.0.0
- Single file HTML
- 10 pertanyaan dengan skala 0-3
- localStorage saja

---

## 19. LAMPIRAN: SKEMA RELASI DATABASE

```
┌──────────────────────┐         ┌──────────────────────────────┐
│       users          │         │       screening_data         │
├──────────────────────┤         ├──────────────────────────────┤
│ id (uuid) PK ────────┼────┬────│ user_id (uuid) FK           │
│ user_name (varchar)  │    │    │ id (uuid) PK                │
│ password_hash (text) │    │    │ screening_date (timestamptz) │
│ nama_lengkap (text)  │    │    │ hasil (text) JSON           │
│ tanggal_lahir (date) │    │    │ hasil_sbj (text) JSON       │
│ jenis_kelamin (var)  │    │    │ hasil_obj (text) JSON       │
│ role (varchar)       │    │    │ subj_foamy_urine (int4)     │
│ created_at (timestz) │    │    │ subj_pruritus (int4)        │
│ updated_at (timestz) │    │    │ subj_fatigue (int4)         │
└──────────────────────┘    │    │ subj_edema (int4)           │
                            │    │ subj_nocturia (int4)        │
                            │    │ subj_dry_mouth (int4)       │
                            │    │ subj_taste_change (int4)    │
                            │    │ subj_nail_change (int4)     │
                            │    │ subj_skin_change (int4)     │
                            │    │ subj_sleep_disturb (int4)   │
                            │    │ obj_systolic_bp (int4)      │
                            │    │ obj_diastolic_bp (int4)     │
                            │    │ obj_urine_protein (varchar) │
                            │    │ obj_urine_glucose (varchar) │
                            │    │ obj_blood_glucose (int4)    │
                            │    │ obj_cholesterol (int4)      │
                            │    │ obj_hemoglobin (float8)     │
                            │    │ obj_measurement_date (date) │
                            │    └──────────────────────────────┘
                            │
                            └── Relasi: 1 user → banyak baris screening_data (riwayat)
```

---

*Dokumentasi ini diperbarui pada 12 Juli 2026.*
