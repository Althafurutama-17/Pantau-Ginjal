Situasi	Perintah / Tindakan
Pertama kali buka proyek di laptop baru	git clone https://github.com/username/repo.git
Mau mulai ngedit	git pull (ambil update terbaru)
Sudah selesai ngedit, mau simpan ke cloud	git add . → git commit -m "pesan" → git push    
Cuma ngecek file apa aja yang berubah	git status
Batalin perubahan (kembalikan ke versi terakhir commit)	git checkout -- nama_file.html
Lupa git pull, terus git push ditolak	git pull (selesaikan konflik jika ada) → git push lagi
Pengen ubah pesan commit terakhir	git commit --amend -m "Pesan baru"


# ===== KONFIGURASI AWAL (Hanya Sekali) =====
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"
git init
git remote add origin https://github.com/username/repo.git

# ===== SETIAP KALI MAU NGERJAIN =====
git pull                              # Ambil update terbaru

# ===== SETELAH SELESAI NGERJAIN =====
git add .                             # Tandai semua file
git commit -m "Pesan perubahan"       # Buat catatan
git push                              # Kirim ke GitHub

# ===== PERINTAH LAIN =====
Udah Add, belum Commit, mau ubah	Edit file → git add . (timpa versi lama di staging)
Udah Add, mau batalin (keluarin dari staging)	git restore --staged <nama_file>
Udah Commit, belum Push, mau ubah (biar gabung)	Edit → git add . → git commit --amend -m "pesan"
Udah Commit, belum Push, mau ubah (biar beda commit)	Edit → git add . → git commit -m "pesan baru"
Udah Commit & Push, mau ubah	Edit → git add . → git commit -m "pesan baru" → git push

# ===== PERINTAH BANTUAN =====
git status                            # Cek perubahan
git log --oneline                     # Lihat riwayat commit
git remote -v                         # Cek URL repo

Masukkan semua ke keranjang	git add .	Klik + (Stage All)
Keluarkan semua dari keranjang	git reset	Klik - (Unstage All)
Hapus semua perubahan (kode hilang!)	git restore .	Klik Discard All Changes (⚠️ hati-hati!)