# 📋 Dokumentasi Aplikasi: Skrining Kesehatan Ginjal

> **Versi:** 2.0.0  
> **Tipe:** Single Page Application (SPA) — Client-side Only  
> **Target Pengguna:** Masyarakat luas, khususnya lansia (≥60 tahun)  
> **Bahasa:** Indonesia  
> **File Utama:** `index.html` + `css/style.css` + `css/dashboard.css` + `js/app.js` + `js/storage.js` + `js/dashboard.js`

---

## 📁 Struktur Folder

```
EPIDEMIC UI/
│
├── index.html          # ★ Struktur halaman (HTML saja, tanpa inline CSS/JS)
├── css/
│   ├── style.css       # ★ Gaya tampilan global (kuesioner, hasil, modal)
│   └── dashboard.css   # ★ Gaya tampilan dashboard & accordion (v2.0)
├── js/
│   ├── storage.js      # ★ localStorage wrapper (v2.0)
│   ├── dashboard.js    # ★ Logika dashboard & konten edukasi (v2.0)
│   └── app.js          # ★ Logika utama (navigasi, kuesioner, scoring)
├── DOKUMENTASI.md      # ★ Dokumentasi ini
├── README.md
└── github_code.md
```

---

## 🧩 Fitur Aplikasi

| # | Fitur | Status |
|---|-------|--------|
| 1 | Halaman Beranda (sambutan + penjelasan) | ✅ Selesai |
| 2 | Kuesioner 10 pertanyaan skala 0-3 | ✅ Selesai |
| 3 | Progress bar (1/10 → 10/10) | ✅ Selesai |
| 4 | Navigasi "Kembali" & "Selanjutnya" | ✅ Selesai |
| 5 | Validasi jawaban (tombol disabled jika belum diisi) | ✅ Selesai |
| 6 | Modal konfirmasi sebelum hasil | ✅ Selesai |
| 7 | Penilaian otomatis 3 kategori | ✅ Selesai |
| 8 | Tips spesifik per kategori (5 tips masing-masing) | ✅ Selesai |
| 9 | Tombol "Kembali ke Beranda/Dashboard" | ✅ Selesai |
| 10 | Desain ramah lansia (font ≥20px, tombol ≥56px) | ✅ Selesai |
| 11 | Responsif (desktop, tablet, mobile) | ✅ Selesai |
| 12 | Aksesibilitas (semantic HTML, aria-*, focus management) | ✅ Selesai |
| 13 | **Dashboard 3 area (Status, Kuesioner, Tips)** | ✅ **v2.0** |
| 14 | **localStorage — data tahan refresh** | ✅ **v2.0** |
| 15 | **Tab navigasi (Dashboard / Riwayat / Profil)** | ✅ **v2.0** |
| 16 | **Tips edukasi expandable (accordion)** | ✅ **v2.0** |
| 17 | **Konten edukasi 4 kategori kesehatan ginjal** | ✅ **v2.0** |
| 18 | **Partial save kuesioner** | ✅ **v2.0** |

---

## 🏗️ Arsitektur Aplikasi

### State Management (JavaScript)

```javascript
const state = {
    currentPage: 'home',        // 'home' | 'dashboard' | 'questionnaire' | 'result'
    currentQuestion: 0,         // index pertanyaan (0-9)
    answers: [null, null, ...]  // array 10 nilai jawaban (0-3)
};
```

### Alur Navigasi (v2.0)

```
[Beranda] ◀── (pengguna baru) ──▶ [Dashboard] ◀── (pengguna lama) ──▶ [Tab: Riwayat/Profil]
    │                                      │
    │ "Mulai Kuesioner"                    │ "Mulai / Isi Ulang / Lanjutkan"
    ▼                                      ▼
[Kuesioner Q1..Q10] ◀── "Kembali" ──▶ [Kuesioner Q1..Q10]
    │                                      │
    └──"Selanjutnya"──▶ (setelah Q10)  ◀───┘
                               │
                               ▼
                       [Modal Konfirmasi]
                        /              \
                  "Kembali"      "Ya, Tampilkan Hasil"
                       │              │
                       ▼              ▼
                  [Kuesioner]    [Halaman Hasil]
                                      │
                              "Kembali ke Dashboard"
                                      │
                                      ▼
                                 [Dashboard]
```

### File-File Baru (v2.0)

| File | Tugas |
|------|-------|
| `js/storage.js` | Wrapper localStorage — simpan/ambil hasil skrining & partial kuesioner |
| `js/dashboard.js` | Dashboard manager — render status, kuesioner, tips accordion |
| `css/dashboard.css` | Gaya dashboard, kartu, navigasi tab, accordion, responsif |

### Fungsi-Fungsi Utama (JavaScript)

| Fungsi | File | Tugas |
|--------|------|-------|
| `showPage(pageName)` | app.js | Pindah halaman (home/dashboard/questionnaire/result) |
| `renderNavButtons()` | app.js | Render tombol navigasi sesuai halaman aktif |
| `startQuestionnaire()` | app.js | Mulai kuesioner baru (reset + clear partial) |
| `resumeQuestionnaire()` | app.js | Lanjutkan kuesioner dari partial save |
| `showLastResult()` | app.js | Tampilkan hasil skrining terakhir dari localStorage |
| `renderQuestion()` | app.js | Tampilkan pertanyaan + opsi jawaban |
| `updateProgress()` | app.js | Update progress bar (persentase & teks) |
| `prevQuestion()` | app.js | Pindah ke pertanyaan sebelumnya |
| `nextQuestion()` | app.js | Simpan jawaban → partial save → pindah / modal |
| `hitungSkor()` | app.js | Jumlahkan semua nilai jawaban |
| `tentukanStatus(skor)` | app.js | Tentukan kategori berdasarkan skor |
| `showResult()` | app.js | Hitung skor + save ke localStorage + tampilkan hasil |
| `restartApp()` | app.js | Reset state + kembali ke dashboard/beranda |
| `saveScreeningResult()` | storage.js | Simpan hasil skrining ke localStorage |
| `getLatestScreening()` | storage.js | Ambil hasil skrining terakhir |
| `savePartialQuestionnaire()` | storage.js | Simpan progress kuesioner parsial |
| `DashboardManager.init()` | dashboard.js | Inisialisasi dashboard (render semua kartu) |

---

## 📝 Data Pertanyaan

### 10 Pertanyaan Skrining

| # | Pertanyaan |
|---|-----------|
| 1 | Seberapa sering Anda merasa mudah lelah tanpa sebab yang jelas? |
| 2 | Seberapa sering Anda mengalami pembengkakan di kaki atau pergelangan kaki? |
| 3 | Seberapa sering urine (air kencing) Anda berbusa atau tampak berbuih? |
| 4 | Seberapa sering Anda buang air kecil di malam hari (lebih dari 2 kali)? |
| 5 | Seberapa sering Anda merasakan nyeri atau pegal di bagian pinggang belakang? |
| 6 | Seberapa sering Anda mengalami penurunan nafsu makan? |
| 7 | Seberapa sering Anda merasa gatal-gatal pada kulit tanpa sebab yang jelas? |
| 8 | Seberapa sering Anda mengalami sesak napas setelah melakukan aktivitas ringan? |
| 9 | Seberapa sering Anda merasa mual atau ingin muntah? |
| 10 | Apakah Anda memiliki riwayat tekanan darah tinggi (hipertensi)? |

### Opsi Jawaban (Skala)

| Opsi | Nilai | Keterangan |
|------|:-----:|------------|
| Tidak Pernah | 0 | Tidak pernah mengalami |
| Kadang-kadang | 1 | Jarang, beberapa kali dalam sebulan |
| Sering | 2 | Beberapa kali dalam seminggu |
| Sangat Sering | 3 | Hampir setiap hari |

---

## 📊 Sistem Penilaian

### Rumus Skor

```
Skor Total = jumlah dari seluruh nilai jawaban (0-3 per pertanyaan)
           = minimal 0, maksimal 30
```

### Kategori Status

| Rentang Skor | Status | Icon | Warna Badge |
|:------------:|--------|:----:|:-----------:|
| 0 – 5 | ✅ **Sehat / Normal** | ✅ | Hijau (`#28a745`) |
| 6 – 12 | ⚠️ **Waspada / Risiko Ringan** | ⚠️ | Kuning (`#ffc107`) |
| 13 – 30 | 🔴 **Konsultasi / Risiko Tinggi** | 🔴 | Merah (`#dc3545`) |

---

## 💡 Tips Kesehatan (5 Tips per Kategori)

### ✅ Sehat / Normal (Skor 0-5)

1. **Pertahankan pola makan rendah garam** — batasi konsumsi garam maksimal 1 sendok teh (5 gram) per hari untuk menjaga tekanan darah tetap stabil.
2. **Minum air putih minimal 8 gelas** (sekitar 2 liter) setiap hari, kecuali ada kondisi khusus yang membatasi asupan cairan.
3. **Rutin memeriksakan tekanan darah** minimal sebulan sekali, karena hipertensi adalah salah satu faktor risiko utama penyakit ginjal.
4. **Hindari konsumsi obat pereda nyeri golongan NSAID** (seperti ibuprofen) secara berlebihan, karena dapat memengaruhi fungsi ginjal dalam jangka panjang.
5. **Lakukan aktivitas fisik ringan** seperti jalan kaki selama 30 menit setiap hari untuk menjaga sirkulasi darah tetap lancar.

### ⚠️ Waspada / Risiko Ringan (Skor 6-12)

1. **Kurangi konsumsi protein hewani** (daging merah, unggas, telur) dan makanan olahan (sosis, nugget, makanan kaleng) karena membebani kerja ginjal.
2. **Perbanyak konsumsi buah dan sayur segar** — terutama yang rendah kalium seperti apel, anggur, kol, dan mentimun.
3. **Segera periksakan gula darah dan tekanan darah** secara rutin minimal 2 minggu sekali untuk memantau kondisi tubuh.
4. **Batasi konsumsi makanan tinggi garam** seperti keripik, mie instan, dan acar. Gunakan bumbu alami sebagai pengganti garam.
5. **Hindari minuman beralkohol dan kurangi minuman berkafein** (kopi, teh kental) karena dapat memengaruhi tekanan darah dan hidrasi tubuh.

### 🔴 Konsultasi / Risiko Tinggi (Skor 13-30)

1. **Segera konsultasikan ke dokter spesialis ginjal (nefrologi)** dalam waktu 1–2 minggu untuk pemeriksaan lebih lanjut seperti tes darah (kreatinin, ureum) dan tes urine.
2. **Hindari konsumsi obat-obatan bebas** terutama golongan NSAID (seperti aspirin, ibuprofen, diklofenak) karena dapat memperburuk kerusakan ginjal.
3. **Batasi asupan makanan tinggi kalium** (pisang, jeruk, kentang, tomat, bayam) **dan tinggi fosfor** (keju, susu, kacang-kacangan, minuman bersoda) — konsultasikan dengan dokter mengenai batas aman untuk Anda.
4. **Pantau jumlah urine setiap hari** — jika volume urine berkurang drastis atau justru berlebihan di malam hari, segera laporkan ke dokter.
5. **Jangan menunda pemeriksaan** meskipun merasa tidak ada keluhan berarti. Deteksi dan penanganan dini sangat penting untuk memperlambat perkembangan penyakit ginjal.

---

## 🎨 Panduan Desain (Elderly-Friendly)

### Warna

```css
/* Tema Utama: Biru & Putih */
--biru-gelap:    #0a5c8a;   /* Header, judul */
--biru-medium:   #1a7fc4;   /* Tombol utama, aksen */
--biru-terang:   #2a9df4;   /* Gradien, hover */
--putih:         #ffffff;    /* Background kontainer */
--krem:          #f7fafc;    /* Background tips */
--teks-utama:    #1a1a2e;   /* Warna teks (hitam kebiruan) */
--teks-secondary:#718096;    /* Teks pendukung */
--latar-belakang:#e8f4fd;    /* Background body */
```

### Tipografi

- **Font size minimal:** 20px (`html { font-size: 20px }`)
- **Font:** `'Segoe UI', 'Roboto', 'Arial', sans-serif`
- **Berat font:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Tombol

- **Min-height:** 56px (≥50px sesuai requirements)
- **Min-width:** 160px (140px di tablet, 120px di mobile)
- **Border-radius:** 14px
- **Padding:** 12px 36px
- **Font-size:** 1.05rem (~21px)
- **Font-weight:** 700 (bold)
- **Efek:** Hover → translateY(-2px), Active → translateY(0)

### Layout

- **Max-width kontainer:** 800px
- **Border-radius kontainer:** 24px
- **Gap antar elemen:** 12-16px
- **Padding dalam kontainer:** 32px

### Aksesibilitas

- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`
- `role="application"`, `role="radiogroup"`, `role="dialog"`, `role="progressbar"`
- `aria-label`, `aria-labelledby`, `aria-modal`, `aria-valuenow`
- `aria-hidden="true"` untuk elemen dekoratif
- `label` dengan `for` pada radio buttons
- `focus-visible` outline pada tombol
- Fokus terkelola saat pindah halaman

### Responsive Breakpoints

| Device | Max-width | Perubahan |
|--------|:---------:|-----------|
| Mobile kecil | 400px | Font 18px, tombol full-width, nav vertikal |
| Mobile/Tablet | 600px | Padding dikurangi, modal full-width |
| Desktop | >600px | Layout normal |

---

## 🧪 Skenario Testing

### Test Case 1: Sehat / Normal

| Langkah | Tindakan | Hasil Diharapkan |
|---------|----------|------------------|
| 1 | Buka `index.html` | Halaman Beranda tampil |
| 2 | Klik "Mulai Kuesioner" | Pertanyaan 1 tampil, progress 10% |
| 3 | Jawab semua "Tidak Pernah" (nilai 0) | Skor = 0 |
| 4 | Klik "Selanjutnya" di Q10 | Modal konfirmasi muncul |
| 5 | Klik "Ya, Tampilkan Hasil" | Status: "Sehat / Normal" ✅ |

### Test Case 2: Waspada / Risiko Ringan

| Langkah | Tindakan | Hasil Diharapkan |
|---------|----------|------------------|
| 1 | Jawab: Q1=Kadang(1), Q2=Kadang(1), Q3=Sering(2), Q4=Kadang(1), Q5=Sering(2), Q6=Tidak(0), Q7=Kadang(1), Q8=Tidak(0), Q9=Tidak(0), Q10=Kadang(1) | Skor = 9 |
| 2 | Lanjut ke hasil | Status: "Waspada / Risiko Ringan" ⚠️ |

### Test Case 3: Konsultasi / Risiko Tinggi

| Langkah | Tindakan | Hasil Diharapkan |
|---------|----------|------------------|
| 1 | Jawab semua "Sangat Sering" (nilai 3) | Skor = 30 |
| 2 | Lanjut ke hasil | Status: "Konsultasi / Risiko Tinggi" 🔴 |

### Test Case 4: Navigasi & UX

| Langkah | Tindakan | Hasil Diharapkan |
|---------|----------|------------------|
| 1 | Jangan pilih jawaban | Tombol "Selanjutnya" disabled |
| 2 | Klik "Kembali" dari Q2 | Kembali ke Q1, jawaban tetap tersimpan |
| 3 | Di modal, klik "Kembali" | Kembali ke kuesioner |
| 4 | Di hasil, klik "Kembali ke Beranda" | Kembali ke beranda, semua reset |
| 5 | Tekan tombol Escape di modal | Modal tertutup |

---

## 🚀 Cara Menjalankan

### Prasyarat
- Browser modern (Chrome, Firefox, Edge, Safari)
- Tidak perlu server — langsung buka file

### Langkah
1. Buka Windows Explorer
2. Navigasi ke folder `EPIDEMIC UI`
3. Double klik `index.html`
4. Atau drag & drop file ke browser

### Catatan
- Tidak perlu koneksi internet
- Tidak perlu install apa-apa
- ✅ Data skrining tersimpan di **localStorage** — tidak hilang saat refresh atau ditutup
- Untuk menghapus data: buka DevTools → Application → Local Storage → hapus key `ginjal_screenings`
- Atau panggil `clearAllData()` di console browser

---

## 🔮 Rencana Pengembangan ke Depan

### ✅ Sudah Tercapai (v2.0)
- [x] Pisahkan CSS ke file `css/style.css` ✅ (v1.1)
- [x] Pisahkan JS ke file `js/app.js` ✅ (v1.1)
- [x] Tambah `localStorage` agar jawaban tidak hilang saat refresh ✅ (v2.0)
- [x] Dashboard 3 area (Status, Kuesioner, Tips) ✅ (v2.0)
- [x] Navigasi tab (Dashboard / Riwayat / Profil) ✅ (v2.0)
- [x] Tips edukasi expandable (accordion) ✅ (v2.0)
- [x] Partial save kuesioner ✅ (v2.0)

### Jangka Pendek (v2.1)
- [ ] Halaman riwayat hasil skrining (Riwayat tab)
- [ ] Grafik perkembangan skor dari waktu ke waktu
- [ ] Ekspor hasil ke PDF
- [ ] Fitur profil pengguna

### Jangka Menengah (v2.2+)
- [ ] PWA (Progressive Web App) — bisa di-install di HP
- [ ] Dark mode
- [ ] Pengingat skrining berkala

### Jangka Panjang (butuh Backend + Database)
- [ ] Backend menggunakan Node.js atau Python
- [ ] Database MySQL / SQLite / Supabase untuk menyimpan data user
- [ ] Fitur login/register
- [ ] Dashboard admin untuk melihat data agregat

---

## 📚 Istilah Penting (untuk Pemula)

| Istilah | Arti | Contoh di Aplikasi |
|---------|------|-------------------|
| **Frontend** | Bagian aplikasi yang dilihat user | HTML, CSS, JavaScript di `index.html` |
| **Backend** | Logika di server yang tidak terlihat user | Belum ada di aplikasi ini |
| **Database** | Tempat penyimpanan data terstruktur | Belum ada (masih di memori sementara) |
| **localStorage** | Penyimpanan kecil di browser | Rencana: untuk simpan jawaban |
| **SPA** (Single Page Application) | Aplikasi satu halaman, tidak reload | Aplikasi ini |
| **API** | Jembatan komunikasi antar aplikasi | Belum ada |
| **CSS** | Bahasa untuk styling tampilan | Warna, ukuran, layout |
| **JavaScript** | Bahasa untuk logika & interaksi | Navigasi, scoring, modal |
| **HTML** | Bahasa untuk struktur halaman | Header, konten, tombol |
| **Responsif** | Tampilan menyesuaikan ukuran layar | Desktop → Tablet → HP |

---

## 📞 Kontak & Informasi

**Dibuat oleh:** GitHub Copilot (DeepSeek V4 Flash)  
**Tanggal:** 2026-07-07  
**Framework:** Vanilla JavaScript (tanpa library/framework)  
**Versi:** 2.0.0 — Multi-file dengan Dashboard + localStorage  

---

> ⚠️ **DISCLAIMER**  
> Aplikasi ini hanya memberikan indikasi awal dan bukan merupakan diagnosis medis.  
> Hasil skrining tidak menggantikan konsultasi langsung dengan tenaga kesehatan profesional.  
> Jika Anda memiliki keluhan atau kekhawatiran tentang kesehatan ginjal, segera konsultasikan ke dokter.
