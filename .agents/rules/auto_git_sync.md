# Aturan Wajib: Otomatis Update LATEST.md & Sinkronisasi GitHub

Setiap kali asisten selesai melakukan perubahan atau modifikasi kode (HTML, CSS, JS, API backend, konfigurasi, aset, dsb.):

1. **SEGERA PERBARUI `LATEST.md`**:
   - Selalu perbarui stempel waktu terkini (Tanggal & Jam WIB) serta versi rilis aktif.
   - Cantumkan rangkuman perubahan, komponen yang dimodifikasi, dan status verifikasi terkini ke dalam riwayat rilis / changelog `LATEST.md`.

2. **SEGERA SINKRONKAN KE GITHUB TANPA MENUNGGU PERINTAH LAGI**:
   - Jalankan `git add <berkas>`, buat commit deskriptif yang rapi (`git commit -m "..."`), dan langsung lakukan push ke remote (`git push origin main`).
   - Jangan pernah menunda atau menunggu konfirmasi/perintah tambahan dari pengguna untuk melakukan commit dan push.
