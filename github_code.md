```markdown
# 📘 Git & GitHub Cheatsheet

> Panduan lengkap perintah Git dari awal sampai akhir untuk proyek Skrining Kesehatan Ginjal.
> Simpan file ini di root proyek sebagai `GIT-CHEATSHEET.md` untuk referensi cepat.

---

## 🚀 KONFIGURASI AWAL (Hanya Sekali)

```bash
# Set nama dan email (wajib!)
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"

# Inisialisasi Git di folder proyek
git init

# Hubungkan dengan repository GitHub
git remote add origin https://github.com/username/repo.git

# (Opsional) Cek apakah remote sudah terhubung
git remote -v
```

---

## 📥 PERTAMA KALI BUKA PROYEK DI LAPTOP BARU

```bash
# Clone (download) repository dari GitHub
git clone https://github.com/username/repo.git

# Masuk ke folder proyek
cd nama-folder-proyek
```

---

## 🔄 WORKFLOW HARIAN (Yang Paling Sering Dipakai)

```bash
# 1. Ambil update terbaru sebelum mulai ngedit
git pull

# 2. Edit file-file yang dibutuhkan (di VS Code, dll)

# 3. Cek perubahan apa saja yang terjadi
git status

# 4. Tambahkan semua file ke staging (keranjang)
git add .

# 5. Atau tambahkan file tertentu saja
git add index.html
git add css/style.css
git add js/app.js

# 6. Buat commit (catatan perubahan)
git commit -m "Pesan perubahan yang jelas"

# 7. Kirim ke GitHub
git push
```

---

## 📋 PERINTAH STATUS & INFORMASI

```bash
# Cek status file (modified, staged, untracked)
git status

# Lihat riwayat commit (versi singkat)
git log --oneline

# Lihat riwayat commit (versi lengkap)
git log

# Lihat perbedaan antara file lokal dan commit terakhir
git diff

# Lihat perbedaan file tertentu
git diff index.html

# Cek URL remote repository
git remote -v
```

---

## 🔧 MEMBATALKAN PERUBAHAN (Undo)

```bash
# 1. BELUM di-add (masih di working directory)
# Kembalikan file ke versi commit terakhir
git checkout -- nama_file.html
# atau (versi Git terbaru)
git restore nama_file.html

# 2. SUDAH di-add (ada di staging)
# Keluarkan dari staging (tapi perubahan tetap ada)
git restore --staged nama_file.html

# 3. SUDAH di-add, mau hapus semua perubahan (⚠️ hati-hati!)
git restore --staged .
git checkout -- .
# atau satu perintah
git restore .

# 4. SUDAH di-commit (belum di-push)
# Ubah commit terakhir (amend)
git commit --amend -m "Pesan baru"

# 5. SUDAH di-commit (belum di-push) - hapus commit terakhir
git reset --soft HEAD~1   # Hapus commit, perubahan tetap di staging
git reset --hard HEAD~1   # Hapus commit, perubahan hilang (⚠️ hati-hati!)

# 6. SUDAH di-push ke GitHub
# Hati-hati! Lebih baik buat commit baru untuk membatalkan
git revert HEAD           # Buat commit baru yang membatalkan commit terakhir
git push                  # Push commit revert
```

---

## 🚨 MENGATASI KONFLIK (Conflict)

```bash
# 1. Saat git pull, muncul konflik
git pull

# 2. Buka file yang bermasalah (ada tanda <<<<<<<, =======, >>>>>>>)
# Edit file: pilih versi yang benar atau gabungkan keduanya

# 3. Setelah selesai edit, tandai sebagai selesai
git add nama_file_bermasalah.html

# 4. Lanjutkan proses merge
git commit -m "Resolve conflict"

# 5. Push hasilnya
git push
```

---

## 🌿 BRANCH (Cabang)

```bash
# Lihat semua branch (local)
git branch

# Lihat semua branch (local + remote)
git branch -a

# Buat branch baru
git checkout -b nama-branch-baru

# Pindah ke branch lain
git checkout nama-branch

# Gabungkan branch lain ke branch saat ini
git merge nama-branch-lain

# Hapus branch (sudah digabung)
git branch -d nama-branch

# Hapus branch (paksa, meskipun belum digabung)
git branch -D nama-branch

# Kirim branch baru ke GitHub
git push -u origin nama-branch-baru
```

---

## 🗑️ MENGHAPUS FILE

```bash
# Hapus file dari Git dan filesystem
git rm nama_file.html
git commit -m "Hapus file"
git push

# Hapus file dari Git tapi tetap di filesystem (berhenti dilacak)
git rm --cached nama_file.html
git commit -m "Berhenti melacak file"
git push
```

---

## 📦 STASH (Menyimpan Perubahan Sementara)

```bash
# Simpan perubahan sementara (belum siap commit)
git stash

# Simpan dengan pesan
git stash save "Pesan stash"

# Lihat daftar stash
git stash list

# Kembalikan stash terakhir dan hapus dari stash
git stash pop

# Kembalikan stash terakhir (tetap di stash)
git stash apply

# Hapus stash terakhir
git stash drop

# Hapus semua stash
git stash clear
```

---

## 🔄 RESET KE VERSI TERTENTU

```bash
# Reset ke commit tertentu (soft - perubahan tetap ada)
git reset --soft <commit-hash>

# Reset ke commit tertentu (hard - perubahan hilang ⚠️)
git reset --hard <commit-hash>

# Reset ke versi remote (kembalikan ke GitHub)
git fetch origin
git reset --hard origin/main
```

---

## 🎯 REBASE (Mengubah History)

```bash
# Rebase branch saat ini ke branch lain
git rebase main

# Rebase interaktif (untuk menggabungkan commit)
git rebase -i HEAD~3   # Gabungkan 3 commit terakhir

# Batalkan rebase
git rebase --abort
```

---

## 🔑 PERSONAL ACCESS TOKEN (PAT) - Jika Password Tidak Bisa

```bash
# 1. Buka GitHub → Settings → Developer settings → Personal access tokens
# 2. Generate new token → centang 'repo' → Generate
# 3. Copy token (simpan, hanya muncul sekali)
# 4. Saat git push, username = username GitHub, password = token PAT
```

---

## 🐛 TROUBLESHOOTING

```bash
# Error: "fatal: not a git repository"
# Solusi: Jalankan di folder yang benar, atau git init

# Error: "remote origin already exists"
# Solusi: Ganti URL remote
git remote set-url origin https://github.com/username/repo.git

# Error: "rejected non-fast-forward"
# Solusi: Pull dulu, selesaikan konflik, lalu push lagi
git pull origin main
# ... selesaikan konflik ...
git push origin main

# Error: "src refspec main does not match any"
# Solusi: Branch utama mungkin 'master', bukan 'main'
git push -u origin master

# Error: "Authentication failed"
# Solusi: Gunakan Personal Access Token, bukan password biasa

# Error: "Permission denied (publickey)"
# Solusi: Ganti URL remote dari SSH ke HTTPS
git remote set-url origin https://github.com/username/repo.git
```

---

## 🖥️ VS CODE - SOURCE CONTROL PANEL (UI)

```bash
# Buka Source Control Panel: Ctrl+Shift+G (Windows) / Cmd+Shift+G (Mac)

┌─────────────────────────────────────────────────────┐
│  📂 SOURCE CONTROL (Ctrl+Shift+G)                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [✔]  Changes (file yang diubah)                   │
│  ├── index.html                                    │
│  └── css/style.css                                 │
│                                                     │
│  [✔]  Staged Changes (file di keranjang)           │
│  └── js/app.js                                     │
│                                                     │
│  [📝 Pesan commit]                                 │
│  [  Commit  ]  [  ...  ]                           │
│                                                     │
│  [↻] Sync Changes (pull + push)                   │
│  [↓] Pull                                          │
│  [↑] Push                                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### VS Code Source Control: Tindakan

```bash
| Situasi | Perintah (Terminal) | VS Code (Tombol) |
|---------|---------------------|------------------|
| Tambahkan semua file ke staging | `git add .` | Klik `+` (Stage All) |
| Keluarkan dari staging | `git reset` | Klik `-` (Unstage All) |
| Hapus semua perubahan (⚠️) | `git restore .` | Klik `Discard All Changes` |
| Commit | `git commit -m "pesan"` | Tulis pesan → klik `✔️` |
| Pull (ambil update) | `git pull` | Klik `↓` (Pull) |
| Push (kirim ke GitHub) | `git push` | Klik `↑` (Push) |
| Sync (pull + push) | `git pull && git push` | Klik `↻` (Sync) |
```

---

## 📋 RINGKASAN SITUASI & PERINTAH

```bash
| Situasi | Perintah / Tindakan |
|---------|----------------------|
| Pertama kali buka proyek di laptop baru | `git clone https://github.com/username/repo.git` |
| Mau mulai ngedit | `git pull` (ambil update terbaru) |
| Cuma ngecek file apa aja yang berubah | `git status` |
| File tambahan (baru) muncul, tambahkan ke tracking | `git add nama_file_baru.html` |
| Semua selesai, mau simpan ke cloud | `git add .` → `git commit -m "pesan"` → `git push` |
| Lupa `git pull`, terus `git push` ditolak | `git pull` (selesaikan konflik) → `git push` |
| Batalin perubahan file (kembalikan ke versi commit) | `git checkout -- nama_file.html` |
| File sudah di-add, mau batalin dari staging | `git restore --staged nama_file.html` |
| Sudah commit, tapi belum push, mau ubah pesan | `git commit --amend -m "Pesan baru"` |
| Sudah commit, belum push, mau tambah file ke commit | `git add file_baru.html` → `git commit --amend` |
| Mau batalkan commit terakhir (belum push) | `git reset --soft HEAD~1` (perubahan tetap ada) |
| Mau batalkan commit terakhir yang sudah push | `git revert HEAD` → `git push` |
| Mau hapus semua perubahan lokal (⚠️ hati-hati) | `git restore .` |
| Mau ambil versi dari GitHub (timpa lokal) | `git fetch origin` → `git reset --hard origin/main` |
| Mau buat branch baru | `git checkout -b nama-branch` |
| Mau pindah branch | `git checkout nama-branch` |
| Mau gabung branch | `git checkout main` → `git merge nama-branch` |
| Mau simpan perubahan sementara (belum commit) | `git stash` |
| Mau ambil stash yang disimpan | `git stash pop` |

---

## 🎯 COMMIT MESSAGE CONVENTION (Panduan)

```bash
# Baik: Deskriptif dan jelas
git commit -m "Menambahkan integrasi Supabase untuk menyimpan hasil skrining"
git commit -m "Memperbaiki bug navigasi pada halaman kuesioner"
git commit -m "Mengupdate desain dashboard agar lebih ramah lansia"

# Kurang baik (terlalu singkat)
git commit -m "update"
git commit -m "fix"
git commit -m "perbaikan"

# Format yang disarankan:
# [Jenis] Deskripsi singkat
git commit -m "feat: Tambah dashboard user"
git commit -m "fix: Perbaiki progress bar"
git commit -m "style: Update warna tombol"
git commit -m "docs: Update dokumentasi"
```

---

## 🔗 URL GITHUB YANG BERGUNA

```bash
| Tujuan | URL |
|--------|-----|
| Repository | `https://github.com/username/repo` |
| GitHub Pages | `https://username.github.io/repo/` |
| Actions (Build) | `https://github.com/username/repo/actions` |
| Settings Pages | `https://github.com/username/repo/settings/pages` |
| Commits | `https://github.com/username/repo/commits/main` |
| Branches | `https://github.com/username/repo/branches` |
```

---

## 💾 .gitignore (File yang Tidak Perlu di-Git)

```bash
# Buat file .gitignore di root proyek

# VS Code
.vscode/
*.code-workspace

# Sistem Operasi
.DS_Store
Thumbs.db

# Environment / Secret
.env
*.env

# Node / NPM
node_modules/
package-lock.json

# Log
*.log

# Backup
*.bak
*.tmp

# File rahasia (jangan pernah commit!)
secrets.json
config.local.js
```

---

## ✅ CHECKLIST SETELAH PUSH KE GITHUB

```bash
1. git status                    # Pastikan "nothing to commit, working tree clean"
2. git log --oneline -3          # Cek commit terakhir
3. git push origin main          # Pastikan sudah terkirim
4. Buka GitHub di browser        # Cek repo sudah update
5. Jika pakai GitHub Pages       # Tunggu 2-3 menit, lalu cek link
6. Hard refresh browser          # Ctrl+Shift+R untuk menghilangkan cache
```

---

## 🚨 TIPS KEAMANAN

```bash
# JANGAN PERNAH commit file yang mengandung:
# - Password
# - API Keys (seperti Supabase anon key)
# - Token akses
# - Data pribadi pengguna

# Gunakan environment variables atau file terpisah yang di .gitignore
# Untuk Supabase, anon key boleh di frontend (publik), tapi service_role key JANGAN!
```

---

## 📚 REFERENSI CEPAT

```bash
# 3 Perintah Paling Sering Dipakai:
git pull   # Ambil update
git add . && git commit -m "pesan" && git push   # Kirim update
git status # Cek kondisi

# 3 Perintah Paling Berbahaya (Hati-hati!):
git reset --hard HEAD~1   # Hapus commit terakhir (perubahan hilang)
git push --force          # Timpa remote (bisa merusak kolaborasi)
git clean -fd             # Hapus file untracked (permanen!)
```

---

**📌 Dibuat untuk:** Aplikasi Skrining Kesehatan Ginjal  
**📅 Tanggal:** 2026-07-08  
**💻 VS Code Shortcut:** `Ctrl+Shift+G` (Source Control Panel)
```