# 📋 DOKUMENTASI APLIKASI
## Skrining Kesehatan Ginjal — "Pantau Ginjal"

---

## 1. RINGKASAN PROYEK

| Item | Keterangan |
|------|-----------|
| **Nama** | Pantau Ginjal — Aplikasi Skrining Kesehatan Ginjal |
| **Tipe** | Single Page Application (SPA) |
| **Versi** | 2.0.0 |
| **Bahasa** | HTML5 + CSS3 + Vanilla JavaScript |
| **Backend** | Supabase (Auth + Database) |
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
│QUESTION │ │  TIPS   │ │ PROFIL  │
│NAIRE    │ │  PAGE   │ │  PAGE   │
└──┬──────┘ └─────────┘ └─────────┘
   │
┌──▼──────┐
│  HASIL  │  ← Tampilan hasil skrining
└─────────┘
```

### 4.2 Halaman yang Tersedia

| ID Halaman | Fungsi |
|------------|--------|
| `page-landing` | Halaman pembuka dengan tombol Login & Daftar |
| `page-login` | Form login (username + password) |
| `page-register` | Form registrasi (username, password, nama, jenis kelamin, tanggal lahir) |
| `page-home` | Beranda informasi aplikasi |
| `page-dashboard` | Dashboard utama — status kesehatan, akses kuesioner, tips |
| `page-questionnaire` | Halaman kuesioner 10 pertanyaan |
| `page-result` | Halaman hasil skrining |
| `page-tips` | Halaman tips & edukasi kesehatan ginjal |
| `page-profile` | Halaman profil pengguna |
| `page-riwayat` | Halaman riwayat (dalam pengembangan) |

---

## 5. SISTEM AUTENTIKASI

### 5.1 Login
- Menggunakan **Supabase Auth** (`signInWithPassword`)
- Karena Supabase Auth berbasis email, aplikasi membuat **email dummy** dari username:
  ```
  username → username@app-skrginjal.supabase.co
  ```
- Password dikirim langsung ke Supabase Auth

### 5.2 Registrasi
1. Cek keunikan username di tabel `users`
2. Daftar ke Supabase Auth dengan email dummy
3. Simpan profil pengguna ke tabel `users`

### 5.3 Data User yang Disimpan

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

```
Total Skor = Jumlah semua jawaban (0-2 per pertanyaan)
Maksimal Skor = 20 (10 × 2)
```

| Skor | Level | Status | Icon | Deskripsi |
|------|-------|--------|------|-----------|
| 0–5 | 1 | Sehat | ✅ | Kondisi ginjal tampak normal |
| 6–10 | 2 | Waspada | ⚠️ | Perlu diperhatikan, periksakan ke dokter dalam 2 minggu |
| 11–15 | 3 | Risiko Tinggi | 🔴 | Segera konsultasi ke dokter spesialis ginjal dalam 1 minggu |
| 16–20 | 4 | Gawat Darurat | 🚨 | Memerlukan penanganan medis segera |

---

## 7. DATABASE SUPABASE

### 7.1 Tabel `users`

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

### 7.2 Tabel `screening_data`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | Foreign key → `users.id` |
| `screening_date` | timestamptz | Waktu skrining |
| `hasil` | text | JSON string hasil perhitungan |
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

### 7.3 Format Kolom `hasil` (JSON string)

```json
{
    "skor": 8,
    "status": "waspada",
    "statusLabel": "Waspada",
    "statusIcon": "⚠️",
    "level": 2,
    "deskripsi": "Terdapat beberapa gejala yang perlu diperhatikan..."
}
```

> **Catatan:** Kolom `hasil` bertipe `text`, bukan `jsonb`. Data disimpan sebagai string JSON dan di-parse saat dibaca.

---

## 8. MANAJEMEN DATA (storage.js)

### 8.1 Prinsip Penyimpanan

| Jenis Data | Media Penyimpanan | Keterangan |
|------------|-------------------|------------|
| Data skrining | **Supabase** | Full cloud — setiap user 1 baris data (upsert) |
| Kuesioner partial | **localStorage** | Hanya saat user belum login / sedang mengisi |
| Sesi login | **Supabase Auth** | Handle oleh Supabase SDK |

### 8.2 Fungsi Utama

| Fungsi | Tipe | Keterangan |
|--------|------|------------|
| `saveScreeningResult(result)` | async | **UPSERT** — update jika sudah ada, insert jika baru |
| `getAllScreenings()` | async | Ambil semua data skrining user dari Supabase |
| `getLatestScreening()` | async | Ambil data skrining terakhir |
| `getScreeningCount()` | async | Hitung jumlah skrining user |
| `clearAllData()` | async | Hapus semua data skrining user |
| `savePartialQuestionnaire(partial)` | sync | Simpan progress kuesioner ke localStorage |
| `getPartialQuestionnaire()` | sync | Ambil progress kuesioner dari localStorage |
| `clearPartialQuestionnaire()` | sync | Hapus progress kuesioner dari localStorage |

### 8.3 Mekanisme UPSERT

```
User isi kuesioner → Simpan ke Supabase
                        │
                   ┌────▼────┐
                   │ Cek: apakah │
                   │ user sudah  │
                   │ punya data? │
                   └────┬────┘
                    │       │
                 YA │       │ TIDAK
                    ▼       ▼
               UPDATE    INSERT
            (ganti data  (buat baris
             lama)        baru)
```

> **Penting:** Setiap user hanya memiliki **1 baris data** di tabel `screening_data`. Jika user mengisi ulang, data lama akan diganti (update), bukan ditambah baris baru.

---

## 9. STATE MANAGEMENT (app.js)

### 9.1 State Global

```javascript
let isLoggedIn = false;    // Status login
let currentUser = null;    // Data user yang login

const state = {
    currentPage: 'login',  // Halaman aktif
    currentQuestion: 0,    // Indeks pertanyaan (0-9)
    answers: {}            // Jawaban: { 'subj_foamy_urine': 0, ... }
};
```

### 9.2 Alur Kuesioner

```
startQuestionnaire()
    │
    ▼
renderQuestion()  ←──── renderNavButtons()
    │                      │
    ▼                      ▼
User pilih jawaban    [Beranda] [← Kembali] [Selanjutnya →]
    │
    ▼
nextQuestion()
    │
    ├── Pertanyaan belum terakhir → renderQuestion() lagi
    │
    └── Pertanyaan terakhir → showConfirmationModal()
                                    │
                                    ▼
                              [Ya, Tampilkan Hasil]
                                    │
                                    ▼
                              showResult()
                                    │
                                    ▼
                              saveScreeningResult() → Supabase
                                    │
                                    ▼
                              Tampilkan halaman hasil
```

---

## 10. FITUR APLIKASI

### 10.1 Dashboard
- **Status Kesehatan** — Menampilkan hasil skrining terakhir (skor, status, deskripsi)
- **Akses Kuesioner** — Mulai baru, lanjutkan, atau isi ulang
- **Tips Kesehatan** — Preview 2 tips pertama

### 10.2 Kuesioner
- 10 pertanyaan ditampilkan **satu per satu**
- Progress bar real-time
- Navigasi: Beranda, Kembali, Selanjutnya
- Modal konfirmasi sebelum melihat hasil
- Progress tersimpan otomatis (localStorage)

### 10.3 Halaman Hasil
- Ikon status (✅ ⚠️ 🔴 🚨)
- Badge status (Sehat / Waspada / Risiko Tinggi / Gawat Darurat)
- Skor total (0-20)
- Deskripsi hasil
- Tips kesehatan spesifik sesuai status

### 10.4 Tips & Edukasi
- 4 topik edukasi dalam format accordion:
  1. Apa itu Penyakit Ginjal?
  2. Mengapa Ginjal Penting?
  3. Gejala & Indikasi Awal
  4. Pencegahan & Penanganan

### 10.5 Profil
- Informasi pengguna (username, nama, jenis kelamin, tanggal lahir)
- Statistik skrining (total, terakhir)
- Tombol logout

### 10.6 Autentikasi
- Login dengan username & password
- Registrasi akun baru
- Logout dengan konfirmasi

---

## 11. TAMPILAN & RESPONSIVITAS

### 11.1 Breakpoints

| Breakpoint | Deskripsi |
|------------|-----------|
| ≤ 400px | Mobile kecil |
| ≤ 600px | Mobile |
| ≤ 768px | Tablet |
| > 1024px | Desktop (max-width: 1000px) |

### 11.2 Fitur Aksesibilitas
- Font size minimum **20px** (ramah lansia)
- Radio button besar dengan label jelas
- ARIA attributes pada elemen interaktif
- Keyboard navigation support
- Warna kontras tinggi

### 11.3 Warna Utama

| Variabel | Kode | Kegunaan |
|----------|------|----------|
| Biru Gelap | `#0a5c8a` | Header, aksen utama |
| Biru Medium | `#1a7fc4` | Tombol, progress bar |
| Hijau | `#28a745` | Status sehat |
| Kuning | `#ffc107` | Status waspada |
| Merah | `#dc3545` | Status risiko tinggi |
| Merah Tua | `#721c24` | Status gawat darurat |

---

## 12. CARA MENJALANKAN

### 12.1 Langsung (file://)
Buka `index.html` di browser. Semua file JS/CSS dimuat relatif.

### 12.2 Server Lokal
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

## 13. KEAMANAN &Catatan Penting

### 13.1 Supabase Anon Key
- Anon key Supabase terekspos di `js/supabase.js`
- **Pastikan RLS (Row Level Security) aktif** di Supabase Dashboard
- RLS harus membatasi akses hanya untuk user yang login

### 13.2 Password
- Password dikirim langsung ke Supabase Auth (tidak disimpan di aplikasi)
- Kolom `password_hash` di tabel `users` dikosongkan

### 13.3 Data Sensitif
- Email dummy hanya untuk auth, tidak ditampilkan ke user
- Semua data skrining tersimpan di cloud (Supabase)

---

## 14. STATUS & RIWAYAT PERUBAHAN

### v2.0.0 (Current)
- ✅ 10 pertanyaan subjektif baru berdasarkan literatur medis
- ✅ Sistem skor 0-20 (4 level status)
- ✅ Full Supabase storage (upsert — data lama diganti)
- ✅ Kolom `hasil` menyimpan JSON hasil perhitungan
- ✅ Tampilan deskripsi hasil di dashboard & halaman hasil
- ✅ Profil tanpa field email
- ✅ Responsive & ramah lansia

### v1.1.0
- Multi-file structure
- Login & registrasi dengan Supabase Auth
- Dashboard dengan tips edukasi

### v1.0.0
- Single file HTML
- 10 pertanyaan dengan skala 0-3
- localStorage saja

---

## 15. LAMPIRAN: SKEMA RELASI DATABASE

```
┌──────────────────────┐         ┌──────────────────────────┐
│       users          │         │     screening_data       │
├──────────────────────┤         ├──────────────────────────┤
│ id (uuid) PK ────────┼────┬────│ user_id (uuid) FK        │
│ user_name (varchar)  │    │    │ id (uuid) PK             │
│ password_hash (text) │    │    │ screening_date (timestz) │
│ nama_lengkap (text)  │    │    │ hasil (text) JSON        │
│ tanggal_lahir (date) │    │    │ subj_foamy_urine (int4)  │
│ jenis_kelamin (var)  │    │    │ subj_pruritus (int4)     │
│ role (varchar)       │    │    │ subj_fatigue (int4)      │
│ created_at (timestz) │    │    │ subj_edema (int4)        │
│ updated_at (timestz) │    │    │ subj_nocturia (int4)     │
└──────────────────────┘    │    │ subj_dry_mouth (int4)    │
                            │    │ subj_taste_change (int4) │
                            │    │ subj_nail_change (int4)   │
                            │    │ subj_skin_change (int4)   │
                            │    │ subj_sleep_disturb (int4) │
                            │    └──────────────────────────┘
                            │
                            └── Relasi: 1 user → 1 baris screening_data (UPSERT)
```

---

*Dokumentasi ini dibuat pada 12 Juli 2026.*
