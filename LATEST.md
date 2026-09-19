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

### 1. 🇮🇩 Banner Bendera Merah Putih Berkibar (Video Background `redwihite.webm` & Center Alignment)
- **Transformasi Kotak Header Hero**:
  - Mengganti latar kotak lama dengan pemutaran video dinamis bendera Merah Putih berkibar asli menggunakan berkas `redwihite.webm` (`<video class="flag-video-bg" autoplay loop muted playsinline preload="auto">`).
  - **Visual Kain Sinematik Realistis**:
    - Gerakan kibaran kain bendera merah putih natural dan mulus (*looping seamless*) berformat WebM ringan (~324 KB) dengan performa render perangkat keras instan.
    - Dilengkapi fallback ganda: `redwihite.webm` (root) dan `assets/redwihite.webm`.
  - **Hierarki Visual & Keterbacaan Kontras (Center Alignment)**:
    - Teks `"WARGA RT.001 RW.013"` diposisikan di lapisan paling depan (*frontmost layer* dengan `z-index: 3`) persis di tengah-tengah kotak (*center alignment*).
    - Dilengkapi lapisan pelindung kontras (*radial-gradient contrast scrim*) semi-transparan tipis di antara teks dan video bendera.
    - Tipografi *bold* tebal dengan multi-layer shadow gelap pekat (`text-shadow: 0 1px 2px #000, 0 2px 5px rgba(0,0,0,0.95), 0 4px 14px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.85)`) sehingga teks tetap 100% sangat jelas dan mudah dibaca baik di atas latar merah maupun putih yang sedang bergerak.
  - **Desain Seamless Tanpa Garis Tepi (*Borderless*)**: Seluruh garis tepi (`border: none; outline: none;`) dan efek *inset stroke highlight* di sekeliling pinggir bendera telah dihilangkan sepenuhnya, menghasilkan visual kain bendera yang bebas batas, bersih, dan menyatu alami dengan latar.
  - **Performa Ringan**: Ringan dan hemat CPU/GPU, cocok untuk perangkat mobile, desktop, maupun antarmuka digital signage.

### 2. ⚡ Perbaikan Alur Navigasi Login Pengurus (Direct Landing - Update 19 Sept 2026)
- **Masalah Sebelumnya**:
  - Saat menekan menu "Pengurus" di beranda publik dan sukses memasukkan PIN, pengguna sempat terlempar kembali ke beranda publik yang menampilkan bilah hijau melayang dengan tombol "Kembali ke Dashboard", sehingga pengguna harus mengklik tombol tersebut untuk kedua kalinya agar masuk ke Dashboard Pengurus.
- **Solusi & Perbaikan**:
  - Memperbaiki fungsi `hideLoginOverlay(fromPopState = false, isLoginSuccess = false)` dan `attemptLogin()` di `app.js`.
  - Mencegah eksekusi `popNavHistory()` (`history.back()`) saat login sukses diverifikasi, sehingga tidak ada sinyal `popstate` tumpang tindih yang memicu prioritas kembali ke halaman publik.
  - Pengguna kini **langsung mendarat 100% instan di Dashboard Pengurus** (`#app` dengan view aktif `#view-dashboard`) tanpa transit ke halaman publik.

### 3. 🛡️ Pengaturan Jadwal Ronda di Portal Pengurus (Update 19 Sept 2026)
- Di Portal Pengurus, kini tersedia tab dan panel pengaturan jadwal ronda mingguan (Regu Ronda Senin s.d. Minggu).
- Pengurus dapat mengelola pembagian nama warga petugas ronda per regu, koordinator lapangan, nomor kontak darurat, serta hari giliran ronda.
- Perubahan jadwal ronda langsung tersinkronisasi otomatis secara real-time ke kartu informasi ronda pada Portal Publik Warga.

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
