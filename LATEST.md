# 📌 RT-FinSmart PRO — Status & Dokumentasi Proyek Terkini (LATEST)

**Terakhir Diperbarui:** 20 September 2026 (01:15 WIB)  
**Versi Rilis Aktif:** `v2.8.9`  
**Entitas:** Rukun Tetangga (RT) 001 / RW 013 – Graha Asri  
**Aplikasi:** RT-FinSmart PRO (Sistem Keuangan, Portal Warga & Manajemen Ronda Eksekutif)  
**Cabang Git (Branch):** `main`  
**Repositori GitHub:** `https://github.com/mydowndrive-ops/WebAppRT001.git`

---

## 🚀 Ringkasan Proyek & Panduan Melanjutkan (Handover Guide)

Dokumen ini dibuat khusus sebagai panduan handover utama (*single source of truth*) agar saat Anda melanjutkan pekerjaan nanti atau besok — atau berpindah perangkat (laptop)/akun — seluruh konteks arsitektur, status pengetesan, dan rencana kerja berikutnya dapat langsung dilanjutkan tanpa hambatan. Seluruh kode sumber terkini telah tersinkronisasi penuh dengan repositori GitHub di cabang `main`.

---

## 🔐 Kredensial & Matriks Akses Pengguna (Role-Based Access Control)

Aplikasi dilengkapi dengan **Portal Login Eksekutif** (*Luxury Glassmorphism*) yang mendukung 4 tingkat peran (*roles*):

| Peran | Nama Akun / Entitas | Hak Akses Utama | Kredensial Masuk | Mode Status |
| :--- | :--- | :--- | :--- | :--- |
| **B1** | **Bendahara 1 (Super Admin)** | Akses Penuh: Dashboard, Matriks Checklist, 6 Pos Anggaran & SHR, Pengeluaran Kas, Data 71 KK, Laporan & Pembukuan, Pengaturan Pos, Kas Jimpitan Ronda, Atur Jadwal Ronda, Pengajuan Dana Warga, Inventaris Aset RT | PIN: `1111` | **Full Read & Write** |
| **B2** | **Bendahara 2 (Koordinator Jimpitan)** | Pengelolaan Uang Jimpitan Ronda (Catat Perolehan Mingguan, Pengeluaran Pos Ronda, Rekap Saldo, Ekspor CSV), Monitoring Inventaris Aset RT, dan Struktur Pengurus | PIN: `2222` | **Limited Read & Write** |
| **PENGURUS** | **Pengurus RT (Ketua, Sekr, Humas)** | Monitoring Dashboard Eksekutif, Struktur & Bagan Organisasi, Jadwal & Susunan 8 Regu Ronda, Inventaris Aset RT, Pemantauan Jimpitan, Verifikasi Usulan Fasum, dan Buku Induk Warga | PIN: `3333` | **Operational Read & Write** |
| **WARGA** | **Warga RT.001 Terverifikasi** | Portal Mandiri Warga (Kartu Iuran 12 Bulan, Kwitansi Digital, Jadwal Ronda Pribadi & Seluruh Regu, Layanan e-Surat, Pengajuan Fasum, Kotak Aspirasi), Bagan Struktur RT, dan Inventaris Aset RT | Password Rumah per KK (112 KK, contoh: `C2B602` untuk Blok B6 No. 02) | **STRICT READ / VIEW ONLY** |

- **Pengunjung Publik / Belum Login**: Otomatis dibatasi dalam mode **READ ONLY** (tidak dapat memodifikasi jadwal ronda, aset, maupun pengajuan dana).
- **Email Bantuan / Lupa PIN:** `rt001rw013.grahaasri@gmail.com`
- **Penyimpanan Sesi:** Menggunakan `sessionStorage` (`RT001_LOGIN_SESSION_V1`). Sesi aktif selama jendela tab terbuka dan akan meminta verifikasi ulang jika pengguna menekan tombol **Keluar (Logout)**.

---

## 🌟 Riwayat Rilis & Pembaruan Terkini (Changelog)

### 1. 🔒 Penegakan Status Read/View-Only Menyeluruh di Dashboard Warga (Update v2.8.9 - 20 Sept 2026)
- **Latar Belakang & Kebutuhan**:
  - Pada pengujian sebelumnya, saat pengguna masuk sebagai Warga dan membuka modul *Struktur Pengurus RT* atau tab *Jadwal & Regu Ronda Malam*, masih tampil tombol **"Atur Jadwal Ronda"** dan tombol **"Edit Regu"** di ke-8 kartu regu ronda, serta tombol **"Tambah Aset"** dan tombol **"Edit/Hapus"** pada modul *Inventaris & Aset RT*.
- **Solusi & Rekayasa DevOps**:
  1. **Helper Otorisasi Terpusat (`isCurrentWarga()`)**:
     - Ditambahkan pada jajaran teratas [app.js](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/app.js).
     - Menghasilkan nilai `true` jika pengguna belum login (`!isLoggedIn()`) atau sedang login dengan akses Warga (`accessLevel === 'WARGA'` atau `currentUser === 'warga'`).
  2. **Penyembunyian Tombol "Atur Jadwal Ronda"**:
     - Tombol `#btn-pengurus-quick-ronda` (hero banner struktur), `#btn-pengurus-modal-ronda` (header tab ronda), `#btn-dash-manage-ronda`, dan `#btn-admin-manage-ronda` disembunyikan otomatis (`style.display = 'none'`) untuk Warga.
  3. **Penghapusan Tombol "Edit Regu" pada 8 Kartu Ronda**:
     - Pada fungsi `renderPengurusRondaPanel()`, jika diakses oleh Warga, tombol `.btn-edit-regu` **tidak lagi dirender**.
     - Warga hanya disajikan tombol pantau dan bagikan yang aman: **"WhatsApp Regu"** dan **"Salin Jadwal"**.
  4. **Benteng Keamanan Fungsi (`openManageRondaModal`)**:
     - Fungsi `openManageRondaModal(weekNum)` dibentengi di baris pertama: jika dipanggil oleh akun Warga, eksekusi langsung dihentikan dan memunculkan toast: *"Akses Dibatasi: Warga hanya memiliki hak akses Lihat/Pantau (Read-Only) untuk Jadwal Ronda."*
  5. **Pengamanan Modul Inventaris & Aset RT (`aset-rt`)**:
     - Tombol `#btn-open-add-aset` ("Tambah Aset Baru") disembunyikan untuk Warga.
     - Pada tampilan Kartu maupun Tabel Inventaris, tombol `.btn-action-edit` dan `.btn-action-delete` digantikan dengan lencana pantau `<span class="badge-tag-cyan"><i class="fa-solid fa-eye"></i> Terdata</span>`.
     - Fungsi `openAddAsetModal()`, `openEditAsetModal()`, dan `deleteAsetItem()` dibentengi di level JavaScript dengan penolakan langsung jika dipanggil oleh Warga.
  6. **Pusat Verifikasi Fasum Warga (`pengurus-tab-panel-verifikasi`)**:
     - Tombol aksi persetujuan (*Setujui* dan *Tolak*) dihilangkan untuk Warga, digantikan dengan status lencana *Tinjauan Warga (Read-Only)*.
  7. **Tombol Administratif Cadangkan Data**:
     - Tombol `#btn-backup-data` di header atas disembunyikan untuk peran Warga.
  8. **Penyelarasan Cache Busting ke `v=2.8.9`**:
     - Berkas [index.html](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/index.html), [app.js](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/app.js), dan [sw.js](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/sw.js) diselaraskan ke `v2.8.9` agar browser dan Service Worker segera memperbarui berkas secara instan.

---

### 2. 🎯 Investigasi Mendalam & Perbaikan Tuntas Tombol Jimpitan (Update v2.8.8 - 19 Sept 2026)
- **Akar Masalah Fundamental**:
  1. **Unclosed Tag `<div class="modal-backdrop" id="modal-add-account">`**:
     - Tag penutup `</div>` pada modal akun hilang sehingga peramban mengurung seluruh modal berikutnya (termasuk `#modal-add-jimpitan-income` dan `#modal-add-jimpitan-expense`) di dalam `#modal-add-account` yang tersembunyi (`display: none`).
  2. **Event Delegation Fallback Jimpitan**:
     - Penangan klik cadangan di `app.js` sempat memiliki klausa `if (btnInc) return;` yang memblokir delegasi.
  3. **Temporal Dead Zone (TDZ) ReferenceError pada `BROADCAST_TEMPLATES`**:
     - `setupPengurusOperationalHub()` membaca `BROADCAST_TEMPLATES` sebelum terdefinisi.
- **Solusi Tuntas yang Telah Diterapkan**:
  - Penambahan tag penutup `</div>` di [index.html](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/index.html) sehingga struktur DOM seimbang 100%.
  - Pengaktifan penangan delegasi ganda di [app.js](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/app.js).
  - Penjagaan deklarasi `BROADCAST_TEMPLATES` agar bebas error TDZ.
  - Pengetesan headless browser (CDP) mengonfirmasi modal Jimpitan terbuka dengan ukuran aktif penuh (731x483px).

---

### 3. 🇮🇩 Banner Bendera Merah Putih & Animasi Split-Text Reveal
- **Video Bendera Asli Tanpa Watermark**: Berkas `redwihite.mp4` dengan resolusi tinggi, dioptimalkan menggunakan FastStart H.264, 100% bebas watermark Shutterstock.
- **Animasi Split-Text Reveal**: Judul utama *"Web Aplikasi Resmi WARGA RT.001 RW.013"* dianimasikan bertahap per huruf (*staggered 30ms*) dengan kurva transisi halus `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Desain Seamless**: Seluruh garis tepi (*border*) telah dihilangkan sepenuhnya untuk integrasi visual tanpa batas.

---

### 4. ⚡ Alur Navigasi Login Instan (Direct Landing)
- Mengatasi masalah pengguna sempat terlempar ke halaman depan saat login; kini login langsung mendaratkan pengguna ke view tujuan sesuai perannya secara instan.

---

### 5. 🪙 Modul Kas Jimpitan Ronda Terintegrasi
- Pencatatan perolehan uang jimpitan malam minggu (koin/pecahan) oleh Bendahara 2 (B2) dan Bendahara 1 (B1).
- Otomatis memperbarui saldo kas jimpitan, mutasi siskamling, dan laporan keuangan publik.

---

### 6. 📊 Dashboard Eksekutif & Visualisasi Ruas Jalan
- Ringkasan arus kas, 6 pos anggaran, dan visualisasi persentase iuran warga terbagi dalam 5 ruas jalan:
  1. `Jl. Citarum II`
  2. `Jl. Citarum IVA`
  3. `Jl. Citarum VIIIB`
  4. `Jl. Citarum VIIIC`
  5. `Jl. Citarum IX`

---

## 📋 Agenda & Rencana Kerja Selanjutnya (Next Steps / To-Do untuk Nanti atau Besok)

Saat Anda kembali untuk menguji atau melanjutkan pengembangan, berikut daftar rencana yang telah disiapkan:

### A. Pengujian Lapangan oleh User (Checklist Verifikasi):
- [ ] **1. Uji Login Warga (Read-Only Verification)**:
  - Buka aplikasi web di peramban, lakukan `Ctrl + F5` (Hard Refresh).
  - Masuk via **Portal Warga** menggunakan password rumah (misal: `C2B602`).
  - Masuk ke menu **Struktur Pengurus RT** -> Buka tab **Jadwal & Regu Ronda Malam**:
    - Periksa apakah tombol **"Atur Jadwal Ronda"** di kanan atas sudah tersembunyi.
    - Periksa apakah tombol **"Edit Regu"** di semua 8 kartu regu sudah hilang (hanya tombol WhatsApp & Salin).
  - Buka menu **Inventaris & Aset RT**:
    - Periksa apakah tombol **"Tambah Aset Baru"** sudah tersembunyi.
    - Periksa apakah tombol **Edit** dan **Hapus** pada tabel/kartu sudah digantikan dengan lencana *Terdata (Read-Only)*.
- [ ] **2. Uji Login Bendahara 2 (B2 - PIN `2222`)**:
  - Masuk via Portal Pengurus dengan PIN `2222`.
  - Klik tombol **"Catat Perolehan Jimpitan"** dan **"Catat Pengeluaran Jimpitan"** -> Pastikan modal form input terbuka mulus dan dapat menyimpan data.
- [ ] **3. Uji Login Bendahara 1 (B1 - PIN `1111`)**:
  - Masuk via Portal Pengurus dengan PIN `1111`.
  - Pastikan tombol **"Atur Jadwal Ronda"** dan **"Edit Regu"** tetap muncul dan dapat digunakan normal oleh Super Admin.

### B. Usulan Peningkatan Fitur Mendatang (Backlog Pengembangan):
- [ ] **1. Ekspor Laporan PDF Formal**:
  - Menambahkan generator PDF kop surat resmi untuk Laporan Bulanan Keuangan dan Berita Acara Aset RT langsung dari browser tanpa perlu dialog print manual.
- [ ] **2. Integrasi Notifikasi Pengingat Ronda Otomatis via WA API**:
  - Fitur pengiriman otomatis jadwal tugas ronda malam minggu ke grup WhatsApp warga pada hari Jumat/Sabtu siang.
- [ ] **3. Backup & Restore Berkas JSON Terenkripsi**:
  - Memperkaya tombol cadangan data dengan opsi unduh berkas `.json` terenkripsi dan fitur impor pemulihan jika berganti perangkat.

---

## 📁 Struktur Berkas Proyek

```
WORKSPACE RT/
├── index.html         # Struktur HTML utama, Portal Publik, Bendera Berkibar, Modal & Views (v2.8.9)
├── styles.css         # Desain tema gelap luxury, animasi bendera, dan layout responsif (v2.8.9)
├── app.js             # Logika aplikasi: RBAC, CRUD Iuran, Jimpitan, Ronda, Security Guards (v2.8.9)
├── manifest.json      # Konfigurasi PWA Mobile
├── sw.js              # Service worker PWA untuk caching dan offline access (v2.8.9)
├── LATEST.md          # Dokumen ringkasan status terkini, checklist pengujian & handover proyek
├── APK_BUILD_GUIDE.md # Panduan konversi Web App menjadi APK Android
└── assets/
    ├── logo.png       # Logo RT resmi dengan sudut rounded elegan
    ├── logo.jpg       # Master logo
    ├── redwihite.mp4  # Video bendera Merah Putih berkibar (watermark-free)
    ├── icon-192.png   # Icon PWA 192x192
    └── icon-512.png   # Icon PWA 512x512
```

---

## 💻 Cara Menjalankan & Melanjutkan di Perangkat Baru

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/mydowndrive-ops/WebAppRT001.git
   cd "WORKSPACE RT"
   ```

2. **Menjalankan Aplikasi Secara Lokal**:
   - Cukup buka berkas `index.html` langsung di browser mana pun (Chrome, Edge, Firefox, Safari).
   - Atau gunakan local server:
     ```bash
     python -m http.server 8080
     ```
     lalu buka `http://localhost:8080` di browser.

3. **Sinkronisasi Kode**:
   - Tarik pembaruan terkini kapan saja:
     ```bash
     git pull origin main
     ```

---

## ⚡ Standar Operasional Pengembang (SOP Sinkronisasi GitHub)

> [!IMPORTANT]
> **SETIAP KALI** selesai melakukan perubahan, perbaikan, atau penambahan fitur:
> 1. **Validasi Sintaks**: `node --check app.js`
> 2. **Commit ke Git lokal**:
>    ```bash
>    git add .
>    git commit -m "feat/fix/docs: deskripsi perubahan"
>    ```
> 3. **Push ke remote GitHub**:
>    ```bash
>    git push origin main
>    ```
> 4. **Perbarui berkas `LATEST.md`** agar seluruh riwayat dan panduan handover selalu up-to-date.
