# SOP Wajib: Sinkronisasi Otomatis GitHub, Data Master Lokal, dan LATEST.md

Setiap kali asisten melakukan perubahan data, penambahan fitur, perbaikan bug, atau modifikasi kode (HTML, CSS, JS, API backend, konfigurasi, aset, maupun data warga/aset/keuangan):

## 1. Sinkronisasi Data & Cadangan Folder Master Lokal (`data/`)
- Setiap kali ada modifikasi data atau struktur operasional (Warga, Aset RT, Iuran, Jimpitan, Agenda):
  - Pastikan database Supabase Cloud terupdate.
  - Perbarui/sinkronkan snapshot file JSON di folder `data/` (`warga_master.json`, `aset_master.json`, `iuran_master.json`, `jimpitan_master.json`, `agenda_master.json`).
  - Aplikasi web dan alur kerja harus 100% mandiri tanpa ketergantungan pada Google Drive / Google Sheets.

## 2. Pembaruan Wajib `LATEST.md`
- Selalu perbarui stempel waktu terkini (Tanggal & Jam WIB) serta versi rilis aktif (`v2.9.xx`).
- Tambahkan entri riwayat rilis / changelog yang jelas, rapi, dan terstruktur mengenai perubahan yang baru saja dilakukan.

## 3. Otomatis Commit & Push ke GitHub (`origin/main`) Tanpa Menunggu Perintah
- Segera jalankan alur Git secara otomatis:
  ```bash
  git add .
  git commit -m "<tipe>(<lingkup>): <deskripsi perubahan>"
  git push origin main
  ```
- **JANGAN PERNAH** menunda atau menunggu perintah tambahan dari pengguna untuk melakukan commit dan push ke GitHub.
- **Tujuan Utama**: Menjamin repositori GitHub selalu dalam keadaan paling mutakhir (*fresh*), sehingga pengguna dapat langsung melanjutkan pengembangan dari laptop/PC lain kapan saja dengan `git clone` atau `git pull` tanpa perlu login ke Google Drive.
