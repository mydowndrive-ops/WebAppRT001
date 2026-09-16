# 📌 RT-FinSmart PRO — Status & Dokumentasi Proyek Terkini (LATEST)

**Terakhir Diperbarui:** 15 September 2026  
**Entitas:** Rukun Tetangga (RT) 001 / RW 013 – Graha Asri  
**Aplikasi:** RT-FinSmart PRO (Sistem Keuangan & Jimpitan Ronda Eksekutif)  
**Cabang Git (Branch):** `main`

---

## 🚀 Ringkasan Proyek & Panduan Melanjutkan (Handover Guide)

Dokumen ini dibuat khusus agar saat berpindah perangkat (laptop) atau akun, proyek ini dapat langsung dipahami dan dilanjutkan tanpa kehilangan konteks apa pun.

---

## 🔐 Kredensial & Akses Pengguna (Role-Based Access Control)

Aplikasi dilengkapi dengan **Portal Login Eksekutif** (*Luxury Glassmorphism*) dengan dua peran (*role*):

| Peran | Nama Peran | Hak Akses | Default PIN |
| :--- | :--- | :--- | :--- |
| **B1** | **Bendahara 1 (Super Admin)** | Akses Penuh: Dashboard, Matriks Checklist, Pos Anggaran, Pengeluaran, Warga, Laporan, Pengaturan, Jimpitan | `1111` |
| **B2** | **Bendahara 2 (Jimpitan)** | Khusus Modul Uang Jimpitan Ronda (Catat Perolehan Mingguan, Pengeluaran Ronda, Rekap Saldo, Ekspor CSV) | `2222` |

- **Email Reset PIN / Bantuan:** `rt001rw013.grahaasri@gmail.com`
- **Penyimpanan Sesi:** Menggunakan `sessionStorage` (`RT001_LOGIN_SESSION_V1`). Sesi aktif saat browser terbuka dan akan meminta login kembali jika pengguna menekan tombol **Keluar (Logout)** di sidebar atau header atas.

---

## 🌟 Fitur-Fitur Utama yang Telah Selesai Diimplementasikan

1. **Portal Login Eksekutif (Luxury Glassmorphism & Animated Glow Orbs)**:
   - Tampilan gelap elegan (*dark luxury*) dengan aksen hijau zamrud (*emerald*) dan emas (*gold*).
   - Kartu seleksi akun interaktif dengan efek sorot (*glow*) saat dipilih.
   - Kolom PIN interaktif dengan:
     - **Tik / Checkbox "Tampilkan Password"** (`#login-toggle-show-pin`).
     - **Ikon Standar Mata** (`#login-eye-btn` - `fa-eye` / `fa-eye-slash`) yang tersinkronisasi dua arah dengan checkbox.
     - Animasi *shake* (getar) jika PIN salah dimasukkan.
     - Tampilan **Lupa PIN?** terhubung ke `rt001rw013.grahaasri@gmail.com` dengan tombol satu-klik **Salin Email** dan tombol kirim email via mailto.

2. **Dashboard Eksekutif & Visual KPI**:
   - Saldo kas terkonsolidasi, total penerimaan, total pengeluaran, dan realisasi iuran wajib bulan berjalan.
   - **Tampilan Prosentase Pembayaran Iuran Warga Berdasarkan Nama Jalan**:
     - Membagi data 71 KK ke dalam 5 jalan utama:
       1. `Jl. Citarum II`
       2. `Jl. Citarum IVA`
       3. `Jl. Citarum VIIIB`
       4. `Jl. Citarum VIIIC`
       5. `Jl. Citarum IX`
     - Dilengkapi *progress bar* dinamis, persentase lunas, jumlah KK lunas/total KK per jalan, serta status kategori (*Sangat Tinggi, Tinggi, Sedang, Perlu Ditingkatkan*).

3. **Modul Jimpitan Ronda (Khusus Bendahara 2)**:
   - Pencatatan perolehan uang jimpitan malam minggu berdasarkan regu ronda dan koordinator.
   - Pencatatan pengeluaran operasional ronda (konsumsi, perlengkapan, operasional).
   - Rekap saldo jimpitan otomatis dan ekspor data ke format `.CSV`.

4. **Branding & Logo Elegan**:
   - Logo RT diperbarui dengan latar belakang putih bersih dan sudut melengkung (*border-radius* elegan).
   - Aset logo tersedia di `assets/logo.png`, `assets/logo.jpg`, serta ikon PWA (`assets/icon-*.png`).

5. **Auto-Data Seeding & Google Sheets Fallback**:
   - Data warga (71 KK) tersimpan di `localStorage` (`RT001_FINSMART_PRO_DATA_V1`).
   - Jika `localStorage` kosong saat pertama kali dibuka di lokal/offline, sistem otomatis memuat 71 data KK awal dan menyinkronkan dengan CSV Google Sheets:
     `https://docs.google.com/spreadsheets/d/1zwrXck7x2HzVV6KhFgb3DgdAw5SrIUXm64a2M1mbclo/export?format=csv`

6. **PWA & Responsivitas Penuh**:
   - Dilengkapi `manifest.json` dan `sw.js` (Service Worker) siap pasang (*installable*) di Android / iOS / Desktop.
   - Navigasi mobile bawah (*bottom navigation*) dan tombol cepat keluar di mobile header.

7. **Perbaikan Multi-Role & Switch Account (B1 / B2)**:
   - Menambahkan fungsi helper `formatCurrency`, `formatDateLong`, `openModal`, dan `closeModal` yang sebelumnya belum terdefinisi sehingga menyebabkan eksekusi `renderAll()` terhenti sebelum `applyRBAC()` & `updateUserProfileUI()`.
   - Menambahkan sinkronisasi `sessionStorage` saat berganti akun di modal switch account (`#modal-switch-account`).
   - Otomatis mengarahkan akun B2 ke tampilan Jimpitan Ronda (`#view-jimpitan`) dan mengunci menu khusus B1 (desktop sidebar & mobile bottom nav) dengan visual gembok.
   - Sidebar footer dinamis menampilkan profil aktif: **B1 – Bendahara 1** (Full Control Keuangan) atau **B2 – Bendahara 2** (Koordinator Jimpitan Ronda) dengan avatar dan badge yang sesuai.

8. **Portal Publik Warga & Integrasi Terpadu Satu Pintu (Opsi A)**:
   - **Halaman Depan Utama (`#portal-public`)**: Website profil publik resmi RT.001 / RW.013 Graha Asri yang ramah warga dan tamu:
     - **Navbar Sticky**: Dilengkapi logo resmi, menu navigasi anchor (Tentang, Kegiatan, Layanan & Kas, Pengurus), tombol **Portal Pengurus** (masuk PIN), dan menu responsif mobile hamburger.
     - **Hero Section**: Tagline *"Melayani dengan Hati, Membangun dalam Kebersamaan"*, logo RT resolusi tinggi, tombol cepat info kas, dan tombol akses bendahara.
     - **Tentang Lingkungan**: Menampilkan profil RT dan cakupan 5 rute jalan (Jl. Citarum II, IVA, VIIIB, VIIIC, IX).
     - **Agenda Warga**: Program rutin Ronda/Siskamling, pengajian bapak & ibu, Qurban & Halal Bihalal, serta solidaritas sosial warga.
     - **Transparansi & Digitalisasi RT**: Widget kartu metrik live terhubung langsung ke database lokal (`state.residents` jumlah KK, total saldo kas terhimpun, dan kas jimpitan ronda).
     - **Struktur Pengurus**: Menampilkan Ketua RT, Sekretaris, Bendahara, dan Humas lengkap dengan tombol kontak langsung ke WhatsApp.
   - **Alur Masuk & Keluar Mulus (Seamless Two-Way Navigation)**:
     - Tombol **"Portal Pengurus"** di beranda publik membuka Modal Login Glassmorphism.
     - Tombol silang `X` (`#btn-close-login-overlay`) pada login overlay memungkinkan warga kembali ke beranda tanpa terjebak.
     - Setelah login (PIN B1/B2), sistem langsung membuka dashboard eksekutif RT-FinSmart PRO.
     - Di sidebar dan header kanan admin, tersedia tombol **"🌐 Web Warga"** untuk meninjau halaman publik sewaktu-waktu. Saat admin membuka halaman publik, muncul bilah hijau atas (**Mode Pengurus Aktif**) dengan tombol **Kembali ke Dashboard** dan **Keluar**.
     - Tombol **"Keluar (Logout)"** otomatis mengembalikan pengguna ke halaman publik warga dengan aman.

9. **Desain Halaman Muka Premium: Dark Luxury Emerald (Hijau Zamrud Mewah & Profesional)**:
   - **Palet Warna Eksklusif**: Latar belakang deep emerald gelap (`#02120b` s.d. `#052417`), kombinasi tipografi emas berkilau (`#f59e0b` / `#fbbf24`), serta aksen hijau zamrud bercahaya (`#10b981` / `#34d399`).
   - **Elemen Visual & Animasi Interaktif**:
     - *Ambient Aurora Glow Orbs* dengan efek mengambang dinamis (*float animation*) di latar belakang hero.
     - *Luxury Logo Ring*: Frame logo melingkar mewah dengan pulsing glow radial dan badge resmi.
     - *Dark Frosted Glassmorphism*: Kartu-kartu agenda, metrik transparansi, dan rute jalan menggunakan `backdrop-filter: blur(18px)`, gradasi border emerald tipis, dan efek sorot kursor hover.
     - *Live Quick Ticker*: Pills info singkat beranimasi (*71 KK Terdata, Kas Transparan, Siskamling 24 Jam, Warga Rukun*).
     - *Kartu Pengurus Eksekutif*: Foto pengurus dengan ring bercahaya, badge jabatan, dan tombol integrasi direct WhatsApp.


---

## 📁 Struktur Berkas Penting

```
WORKSPACE RT/
├── index.html       # Struktur HTML utama, Portal Login Overlay, Modal-modal, & Views
├── styles.css       # Seluruh CSS design system, tema gelap luxury, animasi, dan responsif
├── app.js           # Logika aplikasi: Auth, RBAC, CRUD Iuran, Jimpitan, Seeding, Sinkronisasi
├── manifest.json    # Konfigurasi PWA Mobile
├── sw.js            # Service worker untuk caching dan offline access
├── LATEST.md        # Dokumen ringkasan handover proyek ini
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
   git clone <URL_REPO_GITHUB>
   cd "WORKSPACE RT"
   ```

2. **Menjalankan Aplikasi**:
   - Cukup buka berkas `index.html` langsung di browser mana pun (Chrome, Edge, Firefox, Safari).
   - Atau gunakan local server (misal VS Code Live Server atau `python -m http.server 8080`).

3. **Login Pertama Kali**:
   - Klik kartu **Bendahara 1** lalu masukkan PIN `1111` untuk akses penuh.
   - Atau klik kartu **Bendahara 2** lalu masukkan PIN `2222` untuk akses khusus Jimpitan.

---

## ⚡ Standar Operasional Pengembang (SOP Wajib)

> [!IMPORTANT]
> **SETIAP KALI** selesai melakukan perubahan, perbaikan, atau penambahan fitur:
> 1. **Commit ke Git lokal**:
>    ```bash
>    git add .
>    git commit -m "Deskripsi perubahan yang jelas"
>    ```
> 2. **Push ke remote GitHub**:
>    ```bash
>    git push origin main
>    ```
> 3. **Perbarui berkas `LATEST.md`** jika ada kredensial baru, struktur modul baru, atau alur kerja yang berubah.
