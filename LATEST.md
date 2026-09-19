# 📌 RT-FinSmart PRO — Status & Dokumentasi Proyek Terkini (LATEST)

**Terakhir Diperbarui:** 19 September 2026  
**Entitas:** Rukun Tetangga (RT) 001 / RW 013 – Graha Asri  
**Aplikasi:** RT-FinSmart PRO (Sistem Keuangan, Portal Warga & Manajemen Ronda Eksekutif)  
**Cabang Git (Branch):** `main`  
**Repositori GitHub:** `https://github.com/mydowndrive-ops/WebAppRT001.git`

---

## 🚀 Ringkasan Proyek & Panduan Melanjutkan (Handover Guide)

Dokumen ini dibuat khusus agar saat berpindah perangkat (laptop) atau akun, proyek ini dapat langsung dipahami dan dilanjutkan tanpa kehilangan konteks apa pun. Seluruh kode sumber terkini telah tersinkronisasi penuh dengan repositori GitHub.

---

## 🔐 Kredensial & Akses Pengguna (Role-Based Access Control)

Aplikasi dilengkapi dengan **Portal Login Eksekutif** (*Luxury Glassmorphism*) dengan dua peran (*role*):

| Peran | Nama Peran | Hak Akses | Default PIN |
| :--- | :--- | :--- | :--- |
| **B1** | **Bendahara 1 (Super Admin)** | Akses Penuh: Dashboard, Matriks Checklist, Pos Anggaran, Pengeluaran, Warga, Laporan, Pengaturan, Jimpitan, Pengaturan Ronda | `1111` |
| **B2** | **Bendahara 2 (Jimpitan & Ronda)** | Khusus Modul Uang Jimpitan Ronda (Catat Perolehan Mingguan, Pengeluaran Ronda, Rekap Saldo, Ekspor CSV, Monitoring Ronda) | `2222` |

- **Email Reset PIN / Bantuan:** `rt001rw013.grahaasri@gmail.com`
- **Penyimpanan Sesi:** Menggunakan `sessionStorage` (`RT001_LOGIN_SESSION_V1`). Sesi aktif saat browser terbuka dan akan meminta login kembali jika pengguna menekan tombol **Keluar (Logout)** di sidebar atau header atas.

---

## 🌟 Fitur-Fitur Utama & Pembaruan Terkini (Changelog Terbaru)

### 1. 🇮🇩 Banner Bendera Merah Putih & Animasi Mewah Split-Text Reveal
- **Transformasi Kotak Header Hero**:
  - Mengganti latar kotak lama dengan pemutaran video dinamis bendera Merah Putih berkibar asli menggunakan berkas `redwihite.mp4` (`<video class="flag-video-bg" autoplay loop muted playsinline preload="auto">`).
  - **Pembersihan Watermark Shutterstock 100% (*Watermark-Free*)**:
    - Teks watermark *"shutterstock"* yang semula menempel pada bagian kain putih telah dihilangkan secara sempurna menggunakan teknik rekonstruksi *masked feather inpainting* tanpa merusak dinamika lipatan kain sutra bendera.
    - Format video telah dioptimalkan dengan H.264 FastStart (`redwihite.mp4` dan `assets/redwihite.mp4`) untuk pemutaran instan tanpa *buffering* di seluruh jenis peramban modern.
    - Berkas `redwihite.webm` lama yang mengandung watermark telah dihapus bersih dari repositori.
  - **Efek Animasi Mewah Split-Text Reveal (Dua Baris Teks)**:
    - Judul utama `<h1>` kini berformat dua tingkat:
      1. Baris atas: `"Web Aplikasi Resmi"` (`.split-line-sub`) beraksen emas lembut (*luxury gold*).
      2. Baris bawah: `"WARGA RT.001 RW.013"` (`.split-line-main`) berhuruf tebal putih berkontras tinggi.
    - **Teknik Masking & Staggered Reveal**:
      - Setiap kata dibungkus dalam `<span class="word">` (`display: inline-block; overflow: hidden;`) sebagai area *masking*.
      - Setiap huruf dipecah menjadi `<span class="char">` (`transform: translateY(110%); opacity: 0;`).
      - Menggunakan Vanilla JS murni untuk menyuntikkan `transition-delay` bertahap (30ms per huruf) dengan kurva pergerakan sutra `cubic-bezier(0.16, 1, 0.3, 1)`.
      - Menggunakan `IntersectionObserver` agar animasi kemunculan huruf terpicu mulus saat judul masuk ke dalam area pandang (*viewport*).
  - **Desain Seamless Tanpa Garis Tepi (*Borderless*)**: Seluruh garis tepi (`border: none; outline: none;`) dan efek *inset stroke highlight* di sekeliling pinggir bendera telah dihilangkan sepenuhnya.
  - **Performa Ringan**: Dijalankan dengan manipulasi DOM efisien dan akselerasi GPU, sangat ringan dan cocok untuk perangkat mobile, desktop, maupun antarmuka digital signage.

### 2. ⚡ Perbaikan Alur Navigasi Login Pengurus (Direct Landing - Update 19 Sept 2026)
- **Masalah Sebelumnya**:
  - Saat menekan menu "Pengurus" di beranda publik dan sukses memasukkan PIN, pengguna sempat terlempar kembali ke beranda publik yang menampilkan bilah hijau melayang dengan tombol "Kembali ke Dashboard", sehingga pengguna harus mengklik tombol tersebut untuk kedua kalinya agar masuk ke Dashboard Pengurus.
- **Solusi & Perbaikan**:
  - Memperbaiki fungsi `hideLoginOverlay(fromPopState = false, isLoginSuccess = false)` dan `attemptLogin()` di `app.js`.
  - Mencegah eksekusi `popNavHistory()` (`history.back()`) saat login sukses diverifikasi, sehingga tidak ada sinyal `popstate` tumpang tindih yang memicu prioritas kembali ke halaman publik.
  - Pengguna kini **langsung mendarat 100% instan di Dashboard Pengurus** (`#app` dengan view aktif `#view-dashboard`) tanpa transit ke halaman publik.

### 3. 🛡️ Perbaikan Tuntas Fitur "Atur Jadwal Ronda" & "Edit Regu Ronda" (Update 19 Sept 2026 - v2.8.5)
- **Masalah Sebelumnya**:
  - Tombol **"Atur Jadwal Ronda"** dan **"Edit Regu"** di ke-8 kartu regu ronda sempat tidak merespons atau terhalang karena:
    1. Pembatasan akses peran internal (`isB2` atau sesi) yang menolak eksekusi dan membatalkan pembukaan modal.
    2. Caching agresif pada peramban/PWA Service Worker yang masih menyajikan naskah `app.js` versi lama (`v2.8.4`).
    3. Penataan `display` dan `z-index` modal dialog.
- **Solusi Tuntas & Penyempurnaan yang Diterapkan**:
  - **Penghapusan Total Hambatan Otorisasi Modal**:
    - Fungsi `openManageRondaModal(weekNum)` kini langsung membuka modal secara instan untuk semua pemanggil tanpa memeriksa pembatasan peran `isB2` atau otorisasi berulang.
    - Pembantu `openModal()` dan `closeModal()` kini secara eksplisit mengatur `style.display = 'flex'` dan `'none'` selain menambahkan/menghapus kelas `.active`.
  - **Z-Index & Interaktivitas Tombol**:
    - Nilai `z-index` pada `.modal-backdrop` dinaikkan menjadi `10000` (didukung `display: flex !important`) agar tampil di atas seluruh elemen header, drawer, maupun popup.
    - Tombol aksi kartu ronda (`.pengurus-ronda-card-actions .btn`) diberikan `position: relative; z-index: 10; pointer-events: auto;` untuk menjamin penerimaan interaksi klik.
  - **Dukungan Edit Langsung Per Regu (Regu 1 s.d. 8)**:

### 4. 🌙 Perbaikan Tuntas Menu Perolehan & Pengeluaran Kas Jimpitan (Admin 2 / Bendahara 2 - Update 19 Sept 2026 - v2.8.6)
- **Masalah Sebelumnya**:
  - Pada dashboard Admin 2 (Bendahara 2 / Koordinator Jimpitan), tombol `+ Catat Perolehan Jimpitan` dan `- Catat Pengeluaran Jimpitan` dilaporkan belum bisa digunakan secara optimal.
  - Modal sebelumnya tidak menyediakan tombol "Batal", tombol silang (&times;) hanya mengandalkan event delegation, dan input nominal bertipe number HTML5 menolak format titik ribuan (misal `75.000`).
  - Terdapat potensi tumpang tindih event (double trigger) antara atribut inline `onclick` dan delegated event listener di `document`.
  - Format tanggal default rawan bergeser satu hari ke belakang jika diakses pada jam malam/dini hari akibat konversi UTC `.toISOString()`.
- **Solusi & Perbaikan Komprehensif**:
  1. **Fungsi Global Terbuka & Eksplisit**:
     - `window.openJimpitanIncomeModal(event)` & `window.openJimpitanExpenseModal(event)`.
     - `window.handleJimpitanIncomeSubmit(event)` & `window.handleJimpitanExpenseSubmit(event)`.
     - `window.deleteJimpitanIncome(id)` & `window.deleteJimpitanExpense(id)`.
  2. **Interaktivitas Modal & Tombol Batal**:
     - Kedua modal (`#modal-add-jimpitan-income` dan `#modal-add-jimpitan-expense`) kini dilengkapi tombol **Batal** sekunder di samping tombol Simpan, serta tombol silang header dengan fungsi tutup langsung `onclick="closeModal(...)"`.
     - Ditambahkan pemformatan otomatis titik ribuan Rupiah secara real-time saat pengguna mengetik nominal (`oninput="...replace(/\B(?=(\d{3})+(?!\d))/g, '.')"`).
  3. **Penghitungan Tanggal Lokal Akurat (WIB)**:
     - Menggunakan perataan waktu lokal `getFullYear()`, `getMonth()`, dan `getDate()` untuk menentukan hari Minggu terdekat (perolehan) dan hari ini (pengeluaran), terbebas dari deviasi UTC.
  4. **Proteksi Double-Trigger & Event Idempotent**:
     - Memastikan tombol inline tidak dipicu ulang oleh delegated listener di `document`.
     - Fungsi `setupJimpitanEvents()` diamankan dengan guard `isJimpitanEventsSetup` dan auto-init baik saat `DOMContentLoaded` maupun jika dokumen telah dimuat.
  5. **Penyegaran Cache (Cache Busting v2.8.6)**:
     - Versi aset di `index.html` dan `sw.js` diperbarui ke `v=2.8.6` (`rt-finsmart-cache-v2.8.6`) agar seluruh peramban pengguna dan aplikasi PWA mengunduh berkas JavaScript dan CSS paling mutakhir.
    - Setiap tombol **"Edit Regu"** pada ke-8 kartu ronda memicu langsung `onclick="window.openManageRondaModal(${g.week})"`.
    - Data nama komandan dan anggota ditangani secara aman baik berbentuk objek (`{ name: '...' }`) maupun string langsung.
  - **Cache Busting Resmi (v2.8.5)**:
    - Versi aset pada `index.html` dan `sw.js` diperbarui ke `v=2.8.5` (`CACHE_NAME = 'rt-finsmart-cache-v2.8.5'`) sehingga peramban dan PWA otomatis mengunduh kode terbaru tanpa tertahan cache lama.

### 4. 🪙 Modul Kas Jimpitan Ronda Terintegrasi (Update 19 Sept 2026)
- Penguatan alur pencatatan perolehan uang jimpitan malam minggu untuk akun Bendahara 2 (B2) dan Bendahara 1 (B1).
- Otomatis memperbarui total penerimaan jimpitan, mutasi pengeluaran siskamling, dan saldo kas jimpitan yang langsung tampil di kartu Transparansi Keuangan Portal Warga.

### 5. 💎 Portal Login Eksekutif (Luxury Glassmorphism & Animated Glow Orbs)
- Tampilan gelap elegan (*dark luxury*) dengan aksen hijau zamrud (*emerald*) dan emas (*gold*).
- Kartu seleksi akun interaktif dengan efek sorot (*glow*) saat dipilih.
- Kolom PIN interaktif dengan:
  - **Tik / Checkbox "Tampilkan Password"** (`#login-toggle-show-pin`).
  - **Ikon Standar Mata** (`#login-eye-btn` - `fa-eye` / `fa-eye-slash`) yang tersinkronisasi dua arah dengan checkbox.
  - Animasi *shake* (getar) jika PIN salah dimasukkan.
  - Tampilan **Lupa PIN?** terhubung ke `rt001rw013.grahaasri@gmail.com` dengan tombol satu-klik **Salin Email** dan tombol kirim email via mailto.

### 6. 📊 Dashboard Eksekutif & Visual KPI
- Saldo kas terkonsolidasi, total penerimaan, total pengeluaran, dan realisasi iuran wajib bulan berjalan.
- **Tampilan Prosentase Pembayaran Iuran Warga Berdasarkan Nama Jalan**:
  - Membagi data 71 KK ke dalam 5 jalan utama:
    1. `Jl. Citarum II`
    2. `Jl. Citarum IVA`
    3. `Jl. Citarum VIIIB`
    4. `Jl. Citarum VIIIC`
    5. `Jl. Citarum IX`
  - Dilengkapi *progress bar* dinamis, persentase lunas, jumlah KK lunas/total KK per jalan, serta status kategori (*Sangat Tinggi, Tinggi, Sedang, Perlu Ditingkatkan*).

### 7. 🌐 Portal Publik Warga & Integrasi Terpadu Satu Pintu
- **Halaman Depan Utama (`#portal-public`)**: Website profil publik resmi RT.001 / RW.013 Graha Asri yang ramah warga dan tamu:
  - **Navbar Sticky**: Dilengkapi logo resmi, menu navigasi anchor (Tentang, Kegiatan, Layanan & Kas, Pengurus), tombol **Portal Pengurus** (masuk PIN), dan menu responsif mobile hamburger.
  - **Hero Section**: Tagline *"Melayani dengan Hati, Membangun dalam Kebersamaan"*, banner bendera Merah Putih berkibar, logo RT resolusi tinggi, tombol cepat info kas, dan tombol akses bendahara.
  - **Tentang Lingkungan**: Menampilkan profil RT dan cakupan 5 rute jalan.
  - **Agenda Warga**: Program rutin Ronda/Siskamling, pengajian, Qurban & Halal Bihalal, serta kegiatan sosial.
  - **Transparansi & Digitalisasi RT**: Widget kartu metrik live terhubung langsung ke database lokal (`state.residents` jumlah KK, total saldo kas terhimpun, dan kas jimpitan ronda).
  - **Struktur Pengurus**: Menampilkan Ketua RT, Sekretaris, Bendahara, dan Humas lengkap dengan tombol kontak langsung ke WhatsApp.

### 8. 📱 PWA & Auto-Data Seeding
- Data warga (71 KK) tersimpan di `localStorage` (`RT001_FINSMART_PRO_DATA_V1`) dengan sinkronisasi otomatis Google Sheets fallback.
- Dilengkapi `manifest.json` dan `sw.js` (Service Worker) siap pasang (*installable*) di Android / iOS / Desktop.

---

## 📁 Struktur Berkas Proyek

```
WORKSPACE RT/
├── index.html       # Struktur HTML utama, Portal Publik, Bendera Berkibar, Modal & Views
├── styles.css       # Seluruh CSS design system: tema gelap luxury, animasi bendera, dan responsif
├── app.js           # Logika aplikasi: Auth, RBAC, CRUD Iuran, Jimpitan, Ronda, Navigasi History
├── manifest.json    # Konfigurasi PWA Mobile
├── sw.js            # Service worker untuk caching dan offline access
├── LATEST.md        # Dokumen ringkasan status terkini & handover proyek ini
├── APK_BUILD_GUIDE.md # Panduan konversi Web App menjadi APK Android
└── assets/
    ├── logo.png     # Logo RT resmi dengan sudut rounded elegan
    ├── logo.jpg     # Master logo
    ├── icon-192.png # Icon PWA 192x192
    └── icon-512.png # Icon PWA 512x512
```

---

## 💻 Cara Menjalankan & Melanjutkan di Laptop Baru

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/mydowndrive-ops/WebAppRT001.git
   cd "WORKSPACE RT"
   ```

2. **Menjalankan Aplikasi**:
   - Cukup buka berkas `index.html` langsung di browser mana pun (Chrome, Edge, Firefox, Safari).
   - Atau gunakan local server:
     ```bash
     python -m http.server 8080
     ```
     lalu buka `http://localhost:8080` di browser.

3. **Login Pengurus**:
   - Klik menu **Portal Pengurus** di navbar atau tombol **Akses Pengurus** di hero banner.
   - Pilih kartu **Bendahara 1** lalu masukkan PIN `1111` untuk akses penuh (Keuangan, Warga, Pos Anggaran, Jadwal Ronda).
   - Atau pilih kartu **Bendahara 2** lalu masukkan PIN `2222` untuk akses khusus Jimpitan & Ronda.
   - Sistem akan langsung mengarahkan Anda ke Dashboard Pengurus secara instan.

---

## ⚡ Standar Operasional Pengembang (SOP Sinkronisasi GitHub)

> [!IMPORTANT]
> **SETIAP KALI** selesai melakukan perubahan, perbaikan, atau penambahan fitur:
> 1. **Commit ke Git lokal**:
>    ```bash
>    git add .
>    git commit -m "feat/fix/docs: ringkasan perubahan yang dilakukan"
>    ```
> 2. **Push ke remote GitHub**:
>    ```bash
>    git push origin main
>    ```
> 3. **Perbarui berkas `LATEST.md`** agar seluruh riwayat dan panduan handover selalu up-to-date.
