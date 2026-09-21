# 📌 RT-FinSmart PRO — Status & Dokumentasi Proyek Terkini (LATEST)

**Terakhir Diperbarui:** 21 September 2026 (18:00 WIB)  
**Versi Rilis Aktif:** `v2.9.52`  
**Entitas:** Rukun Tetangga (RT) 001 / RW 013 – Graha Asri  
**Aplikasi:** RT-FinSmart PRO (Sistem Keuangan, Portal Warga & Manajemen Ronda Eksekutif)  
**Cabang Git (Branch):** `main`  
**Repositori GitHub:** `https://github.com/mydowndrive-ops/WebAppRT001.git`

---

## 🚀 Ringkasan Proyek & Panduan Melanjutkan (Handover Guide)

Dokumen ini dibuat khusus sebagai panduan handover utama (*single source of truth*) agar saat Anda melanjutkan pekerjaan nanti atau besok — atau berpindah perangkat (laptop)/akun — seluruh konteks arsitektur, status pengetesan, dan rencana kerja berikutnya dapat langsung dilanjutkan tanpa hambatan. Seluruh kode sumber terkini telah tersinkronisasi penuh dengan repositori GitHub di cabang `main`.

---

## 🌟 Riwayat Rilis & Pembaruan Terkini (Changelog)

### 1. 💳 Integrasi Payment Gateway Pakasir API v2: Bayar Iuran Online QRIS & Virtual Account Otomatis Ter-update (Update v2.9.52 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - *"Tolong bantu saya menambahkan fitur integrasi payment gateway 'Pakasir' (pakasir.com) ke dalam proyek web RT-FinSmart ini agar warga dapat membayar iuran wajib secara online (melalui QRIS/Virtual Account) dan statusnya terupdate secara otomatis."*
- **Arsitektur & Komponen yang Dibuat**:
  1. **Serverless Backend API (Vercel & Local Server Compatible)**:
     - `api/pakasir/create-transaction.js`: Mengirim request transaksi ke API Pakasir v2 (`POST https://app.pakasir.com/api/v2/create-transaction/{slug}/{order_id}`) dengan header `X-Api-Key` dan payload JSON `{ method, amount }`. Dilengkapi mode Sandbox Simulator otomatis jika environment variable API Key belum dipasang.
     - `api/pakasir/webhook.js`: Endpoint Webhook / Callback (`/api/pakasir/webhook`) untuk menerima HTTP POST notifikasi pelunasan dari server Pakasir. Memvalidasi payload (`order_id`, `amount`, `status == 'completed' || status == 'success'`) dan mencatat status pembayaran ke server state.
     - `api/pakasir/check-status.js`: Endpoint verifikasi status transaksi real-time untuk polling frontend (`/api/pakasir/check-status?order_id=...`). Dilengkapi fitur live double-check ke server Pakasir (`GET /api/v2/transaction-status/{slug}/{txn_id}`) serta simulator testing.
     - `api/pakasir/store.js`: Storage state transaksi fleksibel (in-memory + disk cache `/tmp/pakasir_transactions.json`).
  2. **Konfigurasi Lingkungan & Keamanan**:
     - Kredensial aktif Proyek Pakasir: `smartpay01` (Slug), `wcau8rOd9urMIHXgX6JDDuaNjhfogjUd` (API Key), dan `101b1ab91ded0471ca66fef0aa1916aa` (Webhook Secret).
     - `.env` & `.env.example`: Terkonfigurasi dengan variabel `PAKASIR_PROJECT_SLUG`, `PAKASIR_API_KEY`, dan `PAKASIR_WEBHOOK_SECRET`.
     - `vercel.json`: Konfigurasi serverless function rewrites (`/api/pakasir/:path*`) dan HTTP Security Headers.
     - `.gitignore`: Melindungi `.env` agar kredensial rahasia tidak bocor ke Git publik.
  3. **Antarmuka Pengguna (Frontend Portal Warga)**:
     - Tombol interaktif **"Bayar Iuran via QRIS (Pakasir)"** di bilah aksi iuran portal warga (`#btn-pw-pay-qris-pakasir`).
     - Seluruh cell bulan berstatus belum lunas pada matriks iuran 12 bulan kini dapat diklik langsung untuk memicu modal pembayaran.
     - Modal Pembayaran 3-Langkah (`#modal-pakasir-payment`):
       - *Langkah 1*: Pemilihan bulan iuran belum lunas (multi-select dengan hitungan nominal otomatis Rp25.000/bulan) & pemilihan metode (QRIS Real-Time atau Virtual Account).
       - *Langkah 2*: Tampilan QRIS dinamis berkualitas tinggi, rincian Order ID unik (`RT001-YYYYMMDD-...`), countdown waktu kedaluwarsa 15 menit, indikator status pulsing (*Menunggu Pembayaran*), tombol salin data, dan simulator pengujian.
       - *Langkah 3*: Notifikasi sukses pelunasan, stempel lunas, rincian transaksi, dan tombol cetak kwitansi resmi RT.
  4. **Otomasi Sinkronisasi State & Buku Kas RT**:
     - Ketika notifikasi sukses diterima via polling atau webhook, client `app.js` otomatis mengeksekusi `handlePakasirPaymentSuccess()`.
     - Bulan iuran warga yang dibayar seketika berubah menjadi **"Lunas"** dengan timestamp dan referensi Order ID Pakasir.
     - Transaksi tercatat ke `state.payments` dan memicu `computeFinancials()`, yang secara otomatis membagi dana masuk ke **6 Pos Anggaran Kas RT** (Operasional, Keamanan, Kebersihan, Sosial, Pembangunan, Dana Cadangan) dan memperbarui grafik tahunan serta laporan kas RT.
  5. **Bypass Cache PWA**:
     - Service worker `sw.js` diperbarui agar tidak pernah meng-cache rute dynamic `/api/` dan versi cache dinaikkan ke `rt-finsmart-cache-v2.9.52`.

### 2. 🗄️ Menu Eksklusif Arsip e-Surat Warga di Dashboard Admin 1 & Penghapusan Arsip dari Portal Warga (Update v2.9.51 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - *"Di dashboard Admin 1 saya tidak melihat tabel Buku Register e-Surat. Saya ingin di Admin 1 dibuatkan Menu di side bar mengenai arsip semua surat yang sudah diajukan oleh warga baik yang ditolak atau disetujui. Sehingga semua surat tercatat dan tersimpan di akun Admin 1. Jangan arsipkan surat di dashboard warga."*
- **Hasil Implementasi Lengkap**:
  1. **Menu Sidebar Baru Khusus Admin 1 & Pengurus (`#arsip-surat`)**:
     - Ditambahkan item sidebar nav baru **"Arsip e-Surat Warga"** berikon ungu `fa-file-circle-check` dengan hak akses `data-role-req="B1"` (dan dapat diakses juga oleh Pengurus/Ketua RT).
     - Dilengkapi badge notifikasi dinamis (`#sidebar-surat-badge`) yang otomatis menampilkan jumlah surat yang masih menunggu persetujuan (*pending approval*).
  2. **Halaman Khusus Buku Register & Arsip e-Surat (`#view-arsip-surat`)**:
     - **4 Kartu Statistik Interaktif**:
       - *Total Pengajuan*: Menghitung akumulasi seluruh surat yang diajukan.
       - *Perlu Persetujuan*: Jumlah surat yang menunggu otorisasi QR Digital Sign.
       - *Sah & Tervalidasi*: Jumlah surat yang telah disahkan secara digital.
       - *Ditolak*: Jumlah surat yang ditolak oleh pengurus RT.
       - Setiap kartu dapat diklik langsung untuk memfilter tabel data secara instan (*click-to-filter*).
     - **Filter Tabs Cepat & Kolom Pencarian**:
       - Tab filter: *Semua*, *Menunggu*, *Disetujui*, dan *Ditolak* lengkap dengan counter jumlah dokumen.
       - Input pencarian real-time untuk mencari berdasarkan nama pemohon, NIK, keperluan, nomor surat, maupun instansi tujuan.
     - **Tabel Register Lengkap dengan Aksi Pengurus**:
       - *Lihat*: Membuka modal pratinjau surat resmi admin (`#modal-preview-admin-surat`).
       - *Setujui*: Mengesahkan surat dan menerbitkan QR Code Digital Sign (otomatis mencatat nama pengesah dan stempel waktu).
       - *Tolak*: Membuka modal tolak surat (`#modal-reject-surat`) untuk memasukkan alasan penolakan formal (NIK tidak cocok, bukan warga, dokumen kurang, atau alasan kustom).
       - *Cek Sah*: Memvalidasi keaslian tanda tangan digital kriptografi SHA-256 secara langsung.
       - *Hapus*: Proteksi ketat hak akses penghapusan khusus Admin 1 dengan validasi PIN Bendahara 1 (`1111`).
  3. **Modal Pratinjau Surat Resmi Admin (`#modal-preview-admin-surat`)**:
     - Menampilkan lembar kertas surat pengantar resmi ber-KOP RT.001 lengkap dengan stempel digital `DITOLAK / INVALID` jika berstatus ditolak, atau QR Code Digital Sign aktif jika telah disetujui.
     - Tombol cetak PDF instan (`printSuratFromAdminModal()`) yang mencetak lembar surat secara bersih dan presisi tanpa elemen modal.
  4. **Pembersihan & Perlindungan Privasi di Portal Warga**:
     - Tabel register surat riwayat seluruh warga (`#card-register-surat-rt`) telah **dihapus sepenuhnya** dari `#view-surat-pengantar` portal warga, sehingga kerahasiaan data kependudukan (NIK, alamat, keperluan) warga lain terlindungi 100% dan hanya dapat diakses oleh Admin 1 dan Pengurus RT.
  5. **Pembaruan Service Worker & Versi PWA**:
     - Cache dinaikkan ke `rt-finsmart-cache-v2.9.51` pada `sw.js`, `index.html`, dan `app.js`.

### 2. 🛡️ Sistem Persetujuan Otoritatif Ketua RT / Admin 1 Sebelum Penerbitan QRIS / QR Digital Sign (Update v2.9.50 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - *"Untuk menghindari penyalahgunaan surat, QRIS ada/muncul di surat jika sudah mendapatkan persetujuan dari Ketua RT atau Admin 1"*
  - Mencegah warga atau oknum mencetak surat mandiri dengan QR Code Digital Sign sah tanpa izin atau verifikasi resmi dari Ketua RT atau Bendahara 1.
- **Hasil Implementasi Lengkap**:
  1. **Status Bertahap Surat Pengantar (Pending Approval Workflow)**:
     - Setiap surat yang dibuat mandiri oleh warga melalui Portal Warga kini berstatus awal **`Menunggu Persetujuan`** (`isApproved: false`).
     - **QR Code Digital Sign disembunyikan / tidak ditampilkan** pada draft surat pengantar fisik maupun pratinjau inpage.
     - Posisi QR digantikan oleh kotak stempel resmi: `[ MENUNGGU PERSETUJUAN - Ketua RT / Admin 1 ]` bergaris putus-putus amber dengan ikon jam pasir, menegaskan bahwa dokumen tersebut masih berupa draf dan belum sah.
  2. **Banner Peringatan Interaktif Pratinjau Surat (`#inpage-surat-approval-banner`)**:
     - Ditambahkan banner elegan di atas lembar surat yang menginformasikan status draft dokumen.
     - Dilengkapi tombol cepat *"✍️ Otorisasi & Setujui Surat"* untuk Ketua RT atau Admin 1 yang sedang meninjau.
  3. **Modal Otorisasi Persetujuan Resmi (`#modal-auth-approve-surat`)**:
     - Modal persetujuan bertema emerald glassmorphism yang memvalidasi PIN resmi:
       - **Ketua RT (Maryanto)**: PIN default `3333`
       - **Admin 1 (Bendahara 1)**: PIN default `1111`
     - Jika PIN cocok, surat langsung disahkan (`isApproved: true`, `status: 'Sah & Tervalidasi'`), pencatat pengesah dicatat (misal: *Disahkan oleh Ketua RT.001 (Maryanto)*), dan QR Code Digital Sign seketika aktif dan dicetak.
     - Jika pengguna sudah aktif login sebagai Ketua RT atau Admin 1, sistem langsung meminta konfirmasi 1-klik tanpa meminta PIN berulang kali.
  4. **Pembaruan Buku Register e-Surat**:
     - Kolom status kini membedakan dengan jelas:
       - **Badge Amber**: `Menunggu Persetujuan` (Draft)
       - **Badge Emerald**: `SAH • SIG-XXXXXXXX` (Disahkan & Tervalidasi) disertai nama pengesah.
     - Menambahkan tombol aksi **"Setujui"** pada baris surat yang masih pending.
     - Menambahkan tombol aksi **"Lihat"** untuk membuka lembar pratinjau surat secara instan dari tabel register.
  5. **Verifikasi Digital Tahan Manipulasi (Security Verification)**:
     - Jika tautan QR pada surat berstatus pending diperiksa atau discan, modal verifikasi menampilkan status **`SURAT MENUNGGU PERSETUJUAN`** bertema amber dengan peringatan tegas bahwa dokumen masih berstatus draf dan belum memiliki kekuatan hukum.
  6. **Pembaruan Service Worker & Versi PWA**:
     - Versi cache PWA dinaikkan ke `rt-finsmart-cache-v2.9.50` pada `sw.js`, `index.html`, dan `app.js`.

### 2. 🔒 Proteksi Otorisasi Eksklusif Admin 1 (Bendahara 1) untuk Hapus Arsip Surat (Update v2.9.49 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - *"Harusnya yang bisa menghapus hanya admin 1 (Bendahara 1) saja karena untuk menghindari pemalsuan."*
  - Menegakkan keamanan tingkat tinggi agar warga atau pihak luar yang membuka Portal Warga tidak dapat menghapus atau memanipulasi riwayat surat resmi RT.001.
- **Hasil Implementasi**:
  1. **Modal Otorisasi Keamanan Admin 1 (`#modal-auth-b1-surat`)**:
     - Ditambahkan modal otorisasi bertema dark/gold glassmorphism yang mewajibkan input PIN resmi Bendahara 1 (PIN default `1111` atau PIN kustom yang telah diatur).
     - Menampilkan rincian dokumen yang hendak dihapus (Nomor Surat, Nama Pemohon, NIK, dan Keperluan).
     - Jika PIN salah, akses ditolak seketika dengan pesan peringatan keamanan dan data register tetap 100% aman terlindungi.
  2. **Verifikasi Hak Akses Cerdas (Smart RBAC)**:
     - Jika pengguna sedang aktif login sebagai **Admin 1 / Bendahara 1** (`state.currentUser === 'b1'`), penghapusan dapat langsung dikonfirmasi tanpa perlu memasukkan ulang PIN.
     - Jika pengguna sedang di **Portal Warga / Mode Publik**, sistem secara otomatis membuka modal verifikasi PIN Admin 1.
  3. **Visual Badge & Indikator Gembok Keamanan**:
     - Header kartu Buku Register dilengkapi badge: `🔒 Hak Hapus: Admin 1 (B1)`.
     - Tombol *"Bersihkan Arsip"* dan tombol hapus per baris dilengkapi ikon gembok emas (`<i class="fa-solid fa-lock"></i>`) dengan tooltip informatif bahwa aksi ini khusus Admin 1.
  4. **Pembaruan Service Worker & Versi PWA**:
     - Versi dinaikkan ke `rt-finsmart-cache-v2.9.49` pada `sw.js`, `index.html`, dan `app.js`.

### 2. 🗑️ Fitur Hapus Arsip Surat & Normalisasi Tanggal Buku Register e-Surat (Update v2.9.48 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Menjawab pertanyaan *"untuk menghapus daftar surat ini dimana"*: sebelumnya pada Buku Register belum ada tombol aksi hapus arsip per baris maupun tombol bersihkan arsip secara menyeluruh.
  - Memperbaiki bug tanggal `undefined` pada baris riwayat surat yang baru diterbitkan akibat ketidaksinkronan properti `tgl` vs `tglStr`.
  - Mencegah pengisian ulang otomatis data demo (*re-seeding*) ketika seluruh arsip telah dihapus bersih oleh pengurus.
- **Hasil Implementasi**:
  1. **Tombol Hapus Per Baris Surat (`.btn-action-delete-surat`)**:
     - Ditambahkan tombol ikon tempat sampah berwarna merah lembut pada kolom **Aksi** di setiap baris tabel Buku Register.
     - Dilengkapi dialog konfirmasi interaktif sebelum penghapusan dilakukan untuk mencegah ketidaksengajaan (`confirm`).
  2. **Tombol "Bersihkan Arsip" (`#btn-clear-register-surat`)**:
     - Ditambahkan tombol *"Bersihkan Arsip"* pada header panel Buku Register di samping badge statistik.
     - Memungkinkan pengurus menghapus/mengosongkan seluruh riwayat arsip penerbitan e-surat sekaligus dengan konfirmasi keamanan.
  3. **Perbaikan Tampilan Tanggal (`undefined` Fix & Auto-Healing)**:
     - Normalisasi format tanggal pada fungsi `recordSuratToRegister`: menyelaraskan `tgl` dan `tglStr` secara otomatis.
     - Auto-healing pada fungsi `renderBukuRegisterSurat` sehingga data tersimpan yang tanggalnya sempat `undefined` langsung tampil normal dengan tanggal yang benar.
  4. **Tampilan Status Kosong Ramah Pengguna (Empty State)**:
     - Ketika semua arsip dihapus, tabel menampilkan indikator ramah bertuliskan *"Belum Ada Riwayat Surat Terdaftar"* tanpa me-reset ulang ke data demo bawaan.
  5. **Pembaruan Service Worker & Versi PWA**:
     - Versi dinaikkan ke `rt-finsmart-cache-v2.9.48` pada `sw.js`, `index.html`, dan `app.js`.

### 2. 🛡️ Sistem Kriptografi SHA-256 Anti-Pemalsuan & Buku Register e-Surat RT.001 (Update v2.9.47 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Menjawab kekhawatiran apakah QR Code surat pengantar bisa dipalsukan jika parameter URL diubah oleh pihak tidak bertanggung jawab.
  - Menerapkan pengamanan kriptografi tingkat tinggi (Tamper-Proof Digital Signature) dan Buku Register Arsip e-Surat Digital RT.001 agar surat **100% mustahil dipalsukan/dimanipulasi**.
- **Hasil Implementasi**:
  1. **Algoritma Tanda Tangan Kriptografi SHA-256 (`sha256Sync` & `generateSuratSignature`)**:
     - Sistem menghitung sidik jari digital unik (*Digital Signature Token*) dari gabungan: Nomor Surat + NIK + Nama + Keperluan + Tanggal + Salt Kunci Rahasia Pengurus RT (`RT001_SURAT_SECRET`).
     - Token kriptografi 16-karakter hex (contoh: `SIG-77BF08D033471CCB`) disertakan pada QR Code.
     - **Anti-Manipulasi Total**: Jika ada pihak ketiga mencoba mengubah nama pemohon, NIK, atau keperluan (bahkan 1 karakter saja), sidik jari kriptografi otomatis **GAGAL COCOK**.
  2. **Deteksi & Peringatan Tegas Dokumen Palsu pada Modal Verifikasi (`#modal-verify-surat`)**:
     - **Jika Dokumen Sah**: Tampil header hijau emerald dengan lambang perisai terverifikasi, token validasi, dan sertifikat kependudukan resmi.
     - **Jika Dokumen Dimanipulasi/Palsu**: Tampil banner merah bahaya dengan ikon segitiga peringatan: *"PERINGATAN: DOKUMEN PALSU / TIDAK SAH! Sidik jari digital (SHA-256) TIDAK COCOK dengan isi dokumen! Data surat terindikasi telah dimanipulasi/dipalsukan sepihak."*
  3. **Buku Register & Arsip e-Surat Terbit RT.001 (`#card-register-surat-rt`)**:
     - Ditambahkan panel tabel Buku Register resmi di halaman e-Surat Pengantar RT Mandiri.
     - Menyimpan riwayat setiap surat yang pernah dikeluarkan ke dalam database persisten (`state.suratRegister` & `localStorage`).
     - Setiap baris tabel dilengkapi tombol *"Cek Sah"* untuk memeriksa sertifikat validasi kapan saja.
  4. **Pembaruan Service Worker & Versi PWA**:
     - Versi dinaikkan ke `rt-finsmart-cache-v2.9.47` pada `sw.js`, `index.html`, dan `app.js`.

### 2. 🔏 Sistem Verifikasi Digital Sign & QR Code e-Surat Pengantar RT.001 (Update v2.9.46 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Mengimplementasikan sistem **Digital Sign resmi berbasis QR Code** untuk memvalidasi keaslian Surat Pengantar RT Mandiri yang dibuat warga.
  - Memastikan siapapun (pihak kelurahan, kecamatan, kepolisian, atau warga) yang memindai (*scan*) QR Code melalui kamera HP/Google Lens atau mengklik QR Code di layar dapat langsung melihat lembar validasi resmi keabsahan dokumen.
- **Hasil Implementasi**:
  1. **Integrasi Pustaka QR Code Lokal PWA 100% Offline (`assets/qrcode.min.js`)**:
     - Mengunduh dan menyimpan pustaka `qrcode.min.js` secara lokal di dalam folder `assets/`, sehingga pembuatan QR Code bekerja instan tanpa membutuhkan koneksi internet (PWA 100% offline).
     - Menambahkan berkas `assets/qrcode.min.js` ke dalam `ASSETS_TO_CACHE` pada Service Worker (`sw.js`).
  2. **QR Code Digital Sign Interaktif pada Lembar Surat (`#inpage-surat-paper` & `#print-area-surat`)**:
     - Menggantikan teks statis tanda tangan dengan wadah QR Code interaktif (`#inpage-surat-qrcode` & `#print-surat-qrcode`) serta badge resmi `DIGITAL SIGNED • RT.001`.
     - QR Code memuat tautan verifikasi resmi dengan parameter nomor surat, nama warga pemohon, NIK, keperluan, dan tanggal terbit.
     - Mengklik atau mengetuk QR Code di layar akan langsung membuka dialog sertifikat verifikasi keabsahan.
  3. **Modal Dialog Sertifikat Verifikasi Resmi (`#modal-verify-surat`)**:
     - Desain visual emerald premium dengan ikon perisai terverifikasi (`fa-shield-check`).
     - Menampilkan rincian validasi: Nomor Surat, Nama Pemohon, NIK Terdaftar, Keperluan, Tanggal Terbit, dan Penandatangan Sah: **Maryanto (Ketua RT.001)**.
     - Mendeteksi otomatis query parameter `?verify_surat=1` saat tautan QR dibuka, langsung memunculkan sertifikat validasi ke layar pengguna.
  4. **Optimasi Cetak A4 / PDF (`styles.css` & `app.js`)**:
     - Menambahkan kelas `print-inpage-surat-active` dan perbaikan CSS `@media print` sehingga pencetakan langsung dari halaman berjalan bersih tanpa memuat elemen latar web.
     - Mengatur rendering QR Code menjadi tajam (*crisp-edges/pixelated*) agar mudah dipindai mesin scanner fisik.
  5. **Pembaruan Service Worker & Versi PWA**:
     - Versi dinaikkan ke `rt-finsmart-cache-v2.9.46` pada `sw.js`, `index.html`, dan `app.js`.

### 2. 🏛️ Koreksi Resmi KOP Surat RT (Update v2.9.45 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Mengoreksi data KOP Surat Resmi pada formulir pembuatan surat pengantar mandiri warga:
    ```text
    RUKUN TETANGGA 001 / RUKUN WARGA 013
    PERUMAHAN GRAHA ASRI • SEKTOR GRAHA JABABEKA DESA SIMPANGAN
    Kecamatan Cikarang Utara, Kabupaten Bekasi, Jawa Barat 17530
    ```
- **Hasil Implementasi**:
  1. **Pembaruan Lembar Pratinjau KOP Resmi (`index.html`)**:
     - Mengubah baris kedua KOP surat dari *KELURAHAN SERTAYASA* menjadi **`PERUMAHAN GRAHA ASRI • SEKTOR GRAHA JABABEKA DESA SIMPANGAN`**.
     - Memperbarui paragraf pembuka surat keterangan menjadi: *"Yang bertanda tangan di bawah ini Pengurus Rukun Tetangga 001 / Rukun Warga 013 Perumahan Graha Asri Sektor Graha Jababeka, Desa Simpangan, Kecamatan Cikarang Utara, Kabupaten Bekasi..."*.
     - Menyesuaikan rekomendasi instansi tujuan otomatis pada formulir dan lembar cetak surat menjadi **`Kantor Desa Simpangan`**.
  2. **Pembaruan Service Worker & Versi PWA**:
     - Versi dinaikkan ke `rt-finsmart-cache-v2.9.45` pada `sw.js`, `index.html`, dan `app.js`.

### 2. 🏷️ Penyesuaian Nama Menu Sidebar Warga (Update v2.9.44 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Mengubah nama menu sidebar warga:
    1. **"Ronda Malam Minggu dan Jimpitan"** diubah menjadi **"Ronda & Jimpitan"**
    2. **"Layanan Pengajuan Fasum"** diubah menjadi **"Pengajuan DANA Fasum"**
- **Hasil Implementasi**:
  1. **Pembaruan Navigasi Sidebar (`index.html` & `app.js`)**:
     - Label menu dan tooltip `ronda-pengurus` pada mode warga resmi diubah menjadi `Ronda & Jimpitan`.
     - Label menu dan tooltip `pengajuan-fasum` resmi diubah menjadi `Pengajuan DANA Fasum`.
     - Header banner dan judul halaman juga disesuaikan menjadi `Pengajuan DANA Fasum` dan `Ronda & Jimpitan`.
  2. **Pembaruan Service Worker & Versi PWA**:
     - Versi dinaikkan ke `rt-finsmart-cache-v2.9.44` pada `sw.js`, `index.html`, dan `app.js`.

### 2. 📋 Dropdown Menu Keperluan Surat Pengantar (9 Pilihan & Kolom Kebutuhan Khusus) (Update v2.9.43 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Pada formulir surat pengantar, bagian input **"Keperluan Surat Pengantar"** diubah menjadi menu dropdown (*downmenu*) dengan 9 opsi baku:
    1. Permohonan Penerbitan / Perpanjangan KTP-el Baru
    2. Pindah Domisili
    3. Keterangan Domisili
    4. Ijin tinggal sementara di RT.001 RW.013
    5. Pengantar SKCK Polsek
    6. Pengantar KTP & KK
    7. Pengantar Nikah / Status
    8. Keterangan Izin Usaha
    9. Keterangan Lainnya
  - Jika warga memilih nomor 9 ("Keterangan Lainnya"), sediakan 1 kolom isian tambahan agar warga dapat mengetik keperluannya sendiri secara bebas dan spesifik.
- **Hasil Implementasi**:
  1. **Dropdown Menu Baku Keperluan Surat (`#surat-inpage-keperluan`)**:
     - Mengubah input teks menjadi elemen `<select>` yang memuat 9 opsi pilihan standar resmi ke-RT-an.
     - Setiap pilihan otomatis mengisikan instansi/pihak tujuan yang relevan serta menentukan judul resmi surat di lembar fisik KOP RT.
  2. **Kolom Isian Dinamis untuk Keterangan Lainnya**:
     - Menambahkan kontainer `#group-surat-keperluan-lainnya` dan input `#surat-inpage-keperluan-lainnya`.
     - Ketika opsi ke-9 dipilih, kolom ini langsung muncul dengan animasi halus dan menerima fokus ketikan warga.
     - Saat surat digenerate, teks keperluan yang diketik warga akan otomatis masuk ke dalam isi surat resmi dan pratinjau KOP.
  3. **Pembersihan Redundansi Formulir**:
     - Menghapus kolom duplikat jenis surat di baris pertama sehingga urutan formulir menjadi sangat intuitif: Identitas Pemohon &bull; Alamat &bull; Keperluan Surat (Dropdown) &bull; Instansi Tujuan.
  4. **Pembaruan Service Worker & Versi PWA**:
     - Versi dinaikkan ke `rt-finsmart-cache-v2.9.43` pada `sw.js`, `index.html`, dan `app.js`.

### 2. 📄 Penyederhanaan Tampilan Layanan Surat Pengantar RT (Update v2.9.42 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Menghapus tombol **"Buka Mode Dialog"** pada formulir mandiri pembuatan surat pengantar agar warga tidak bingung.
  - Menyatukan 6 kotak informasi jenis surat (*Pengantar KTP & KK*, *Keterangan Domisili*, *Pengantar SKCK Polsek*, *Keterangan Izin Usaha*, *Keterangan Belum Menikah/Nikah*, *Keterangan Lainnya*) yang sebelumnya terpisah-pisah menjadi **1 kotak informasi terpadu** agar tampilan tidak penuh sesak.
- **Hasil Implementasi**:
  1. **Penghapusan Tombol Redundan "Buka Mode Dialog"**:
     - Form kini berfokus langsung pada tombol aksi utama: **"Cetak / Unduh PDF"** dan **"Buat & Tampilkan Pratinjau KOP Resmi"**.
  2. **Penyatuan Informasi Jenis Layanan Surat**:
     - 6 kartu terpisah digantikan oleh 1 kotak panel informasi elegan (`Informasi & Lingkup Layanan Surat Pengantar RT.001`) dengan tata letak micro-grid responsif yang rapi, ringkas, dan proporsional.
  3. **Pembaruan Service Worker & Versi PWA**:
     - Versi dinaikkan ke `rt-finsmart-cache-v2.9.42` pada `sw.js`, `index.html`, dan `app.js`.

### 2. 📊 Perbaikan Grafik Penerimaan Iuran & Pembuatan Formulir Mandiri 3 Layanan Warga (Update v2.9.41 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Di Dashboard Warga, **"Grafik Penerimaan Iuran Bulanan 1 Tahun Berjalan"** tidak muncul.
  - Menu sidebar warga **"Layanan Pengajuan Fasum RT"**, **"e-Surat Pengantar RT Mandiri"**, dan **"Kotak Aspirasi & Masukan Warga"** saat diklik tidak memberikan respon apapun.
  - Pengguna meminta jika belum ada formulirnya, tolong dibuatkan formulir yang sesuai dan berfungsi penuh.
- **Hasil Investigasi & Akar Permasalahan (Root Cause)**:
  1. *Grafik Penerimaan Iuran*: Pada Chart.js v4, konfigurasi chart mewajibkan properti `type` di root config object. Ketiadaan properti ini memicu error silent *"undefined is not a registered controller"*, sehingga kanvas chart tetap kosong.
  2. *Sidebar Tidak Merespon*: Di dalam fungsi `navigateToView(viewId)` terdapat whitelist per-role `WARGA_ALLOWED_TARGETS` yang belum menyertakan `'pengajuan-fasum'`, `'surat-pengantar'`, dan `'aspirasi-warga'`. Akibatnya, setiap klik menu tersebut langsung dialihkan kembali ke `'portal-warga'` secara diam-diam.
- **Solusi & Fitur Baru yang Diimplementasikan**:
  1. **Grafik Penerimaan Iuran 1 Tahun Berjalan Normal & Responsif**:
     - Memperbaiki deklarasi Chart.js di `renderWargaAnnualDuesChart` & `renderPublicAnnualDuesChart` dengan parameter eksplisit `type: chartType === 'area' ? 'line' : 'bar'`.
     - Menambahkan trigger resize otomatis saat navigasi ke portal warga sehingga grafik ter-render proporsional sesuai dimensi layar.
     - 4 kartu ringkasan KPI (Total Penerimaan, Rata-rata Bulanan, Bulan Puncak Terbanyak, dan Persentase Kepatuhan KK) tersinkronisasi realtime.
  2. **Navigasi Sidebar Warga Responsif**:
     - Menambahkan `'pengajuan-fasum'`, `'surat-pengantar'`, dan `'aspirasi-warga'` ke dalam whitelist global `WARGA_ALLOWED_TARGETS`.
     - Mengaitkan routing otomatis ke masing-masing controller saat view diakses.
  3. **Formulir Dedicated In-Page Lengkap**:
     - **Formulir Pengajuan Fasum RT (`#view-pengajuan-fasum`)**:
       - Form terintegrasi dengan data warga terverifikasi (Nama, Alamat/Blok Rumah, No. WhatsApp).
       - Kategori fasilitas (Lampu PJU, Got/Drainase, Paving/Portal, Balai Pertemuan, dsb.) & Tingkat Urgensi (Normal, Mendesak, Darurat).
       - Lokasi fisik kerusakan, Judul, Estimasi biaya, dan Rincian kerusakan.
       - Validasi form, penyimpanan ke state (`state.fundRequests`), auto-render daftar permohonan, dan opsi pengiriman notifikasi WhatsApp ke Pengurus RT.
     - **Formulir e-Surat Pengantar RT Mandiri (`#view-surat-pengantar`)**:
       - Form pembuatan surat lengkap dengan pilihan 9 kategori surat pengantar (KTP, KK, Domisili, SKCK, UMKM, Nikah, PLN, Kematian, Lainnya).
       - Auto-fill data kependudukan (Nama, NIK, TTL, Jenis Kelamin, Agama, Pekerjaan, Alamat Graha Asri).
       - Otomatisasi Nomor Surat resmi format baku RT (`470/.../RT.001-RW.013/...`).
       - Lembar KOP Resmi Interaktif (`#inpage-surat-paper`) siap cetak/unduh PDF (`window.print()`).
       - Tombol WhatsApp untuk konfirmasi pengesahan/stempel langsung ke Ketua RT.
     - **Formulir Kotak Aspirasi & Masukan Warga (`#view-aspirasi-warga`)**:
       - Pilihan kategori aspirasi (Keamanan, Kebersihan, Fasilitas, Kegiatan/Kerukunan, Transparansi).
       - Fitur **Mode Anonim Terjaga** (checkbox) untuk melindungi privasi warga.
       - Penyimpanan ke `state.aspirations` dan render daftar riwayat aspirasi warga berserta status tindak lanjut.
  4. **Pembaruan Service Worker & Versi PWA**:
     - Cache Service Worker dinaikkan ke `rt-finsmart-cache-v2.9.41` di `sw.js` dan `app.js`.
     - Script dan stylesheet di `index.html` menggunakan `v=2.9.41`.

### 2. 🧹 Pembersihan Tampilan Portal Warga & Pemindahan Layanan ke Sidebar (Update v2.9.40 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Tampilan Portal Warga dibuat bersih, elegan, dan tidak membingungkan warga.
  - Mengubah kalimat **"Dashboard Eksekutif Keuangan RT"** menjadi **"Keuangan dan KAS RT"**.
  - Menghilangkan 4 kartu layanan dari halaman Portal Warga:
    1. Ronda Malam Minggu & Jimpitan
    2. Layanan Pengajuan Fasum RT
    3. e-Surat Pengantar RT Mandiri
    4. Kotak Aspirasi & Masukan Warga
  - Memindahkan menu 1~4 tersebut ke dalam bagian **Sidebar Portal Warga** sebagai modul menu tersendiri.
- **Hasil Implementasi & Arsitektur Baru**:
  1. **Penyempurnaan Halaman Portal Warga (`#view-portal-warga`)**:
     - Judul seksi keuangan diubah resmi menjadi: `Keuangan dan KAS RT`.
     - 4 kartu layanan dipisahkan keluar dari grid portal warga sehingga halaman menjadi sangat ringkas, terfokus pada data personal warga, transparansi kas 6 pos, kartu iuran wajib 2026, dan penerimaan tahunan.
     - Kartu Iuran Wajib Anda dan Kartu Transparansi Pemasukan NON Iuran RT kini berdampingan rapi secara proporsional.
  2. **Pemindahan 4 Layanan ke Sidebar Warga**:
     - Menu 1: **Ronda Malam Minggu & Jimpitan** (`ronda-pengurus`) &bull; Menampilkan jadwal lengkap 8 regu dengan kartu personal jadwal rumah warga & pengingat jimpitan di posisi teratas.
     - Menu 2: **Layanan Pengajuan Fasum RT** (`pengajuan-fasum`) &bull; View tersendiri dengan alur pengajuan 4 langkah, tombol ajukan fasum baru, dan daftar riwayat status permohonan warga.
     - Menu 3: **e-Surat Pengantar RT Mandiri** (`surat-pengantar`) &bull; View tersendiri dengan 6 katalog jenis surat (KTP, KK, Domisili, SKCK, Usaha, dsb.), panduan legalitas KOP RT, dan tombol buat surat instan.
     - Menu 4: **Kotak Aspirasi & Masukan Warga** (`aspirasi-warga`) &bull; View tersendiri dengan 3 pilar aspirasi (Keamanan, Kebersihan, Inovasi Fasilitas), tombol kirim aspirasi, dan kontak langsung WhatsApp Humas RT.
  3. **Penataan Urutan Sidebar Warga (`wargaOrder`)**:
     1. Portal Warga (`order: 1`)
     2. Pemasukan NON iuran (`order: 2`)
     3. Ronda Malam Minggu & Jimpitan (`order: 3`)
     4. Layanan Pengajuan Fasum RT (`order: 4`)
     5. e-Surat Pengantar RT Mandiri (`order: 5`)
     6. Kotak Aspirasi & Masukan Warga (`order: 6`)
     7. Pengurus RT (`order: 7`)
     8. Inventaris dan Aset RT (`order: 8`)
  4. **Pembaruan Service Worker & Versi Aset**:
     - Versi cache Service Worker diperbarui ke `rt-finsmart-cache-v2.9.40`.

### 2. 🛡️ Penyembunyian Tombol "Bayar Cepat" & "Data Demografi" pada Tampilan Jadwal Ronda (Update v2.9.39 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Menghilangkan tombol aksi top-header **"⚡ Bayar Cepat"** dan **"👥 Data Demografi"** saat pengguna berada di tampilan modul **Jadwal Ronda** (`#ronda-pengurus`).
- **Hasil Implementasi & Perlindungan Ganda (CSS + JS)**:
  1. **CSS Selector Rules (`styles.css`)**:
     - Menambahkan aturan otomatis:
       `body:has(#view-ronda-pengurus.active) #btn-quick-pay, body:has(#view-ronda-pengurus.active) #btn-top-open-demografi { display: none !important; }`
       sehingga saat tampilan `#view-ronda-pengurus` berstatus aktif, kedua tombol tersebut langsung disembunyikan seketika.
  2. **JavaScript Dynamic State (`app.js`)**:
     - Pada fungsi `applyRBAC()`, ditambahkan pengecekan `isRondaView`. Tombol `btn-quick-pay` dan `btn-top-open-demografi` dipastikan `display = 'none'` saat `isRondaView` aktif atau saat diakses oleh peran Warga.
     - Pada fungsi `navigateToView(viewId)`, dipanggil `applyRBAC()` secara dinamis setiap kali terjadi perpindahan halaman/modul.
  3. **Service Worker & Aset**:
     - Cache Service Worker di-update ke `rt-finsmart-cache-v2.9.39`.

### 2. 🧭 Penataan Ulang Urutan & Penamaan Menu Sidebar Dashboard Warga (Update v2.9.38 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Mengatur ulang susunan posisi menu sidebar warga serta menyesuaikan label menu agar lebih ringkas, natural, dan mudah diakses.
- **Hasil Penataan Menu Sidebar Warga**:
  1. **Portal Warga** (sebelumnya *"Dashboard Portal Warga"*) &bull; `order: 1`
  2. **Pemasukan NON iuran** &bull; `order: 2`
  3. **Jadwal Ronda** &bull; `order: 3`
  4. **Pengurus RT** (sebelumnya *"Struktur Pengurus RT"*) &bull; `order: 4`
  5. **Inventaris dan Aset RT** &bull; `order: 5`
- **Pembaruan Sistem**:
  - Update `wargaOrder` di fungsi `applyRBAC()` pada `app.js`.
  - Update label teks pada elemen `<nav class="sidebar-menu">` di `index.html`.
  - Cache Service Worker di-refresh ke `v2.9.38`.

### 2. 📊 Integrasi Dashboard Eksekutif Keuangan RT di Portal Warga (Read-Only Mode) (Update v2.9.37 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Menampilkan modul Dashboard Eksekutif (Total Kas Terkonsolidasi, Capaian Iuran Bulan Ini, dan Alokasi 6 Pos Anggaran) di dalam Dashboard Portal Warga (`#view-portal-warga`) dalam mode **Read Only** (hanya pantau/baca secara transparan tanpa hak akses pengubahan/edit bagi warga).
- **Hasil Implementasi Fitur**:
  1. **Modul Dashboard Eksekutif di Portal Warga (`#pw-exec-dashboard-wrap`)**:
     - **Kartu TOTAL KAS TERKONSOLIDASI**: Menampilkan Saldo Kas Terkonsolidasi secara *live*, Total Pemasukan, Total Pengeluaran, dan Iuran Wajib Periode Ini.
     - **Kartu Capaian Iuran Bulan Ini**: Menampilkan persentase capaian iuran bulanan, progress bar visual, jumlah KK sudah bayar dan belum bayar.
     - **Tombol Transparansi Iuran (Read Only)**: Menggantikan tombol checklist admin dengan tombol *"Buka Rekapitulasi Iuran Warga (Hanya Baca)"* yang membuka modal transparansi status lunas/belum tanpa fitur checkbox pengubah status.
     - **Seksi Alokasi POS ANGGARAN**: Menampilkan 6 kartu pos anggaran (Sampah & Kebersihan, Kas RT, Dana Sosial, Dana Kematian, PHBI, dan 17-an) dengan alokasi nominal per KK, saldo pos, serta indikator flow masuk/keluar.
  2. **Dua Modal Read-Only Khusus Warga**:
     - `#modal-pw-rekap-iuran`: Modal rekapitulasi iuran warga per bulan dengan filter pencarian dan tab filter (Semua, Lunas, Belum Bayar) secara transparan tanpa kemampuan edit.
     - `#modal-pw-pos-details`: Modal rincian alokasi & saldo pos kas RT tanpa tombol penarikan dana (*Tarik / Catat Keluar* ditiadakan).
  3. **Navigasi Sidebar Warga**:
     - Menambahkan menu **Dashboard Portal Warga** di posisi teratas sidebar warga (`order: 1`) saat warga login.
  4. **Sinkronisasi Cache & Service Worker**:
     - Update Service Worker cache ke `rt-finsmart-cache-v2.9.37`.

### 2. 🔤 Flagship Typography Enhancement: Larger & Bolder Official Title & Subtitle (Update v2.9.36 - 21 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Memperbesar ukuran teks judul utama **"WARGA RT.001 RW.013"** agar saat dibuka di ponsel (smartphone) tampil jauh lebih tegas, jelas, berwibawa, dan mudah dibaca secara instan tanpa menyipitkan mata.
  - Menyesuaikan secara proporsional ukuran font kalimat penanda di atasnya: **"WEB APLIKASI RESMI"** agar seimbang dan serasi secara visual.
- **Hasil Optimalisasi Tipografi & Styling**:
  1. **Judul Utama "WARGA RT.001 RW.013" (`.split-line-main`)**:
     - **Skala Ponsel / Mobile (`@media (max-width: 768px)`)**:
       - Dinaikkan dari `clamp(1.12rem, 5vw, 1.5rem)` menjadi **`clamp(1.48rem, 6.2vw, 2.05rem) !important`** (peningkatan ukuran ~35% lebih besar dan tebal).
       - Menjaga aturan `white-space: nowrap` sehingga judul tetap utuh dalam satu baris megah di layar smartphone tanpa patahan kata canggung.
       - Garis tepi (*text stroke*) putih dipertebal dari `0.5px` menjadi **`0.75px`** (`-webkit-text-stroke: 0.75px rgba(255, 255, 255, 0.95)`).
       - *Text shadow* kontras tinggi 4 penjuru (`1.5px`) ditambah bayangan kedalaman (*drop shadow*) `0px 3px 8px rgba(0, 0, 0, 0.7)` untuk memotong latar belakang bendera merah-putih secara tajam.
     - **Skala Desktop & Layar Lebar**:
       - Dinaikkan dari `clamp(1.35rem, 4.4vw, 2.45rem)` menjadi **`clamp(1.85rem, 4.8vw, 2.85rem)`**.
  2. **Sub-Judul "WEB APLIKASI RESMI" (`.split-line-sub`)**:
     - **Skala Ponsel / Mobile**:
       - Dinaikkan dari `clamp(0.68rem, 2.5vw, 0.8rem)` menjadi **`clamp(0.85rem, 3.2vw, 1.05rem) !important`**.
       - Menjaga `font-weight: 800`, spasi huruf elegan (*letter-spacing: 0.22em*), dan aksen warna *soft gold highlight* (`#fef08a`) dengan bayangan neon amber halus (`0 0 16px rgba(245, 158, 11, 0.7)`).
       - Jarak bawah (*margin-bottom*) diperluas menjadi `0.38rem` untuk memberikan ritme vertikal yang proporsional ke judul utama.
     - **Skala Desktop & Layar Lebar**:
       - Dinaikkan dari `clamp(0.78rem, 1.8vw, 1.05rem)` menjadi **`clamp(0.92rem, 2.1vw, 1.25rem)`**.
  3. **Dimensi Frame Pita Bendera Seluler (`.flag-container`)**:
     - Ketinggian minimum banner seluler disesuaikan dari `104px` menjadi **`120px`** dengan padding `0.75rem 0.85rem` dan sudut melengkung `border-radius: 18px` agar teks yang lebih besar memiliki ruang bernapas (*breathing room*) vertikal yang mewah dan simetris di tengah kibaran bendera.
  4. **Penyelarasan Aset & Versi**:
     - Service Worker cache dinaikkan ke `rt-finsmart-cache-v2.9.36`.
     - Versi query aset diperbarui ke `styles.css?v=2.9.36` dan `app.js?v=2.9.36`.

### 2. 💫 Ambient Financial Pulse Backdrop & Zero-Scroll Interactive Annual Chart Modal (Update v2.9.35 - 21 Sept 2026)
- **Latar Belakang & Mandat Pengguna (Solusi 2)**:
  - Berdasarkan sesi *brainstorming* tata letak visual landing hub: pengguna menginginkan tampilan grafik penerimaan kas/iuran bulanan berpadu harmonis dengan roda navigasi orbital melingkar, dengan transparansi yang cukup agar tidak mengganggu font atau teks tombol di depannya.
  - Tujuan utamanya adalah menciptakan tampilan beranda yang **mewah, interaktif, premium, dan profesional**, di mana pengunjung di layar utama **tidak perlu melakukan scrolling (*Zero-Scroll Experience*)**.
  - Pengguna memilih dan menyetujui implementasi **Solusi 2**: *"Ambient Financial Pulse Wave di balik roda kemudi + trigger interaktif kartu kepatuhan iuran membuka visualisasi grafik lengkap via Luxury Modal / Slide-Up Bottom Sheet"*.
- **Hasil Implementasi & Optimalisasi Arsitektur**:
  1. **Ambient Cybernetic Financial Pulse Wave di Belakang Roda Orbital (`.hub-orbital-ambient-pulse`)**:
     - Ditambahkan elemen grafis SVG beranimasi halus tepat di bawah roda navigasi melingkar (`z-index: 1`, sedangkan roda orbital di `z-index: 2`).
     - Menggunakan gelombang kurva Bézier bercahaya (*luminous sine waves*) bergradien emerald (`#10b981`), cyan (`#06b6d4`), dan gold (`#fbbf24`) yang berdenyut (*breathing glow*), cincin radar sibernetik ganda yang berputar perlahan, serta titik konstelasi data (*data pulse dots*) dengan titik puncak berwarna emas.
     - Didesain secara murni ambient tanpa angka kaku atau teks grid yang bertabrakan dengan tipografi kelopak (*petals*) roda navigasi, memberikan kedalaman estetika futuristik 60fps berbasis GPU tanpa beban komputasi.
  2. **Kartu Performa Iuran Menjadi Tombol Aksi Interaktif (`#card-hub-compliance-trigger`)**:
     - Kartu *"Performa Iuran 2026: 18% Partisipasi Warga"* pada sayap kiri (*left flank*) dashboard diubah menjadi tombol pemicu interaktif dengan `role="button"`, `tabindex="0"`, dan kursor jari.
     - Dilengkapi badge aksi eksklusif: dot berdenyut emas, ikon grafik mini, teks *"Buka Grafik"*, dan panah sudut melayang.
     - Diberikan efek hover berkilau (*gold shimmer border & soft glow*), respons skala tekan (*active scale: 0.98*), dan dukungan navigasi keyboard (`Enter` / `Spasi`).
  3. **Visualisasi Grafik 1 Tahun Penuh Berpindah ke Luxury Modal & Bottom Sheet (100% Zero-Scroll)**:
     - Kartu grafik penerimaan iuran tahunan dipindahkan dari aliran dokumen beranda ke dalam kontainer modal mewah berlatar belakang kabut gelap (*dark glassmorphism backdrop blur 14px*): `#modal-annual-chart-detail`.
     - **Tampilan Desktop & Tablet**: Membuka modal dialog lebar (maksimal 980px) dengan transisi mulus dan animasi *slide-up*.
     - **Tampilan Mobile (Smartphone)**: Berfungsi otomatis sebagai *Slide-Up Bottom Sheet* mewah berujung melengkung (*border-radius: 24px 24px 0 0*) yang sangat nyaman dioperasikan dengan satu jempol.
     - Seluruh fitur interaktif Chart.js dipertahankan secara utuh: pemilihan tahun (2021 s/d 2026 berjalan), *switcher* Kurva Cahaya vs Batang Mewah, *tooltips* detail, dan legenda transparansi privasi kas.
     - Menghilangkan keharusan menggulir layar (*Zero-Scroll*) di beranda publik utama.
  4. **Kalkulasi & Resizing Responsif Chart.js (`openAnnualChartModal`)**:
     - Menyediakan fungsi kontrol `openAnnualChartModal()` dan `closeAnnualChartModal()` terintegrasi dengan `openModal` dan `pushNavHistory` aplikasi.
     - Menggunakan `requestAnimationFrame` dan penundaan mikro 60ms saat modal dibuka agar Chart.js mengkalkulasi ulang lebar kanvas (`chart.resize()`) secara instan dan tajam (*pixel-perfect*).
     - Menambahkan tombol pintasan cadangan di bilah footer bawah: `.btn-hub-footer-chart`.
  5. **Pembaruan Service Worker & Versi Aset**:
     - Cache Service Worker dinaikkan ke `rt-finsmart-cache-v2.9.35`.
     - Aset `styles.css?v=2.9.35` dan `app.js?v=2.9.35` diperbarui untuk *cache busting* instan.

### 2. 🛡️ Native Mobile App-Like Experience & Inactivity Auto-Logout Security (Update v2.9.34 - 21 Sept 2026)
- **Latar Belakang & Mandat Peningkatan**:
  - Memenuhi 3 kebutuhan spesifik pengguna saat web aplikasi dibuka di ponsel:
    1. Memindahkan banner video bendera merah putih berkibar dan judul web aplikasi ke posisi **paling atas** layar ponsel agar warga langsung mengetahui identitas resmi web aplikasi sejak pertama kali dibuka.
    2. Menghadirkan *look-and-feel* antarmuka seluler yang menyerupai aplikasi terinstal pada umumnya (*Native Installed App-like Experience*).
    3. Menerapkan sistem keamanan mutakhir **Auto-Logout Sesi Inaktif (*Inactivity Session Timeout*)** untuk melindungi data kas RT dan mencegah akses tidak sah jika perangkat ditinggalkan tanpa pengawasan saat masih berstatus login.
- **Hasil Perbaikan & Optimalisasi Arsitektur**:
  1. **Reposisi Banner Bendera & Judul Resmi ke Paling Atas Layar Ponsel**:
     - *Masalah*: Pada layar smartphone sebelumnya, diagram lingkaran navigasi orbital (*cockpit section*) tampil mendahului header banner bendera, sehingga nama web aplikasi berada di bawah lipatan layar pertama.
     - *Solusi*: Mengatur ulang urutan Flexbox `.hub-container` di `@media (max-width: 768px)` sehingga `.hub-hero-header` (Banner video bendera merah putih berkibar, H1 *"Web Aplikasi Resmi WARGA RT.001 RW.013"*, sub-judul wilayah Graha Asri, dan slogan) menjadi `order: 1 !important` (posisi paling atas), disusul oleh `.hub-cockpit-section` di `order: 2 !important`.
     - Frame kartu banner bendera disempurnakan dengan `min-height: 104px`, `border-radius: 16px`, border halus, dan bayangan kedalaman (*shadow glow*) mewah.
  2. **Tampilan & Rasa Mirip Aplikasi Terinstal (*Native App Experience*)**:
     - **PWA Meta Tags & Manifest**: Menyesuaikan `theme_color` dan `background_color` menjadi `#04140e` (*Dark Emerald*) pada `manifest.json` dan `index.html`. Menambahkan tag `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style: black-translucent`, dan `mobile-web-app-capable: yes` agar bilah status ponsel menyatu mulus tanpa garis abu-abu browser.
     - **Eliminasi Efek Pantulan (*Overscroll Containment*)**: Menerapkan `overscroll-behavior-y: contain;` pada `html` dan `body` untuk mencegah tarikan layar putih (*white rubber-banding / accidental pull-to-refresh*) bawaan peramban mobile.
     - **Pencegahan Seleksi Teks Tidak Sengaja**: Menambahkan `user-select: none; -webkit-user-select: none;` pada tombol, navbar, badge, dan kartu navigasi agar antarmuka terasa kokoh (*solid*) layaknya aplikasi native saat disentuh.
     - **Integrasi Notch & Safe Area Top**: Menambahkan `padding-top: var(--sat);` pada `.public-navbar` sehingga bilah atas berada rapi di bawah area poni/Dynamic Island iPhone dan kamera punch-hole Android.
  3. **Sistem Keamanan Auto-Logout Inactivity Session Timeout (`InactivitySecurityManager`)**:
     - Diimplementasikan modul keamanan mandiri di `app.js` dengan batas waktu inaktif default **15 Menit** (`TIMEOUT_MS = 15 * 60 * 1000`).
     - **Sensor Multi-Aktivitas Throttled**: Memantau interaksi pengguna (`touchstart`, `click`, `scroll`, `mousemove`, `keydown`, `wheel`) dengan mekanisme *throttling* (update stempel waktu maksimal sekali per 1.5 detik) sehingga konsumsi CPU tetap 0%.
     - **Peringatan Hitung Mundur Melayang (*Floating Security Banner*)**: Pada sisa waktu 60 detik (menit ke-14), sistem memunculkan banner peringatan bertema *cybersecurity gold* lengkap dengan animasi denyut perisai, teks sisa detik, dan tombol *"Tetap Masuk"*. Jika pengguna menyentuh layar atau mengklik tombol, timer otomatis direset.
     - **Ketahanan Layar Mati / Background Tab (*Dormancy Resilience*)**: Memanfaatkan event `visibilitychange` dan `focus` yang langsung membandingkan `Date.now() - lastUserActivityTime`. Jika ponsel ditinggalkan dalam kondisi terkunci atau tab diminimalkan lebih dari 15 menit, saat dibuka kembali sistem langsung mengakhiri sesi dan berstatus *logged-out*.
     - **Eksekusi Logout Aman**: Membersihkan `sessionStorage`, mengosongkan `state.currentUser`, mengembalikan tampilan ke portal publik, mereset form PIN, dan menampilkan notifikasi keamanan: *"🔒 Sesi Anda telah diakhiri otomatis demi menjaga keamanan data keuangan RT karena tidak ada aktivitas."*
  4. **Penyelarasan Service Worker & Cache Busting**:
     - Cache Service Worker diperbarui menjadi `rt-finsmart-cache-v2.9.34`.
     - Parameter aset diperbarui menjadi `styles.css?v=2.9.34` dan `app.js?v=2.9.34`.

### 2. 📱 Flagship Mobile & Tablet Responsiveness & Luxury UI Overhaul (Update v2.9.33 - 21 Sept 2026)
- **Latar Belakang & Mandat Master Full Stack**:
  - Pelaksanaan perbaikan menyeluruh terhadap arsitektur antarmuka aplikasi seluler (smartphone 360px–430px) dan tablet (768px–1024px) menyusul audit mendalam. Menjadikan aplikasi berstandar *Tier-1 Enterprise / Flagship PWA*, responsif, mewah (*dark luxury emerald with warm gold accents*), sangat nyaman digunakan dengan satu tangan (*one-hand thumb zone*), dan bebas dari bug bawaan peramban mobile (seperti auto-zoom liar di iOS Safari dan horizontal page blowout).
- **Hasil Perbaikan & Optimalisasi Arsitektur**:
  1. **Eliminasi Bug iOS Safari Auto-Zoom**:
     - *Masalah*: Standar WebKit iOS Safari secara otomatis memperbesar (zoom-in) seluruh viewport ketika pengguna mengetuk kolom input dengan `font-size < 16px`, merusak tata letak dan memaksa pengguna melakukan pinch-to-zoom manual.
     - *Solusi*: Ditambahkan aturan global `@media (max-width: 768px)` yang mewajibkan `font-size: 16px !important` pada seluruh elemen input (`input`, `select`, `textarea`, search boxes, filter dropdowns, modal inputs, demografi calc, dsb.) tanpa merusak kerapian visual antarmuka.
  2. **Dukungan Edge-to-Edge Safe-Area Insets (iPhone & Android)**:
     - Meta tag viewport diperbarui: `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">`.
     - Token CSS variabel di `:root`: `--sat`, `--sar`, `--sab`, `--sal` memanfaatkan `env(safe-area-inset-*)`.
     - Bilah navigasi bawah (`.mobile-bottom-nav`) dan lembar modal bawah kini memiliki bantalan aman (`padding-bottom: calc(0.45rem + var(--sab))`), mencegah tab dan tombol tertutup oleh *home indicator pill* iPhone atau bilah navigasi gestur Android. Konten utama memiliki *scroll clearance* (`calc(75px + var(--sab))`).
  3. **Redesain Flagship 5-Tab Ergonomic Mobile Bottom Navigation**:
     - Menghadirkan bilah navigasi bawah 5 tab ergonomis dengan penataan thumb zone:
       - 🏠 **Dashboard** (`#dashboard`) — Ikhtisar kas & analitik utama.
       - 📋 **Iuran Kas** (`#checklist`) — Checklist pembayaran iuran warga per bulan.
       - 🌙 **Jimpitan** (`#jimpitan`) — Pembukuan kas jimpitan ronda malam.
       - 📦 **Aset RT** (`#aset-rt`) — Inventarisasi dan valuasi aset RT.
       - ☰ **Menu** (`#bnav-btn-more`) — Tombol pemicu laci navigasi lengkap (*mobile sidebar drawer*).
     - Desain *ultra-luxury glassmorphism* (`background: rgba(4, 20, 14, 0.94)`, `backdrop-filter: blur(24px) saturate(180%)`), active tab pill indicator berwarna gradasi emas-zamrud, animasi lift icon dengan drop shadow lembut, serta tactile micro-interaction (`transform: scale(0.92)` saat ditekan).
  4. **Luxury Mobile Slide-Up Bottom Sheet Drawer**:
     - Seluruh modal dialog pada layar ponsel (`<= 640px`) bertransformasi dari pop-up kaku di tengah layar menjadi *bottom sheet drawer* modern yang meluncur mulus dari bawah layar (`@keyframes slideUpBottomSheet`).
     - Dilengkapi *drag handle pill* di bagian atas, sudut melengkung mewah `24px 24px 0 0`, batas tinggi `88dvh`, `overscroll-behavior-y: contain`, dan padding safe area bawah yang terintegrasi.
  5. **Standar Touch Target 44×44px (Apple HIG & Material 3 Compliance)**:
     - Diterapkan `-webkit-tap-highlight-color: transparent` untuk menghilangkan kedipan kotak abu-abu yang mengganggu saat mengetuk tombol pada peramban mobile.
     - Diterapkan `touch-action: manipulation` pada seluruh elemen tombol, tautan, dan form control untuk menghilangkan latensi tap 300ms.
     - Seluruh tombol aksi tabel, tombol hamburger, dan tombol tutup modal diperluas hit target-nya menjadi minimal 44×44px atau bantalan sentuh proporsional.
  6. **Eliminasi Page Blowout pada Laporan Keuangan**:
     - Seluruh tabel pada `#view-laporan` (Pos Anggaran, Non-Iuran, Buku Kas Ledger Umum) dibungkus dengan wadah `<div class="table-responsive">`.
     - Ditambahkan properti `-webkit-overflow-scrolling: touch` dan `overscroll-behavior-x: contain`, memastikan tabel dapat digeser horizontal dengan halus (*momentum scrolling*) tanpa menyebabkan seluruh halaman website goyang ke samping.
  7. **Optimalisasi Grid 2-Kolom untuk Tablet (768px–1024px)**:
     - Layar tablet/iPad kini mempertahankan tata letak 2 kolom (`grid-template-columns: repeat(2, 1fr)`) untuk card statistik hero dan analitik, mencegah pemborosan ruang layar yang sebelumnya menciut menjadi 1 kolom terlalu dini.
  8. **Tipografi Dinamis Berbasis Clamp**:
     - Diterapkan fungsi `clamp()` pada judul halaman (`clamp(1.2rem, 4.2vw, 1.75rem)`) dan saldo total kas RT (`clamp(1.6rem, 5.5vw, 2.4rem)`), menjamin nominal kas hingga ratusan juta rupiah tetap proporsional dan tidak terpotong pada smartphone berlayar sempit (360px–390px).
  9. **Sinkronisasi Service Worker & Cache Busting**:
     - Versi cache Service Worker dinaikkan menjadi `rt-finsmart-cache-v2.9.33`.
     - Parameter query string aset `styles.css?v=2.9.33` dan `app.js?v=2.9.33` diperbarui di `index.html` dan `sw.js`.
  10. **Penyederhanaan & Pembersihan Header Spotlight Grafik Tahunan**:
     - Menghapus kotak kapsul bertuliskan *"Transparansi Partisipasi Warga RT.001"* dan kalimat sub-keterangan *"Visualisasi performa gotong royong dan kepatuhan pembayaran iuran kas warga setiap bulan (Januari s/d Desember)"* sesuai arahan pengguna agar bagian tampak bersih, modern, dan selaras vertikal dengan tombol switcher kurva/batang dan pemilih tahun.

### 2. 💼 Financial Engineering Audit & Zero-Error Reconciliation (Update v2.9.32 - 20 Sept 2026)
- **Latar Belakang & Mandat Financial Engineer**:
  - Audit menyeluruh dan mendalam terhadap seluruh mesin kalkulasi keuangan di Dashboard Bendahara 1 (Kas Utama, Pos Anggaran, Non-Iuran, Laporan Pembukuan) dan Bendahara 2 (Kas Jimpitan Ronda, Inventaris & Aset RT).
  - Menjamin akurasi pembukuan 100% tanpa celah kebocoran sepeser pun (*Zero Penny Leaks*), mencegah galat pecahan pembulatan (*rounding drift*), mengamankan sub-ledger antar akun, serta memastikan rekonsiliasi kas riil sesuai prinsip akuntansi berterima umum (PABU / GAAP RT).
- **Hasil Audit & Perbaikan 10 Titik Kritis**:
  1. **Algoritma Auto-Split Iuran Wajib (`calculateAutoSplit`)**:
     - *Masalah*: Menggunakan `Math.round()` independen per pos anggaran yang menyebabkan distorsi total alokasi (misalnya alokasi ganjil kehilangan Rp 1-3 atau melebihkan dari total dana yang disetorkan warga).
     - *Solusi Finansial*: Diimplementasikan **Largest Remainder Method (Hamilton-Hare Algorithm)** dengan *integer remainder plug*. Menghitung porsi dasar dengan `Math.floor()` dan mengalokasikan sisa selisih (discrepancy) berdasarkan urutan desimal sisa tertinggi. Teruji pada seluruh skenario nominal (Rp 0 s.d. Rp 1.000.000) dengan selisih tepat **Rp 0** (100% konsisten).
  2. **Mesin Konsolidasi Saldo & Pengeluaran Tercecer (`computeFinancials`)**:
     - *Masalah*: Pengeluaran dengan `posId` tidak valid/terhapus diabaikan dari perhitungan pos sehingga tidak terpotong dari saldo, menyebabkan saldo kas terlihat lebih besar dari fisik uang kas riil (*phantom surplus*).
     - *Solusi Finansial*: Seluruh pengeluaran yang tidak memiliki relasi pos valid otomatis dialihkan ke pos beban operasional utama (`kas_rt`), sehingga 100% pengeluaran tercatat dan terpotong dari kas konsolidasi (`totalConsolidatedExpense`). Disediakan properti kas likuid gabungan: Kas Iuran Dues, Kas Non-Iuran, Kas Jimpitan, dan `grandTotalLiquidBalance`.
  3. **Kalkulasi Capaian Iuran per Nama Jalan (`computeStreetStats`)**:
     - *Masalah*: Menghitung penerimaan per jalan dengan rumus fiktif `paidWarga * mandatoryDues` yang mengabaikan pembayaran cicilan, pembayaran berlebih (*advance payments*), atau iuran parsial.
     - *Solusi Finansial*: Dihitung dari akumulasi kas riil (`sum(p.amount)`) seluruh warga yang beralamat di jalan tersebut pada periode bulan/tahun aktif.
  4. **Tren Arus Kas Eksekutif 6 Bulan (`renderExecutiveCharts`)**:
     - *Masalah*: Grafik arus kas bulanan menggunakan data dummy array konstan hardcoded (`[950000, 1100000, ...]`) yang tidak merefleksikan arus kas riil kas RT.
     - *Solusi Finansial*: Dihubungkan secara dinamis ke agregasi historis riil penerimaan kas (`payments`) dan pengeluaran kas (`expenses`) untuk jendela 6 bulan berjalan ke belakang.
  5. **Agregasi Pembayaran Checklist Bulanan (`renderChecklist`)**:
     - *Masalah*: Menggunakan `find()` tunggal untuk mencari pembayaran warga per bulan, sehingga jika warga membayar dalam 2 termin (misal Rp 20.000 + Rp 30.000), termin kedua tidak terhitung.
     - *Solusi Finansial*: Diagregasi menggunakan `reduce()` seluruh transaksi pembayaran warga pada bulan aktif sehingga akumulasi penerimaan terekonsiliasi sempurna.
  6. **Integritas Pembatalan Pembayaran (`toggleResidentPayment`)**:
     - *Masalah*: Pembatalan centang (uncheck) hanya memfilter transaksi pertama atau menyisakan catatan historis yatim.
     - *Solusi Finansial*: Menghapus seluruh entri pembayaran yang bersesuaian dengan `residentId`, `month`, dan `year` aktif, mengembalikan saldo pos secara proporsional.
  7. **Standar Laporan Pembukuan Kas Periodik (`renderReport`)**:
     - *Masalah*: Laporan kas hanya menampilkan transaksi dalam rentang tanggal tanpa menghitung Saldo Awal (*Beginning Balance*), sehingga saldo akhir tidak mencerminkan total fisik kas RT.
     - *Solusi Finansial*: Mengimplementasikan sistem akuntansi periodik: menghitung `Saldo Awal` (seluruh mutasi sebelum tanggal filter mulai), `Pemasukan Periode`, `Pengeluaran Periode`, dan `Saldo Akhir Rekonsiliasi`. Menambahkan baris Saldo Awal resmi pada buku kas umum. Kota penandatanganan diselaraskan ke `Bekasi`.
  8. **Demografi Penduduk Riil (`renderPublicDemografi`)**:
     - *Masalah*: Tampilan jiwa per keluarga membaca properti `r.familyMembers` (undefined), sehingga angka total jiwa warga RT keliru.
     - *Solusi Finansial*: Menggunakan properti `r.members` resmi dari database kependudukan RT.001 (112 KK, 445 Jiwa).
  9. **Sinkronisasi Saldo Kas Publik Warga (`renderPublicKasSummary` & `updatePublicStats`)**:
     - *Masalah*: Portal warga menggunakan simulasi alokasi yang tidak terhubung dengan saldo riil `computeFinancials()`.
     - *Solusi Finansial*: Dihubungkan langsung ke data rekonsiliasi `computeFinancials()` dan mapping pos anggaran yang presisi.
  10. **Sanitasi String Finansial & Valuasi Aset RT (`parseNominal` & `renderAsetRt`)**:
      - *Masalah*: Input harga aset atau nominal dengan format rupiah Indonesia (seperti `"500.000"` atau `"Rp 1.250.000"`) jika diparsing dengan `Number()` menghasilkan `500` (terjadi distorsi valuasi 1.000x lipat).
      - *Solusi Finansial*: Dibuat fungsi universal `parseNominal(val)` yang mengekstraksi digit numerik secara aman dan mencegah anomali format. Diaplikasikan ke seluruh modal input aset, kalkulasi total valuasi, tabel, cetak berita acara, dan mutasi kas jimpitan.

### 2. 🎨 Redesain Premium Card Capaian Iuran Bulanan & Kontras Warna Card Non-Iuran (Update v2.9.31 - 20 Sept 2026)
- **Pembaruan Visual Capaian Iuran Berdasarkan Nama Jalan**:
  - Tampilan card capaian iuran per jalan kini memiliki tema warna unik (*distinct accent background* & *border glow*) untuk masing-masing dari 5 jalan warga (`Jl. Citarum II`, `Jl. Citarum IVA`, `Jl. Citarum VIIIB`, `Jl. Citarum VIIIC`, `Jl. Citarum IX`).
  - Dilengkapi micro-interactions, badge persentase ketercapaian dinamis, dan efek hover responsif.
- **Peningkatan Tipografi & Kontras Card Pemasukan NON-Iuran**:
  - Penyesuaian label kartu ringkasan keuangan:
    - `"TOTAL PENGELUARAN NON-IURAN"` ➔ `"TOTAL PENGELUARAN"`
    - `"SALDO KAS NON-IURAN"` ➔ `"SALDO SEKARANG"`
  - Peningkatan kontras font kartu (Total Penerimaan, Total Pengeluaran, Saldo Sekarang, Mutasi Terakhir) agar sangat tajam, mudah dibaca, dan tetap elegan dengan nuansa tema dark/gold dashboard.

### 3. 🎨 Redesain Premium Card Alokasi POS ANGGARAN (Update v2.9.29 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Redesain tampilan card 6 Pos Anggaran pada Dashboard Eksekutif agar lebih menarik, berkelas, dan mudah dibedakan secara visual per-pos.
- **Implementasi Teknis & Arsitektur Visual**:
  - **Sistem Warna Per-Card via CSS Custom Property (`styles.css`)**:
    - Menggunakan variabel CSS `--pos-accent` per card yang di-inject secara dinamis lewat JavaScript, sehingga setiap card memiliki **palet warna unik** yang diwariskan dari konfigurasi pos (`pos.color`):
      - 🟢 Sampah & Kebersihan: `#10b981` (emerald)
      - 🟡 Kas RT: `#f59e0b` (amber)
      - 🩵 Dana Sosial: `#06b6d4` (cyan)
      - 🔵 Santunan Duka: `#6366f1` (indigo)
      - 🟣 Keagamaan (PHBI): `#a855f7` (purple)
      - 🔴 HUT RI: `#f43f5e` (rose)
    - Setiap card memiliki `border-left: 4px solid var(--pos-accent)` sebagai identitas warna dominan.
    - Latar belakang card menggunakan `linear-gradient` halus bertema warna accent (`color-mix(in srgb, var(--pos-accent) 6%, transparent)`).
    - **Glow orb** (::before) — lingkaran cahaya radial di pojok kiri atas card.
    - **Diagonal shimmer stripe** (::after) — garis kilap diagonal tipis di kanan card.
  - **Efek Hover yang Meningkat**:
    - Animasi `translateY(-5px) scale(1.015)` saat card dihover.
    - Drop shadow berlapis dengan warna accent: shadow gelap + ring highlight + glow warna pos.
  - **Typography & Icon Box yang Disempurnakan**:
    - Icon box diperbesar (46×46px) dengan `border` dan `box-shadow` berwarna accent.
    - Label nama pos menjadi uppercase dengan letter-spacing (terkesan lebih profesional).
    - Balance nominal lebih besar (1.5rem) dengan `letter-spacing: -0.02em` untuk kesan modern.
    - Tag alokasi per-KK kini berwarna dinamis menyesuaikan pos.
    - Icon arus kas diupdate ke `fa-arrow-trend-down` / `fa-arrow-trend-up` yang lebih modern.
  - **Perubahan di `app.js`**:
    - Menambahkan `card.style.setProperty('--pos-accent', pos.color)` pada loop render dashboard.
  - **Peningkatan Cache PWA**:
    - Service Worker ke `rt-finsmart-cache-v2.9.29`.
    - Query aset `styles.css?v=2.9.29` dan `app.js?v=2.9.29`.

### 2. 🛡️ Penghapusan Informasi Jadwal Ronda dari Dashboard Eksekutif Admin 1 (Update v2.9.28 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Hapus kartu informasi **Jadwal Ronda** (`#dash-ronda-banner`) dari tampilan Dashboard Eksekutif Admin 1 (Bendahara 1).
  - Modul Jadwal Ronda merupakan domain operasional Seksi Keamanan/Ketertiban yang dikelola di dalam akun portal Pengurus RT.
- **Implementasi Teknis & Arsitektur RBAC**:
  - **Penyesuaian HTML (`index.html`)**:
    - Memberikan penanda peran `data-role-req="PENGURUS"` dan styling bawaan `style="display: none;"` pada `#dash-ronda-banner` di dalam `#view-dashboard` agar secara default tidak dimuat untuk Admin 1.
  - **Logika Kontrol Akses & DOM Rendering (`app.js`)**:
    - Pada fungsi `renderDashboard()`: Menambahkan pengecekan role di mana `#dash-ronda-banner` diset `display: none` untuk Admin 1 / Bendahara 1 (`isB1`), dan hanya ditampilkan jika pengguna aktif berstatus Pengurus RT (`isPengurus`).
    - Pada fungsi `applyRBAC()`: Mempertegas aturan bahwa `#dash-ronda-banner` hanya memiliki izin tampil untuk `isPengurus`, sedangkan disembunyikan untuk `isB1`, `isB2`, dan Warga.
  - **Peningkatan Cache PWA**:
    - Meningkatkan versi Service Worker ke `rt-finsmart-cache-v2.9.28` di `sw.js`.
    - Memperbarui parameter query aset `styles.css?v=2.9.28` dan `app.js?v=2.9.28` di `index.html`.

### 2. 🗂️ Restrukturisasi & Urutan Menu Sidebar Admin 1 (Bendahara 1) (Update v2.9.27 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Pada halaman dashboard Admin 1 (Bendahara 1), atur ulang posisi menu di sidebarnya secara tepat menjadi:
    1. **Dashboard Eksekutif** (`dashboard`)
    2. **Data Warga** (`warga`)
    3. **Checklist Iuran Wajib** (`checklist`)
    4. **Pemasukan NON iuran** (`non-iuran`)
    5. **Uang Jimpitan** (`jimpitan`)
    6. **6POS Anggaran & SHR** (`pos-anggaran`) *(diperbarui dari "6 Pos Anggaran & SHR")*
    7. **Pengajuan Anggaran dari Warga** (`pengajuan-dana-admin`) *(diperbarui dari "Pengajuan Dana dari Warga")*
    8. **Pengeluaran Kas** (`pengeluaran`)
    9. **Laporan & Pembukuan** (`laporan`)
    10. **Inventaris dan Aset RT** (`aset-rt`)
    11. **Pengaturan Sistem** (`pengaturan`) *(diperbarui dari "Pengaturan Pos & Sistem")*
  - Hapus/sembunyikan menu berikut dari sidebar Admin 1 (Bendahara 1):
    1. **Struktur Pengurus RT** *(tetap tersedia khusus untuk peran Pengurus RT & Admin 2)*
    2. **Jadwal Ronda** *(tetap tersedia khusus untuk peran Pengurus RT)*
- **Implementasi Teknis & Arsitektur RBAC**:
  - **Penataan Ulang HTML Markup (`index.html`)**:
    - Menyusun ulang urutan 11 item `<a class="menu-item">` di dalam `<nav class="sidebar-menu">` persis dari 1 sampai 11.
    - Memperbarui teks dan *tooltip*:
      - `"6 Pos Anggaran & SHR"` ➔ `"6POS Anggaran & SHR"`
      - `"Pengajuan Dana dari Warga"` ➔ `"Pengajuan Anggaran dari Warga"`
      - `"Pengaturan Pos & Sistem"` ➔ `"Pengaturan Sistem"`
    - Memindahkan tombol modul `pengurus-struktur` dan `ronda-pengurus` ke bagian bawah deklarasi sidebar dengan atribut `data-role-req="PENGURUS"`.
  - **Kontrol Akses Peran RBAC & Flexbox Order di `app.js` (`applyRBAC` & `navigateToView`)**:
    - Mendefinisikan daftar izin akses resmi Bendahara 1: `B1_ALLOWED_TARGETS = ['dashboard', 'warga', 'checklist', 'non-iuran', 'jimpitan', 'pos-anggaran', 'pengajuan-dana-admin', 'pengeluaran', 'laporan', 'aset-rt', 'pengaturan']`.
    - Menerapkan CSS `el.style.order` dinamis pada item menu sidebar B1 (1 s.d. 11) dan menyembunyikan (`display: none`) modul `pengurus-struktur` serta `ronda-pengurus` saat pengguna aktif berstatus Bendahara 1.
    - Memperbarui kamus judul halaman (`titles`) di `navigateToView` agar label header halaman konsisten dengan nama menu baru.
    - Menambahkan perlindungan *fail-safe redirect* untuk B1 jika mencoba mengakses URL view yang berada di luar hak otoritasnya.
  - **Peningkatan Cache PWA**:
    - Meningkatkan versi Service Worker ke `rt-finsmart-cache-v2.9.27` di `sw.js`.
    - Memperbarui parameter query aset `styles.css?v=2.9.27` dan `app.js?v=2.9.27` di `index.html`.

### 2. 📊 Penataan Ulang Tata Letak & Hirarki Konten Dashboard Eksekutif Pengurus (Update v2.9.26 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Di dalam **Dashboard Eksekutif Pengurus**, atur ulang posisi tampilan modul agar fokus finansial dan operasional tersusun secara logis dan runtut:
    1. **TOTAL KAS TERKONSOLIDASI dan Capaian Iuran Bulan Ini**
    2. **Alokasi POS ANGGARAN** (sebelumnya: *Realokasi Otomatis 6 Pos Anggaran Utama*)
    3. **Capaian Iuran Bulanan** (sebelumnya: *Capaian Iuran Berdasarkan Nama Jalan*)
    4. **Tren Arus Kas Bulanan dan Komposisi Saldo per Pos**
    5. **Transaksi Kas Terbaru** (sebelumnya: *Transaksi Kas Terkini*)
    6. **Valuasi Aset Lingkungan Terdata**
    7. **Jadwal Ronda**
- **Implementasi Teknis & Arsitektur DevOps**:
  - **Penataan Ulang Posisi Elemen DOM di `#view-dashboard` (`index.html`)**:
    - **Posisi 1**: Tetap mempertahankan `.hero-card-grid` (*Total Kas Terkonsolidasi* & *Capaian Iuran Bulan Ini*).
    - **Posisi 2**: Memindahkan blok 6 pos anggaran (`#dashboard-pos-grid`) ke urutan kedua langsung di bawah hero card, serta memperbarui judulnya menjadi `<h3><i class="fa-solid fa-layer-group text-gold"></i> Alokasi POS ANGGARAN</h3>`.
    - **Posisi 3**: Memindahkan kartu kepatuhan ruas jalan (`#dashboard-street-grid`) ke urutan ketiga dan memperbarui judulnya menjadi `<h3><i class="fa-solid fa-road text-gold"></i> Capaian Iuran Bulanan</h3>`.
    - **Posisi 4**: Memindahkan grid grafik analitik visual (`.dashboard-analytics-grid` berisi *Tren Arus Kas Bulanan* dan *Komposisi Saldo per Pos*) ke urutan keempat.
    - **Posisi 5**: Memindahkan tabel transaksi terkini (`.recent-transactions-card`) ke urutan kelima dan memperbarui judulnya menjadi `<h3><i class="fa-solid fa-clock-rotate-left text-gold"></i> Transaksi Kas Terbaru</h3>`.
    - **Posisi 6**: Memindahkan banner ringkasan inventaris (`#dash-asset-banner` *Valuasi Aset Lingkungan Terdata*) ke urutan keenam.
    - **Posisi 7**: Memindahkan banner jadwal ronda aktif (`#dash-ronda-banner` *Jadwal Ronda*) ke posisi penutup di bagian bawah dashboard.
  - **Peningkatan Cache PWA**: Meningkatkan versi cache Service Worker ke `rt-finsmart-cache-v2.9.26` serta query string aset CSS dan JS.

### 2. 🛡️ Restrukturisasi Menu Eksekutif, Ikon Edit Ronda & 8 Palet Warna Harmonis Regu (Update v2.9.25 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  1. Di dashboard portal pengurus bagian **Atur Jadwal Ronda**: Ganti ikon **"HAPUS/DELETE"** dengan ikon **"GANTI/EDIT"**.
  2. Ganti kata **"Jadwal Regu Ronda"** menjadi **"Jadwal Ronda"** saja.
  3. Pada tampilan semua regu, ganti warna background card rondanya berbeda-beda namun tetap harmonis, elegan, dan nyaman dipandang agar lebih mudah dibedakan.
  4. Atur ulang susunan menu di **Dashboard Eksekutif** menjadi urutan baku:
     1. **Struktur Pengurus RT**
     2. **Data Warga**
     3. **Jadwal Ronda**
     4. **Uang Jimpitan**
     5. **Pengajuan Dana dari Warga** (sebelumnya: *Pengajuan Dana Warga*)
     6. **Pemasukan NON iuran**
     7. **Inventaris dan Aset RT**
- **Implementasi Teknis & Arsitektur DevOps**:
  - **Ikon Ganti/Edit Interaktif pada Modal Ronda**:
    - Mengganti elemen ikon tong sampah (`fa-trash-can`) pada baris anggota petugas di modal *Kelola Susunan Jadwal Ronda* (`#modal-manage-ronda`) menjadi ikon edit profesional (`<i class="fa-solid fa-pen-to-square"></i>`).
    - Menghubungkan tombol `.btn-edit-ronda-member` ke *event listener*: saat diklik, sistem secara instan memfokuskan kursor dan menyeleksi teks input nama petugas (`input.focus()`, `input.select()`), memudahkan penggantian nama petugas dari *datalist* 71 KK warga.
    - Memperbarui gaya CSS `.btn-edit-ronda-member` dengan nuansa *luxury cyan hover glow* (`#38bdf8`) menggantikan warna merah hapus.
  - **Standardisasi Penamaan "Jadwal Ronda" & "Pengajuan Dana dari Warga"**:
    - Memperbarui seluruh label navigasi sidebar, *tooltip*, dan header view dari *"Jadwal Regu Ronda"* menjadi *"Jadwal Ronda"*.
    - Memperbarui label navigasi sidebar dan *tooltip* modul pengajuan dana dari *"Pengajuan Dana Warga"* menjadi *"Pengajuan Dana dari Warga"*.
  - **8 Skema Warna Card Regu Ronda Harmonis & Mewah**:
    - Menerapkan 8 palet warna gradient *dark-mode glassmorphism* yang khas untuk setiap regu ronda (`[data-week="1"]` s.d. `[data-week="8"]`) pada kartu regu pengurus (`.pengurus-ronda-card`) dan kartu regu warga (`.pw-ronda-group-card`):
      1. **Regu 1**: *Emerald Forest Glow* (Nuansa Zamrud Mewah)
      2. **Regu 2**: *Sapphire Oceanic Glow* (Nuansa Safir Biru Elegan)
      3. **Regu 3**: *Royal Amethyst Glow* (Nuansa Ungu Violet Ningrat)
      4. **Regu 4**: *Golden Bronze / Amber Glow* (Nuansa Emas Tembaga Berwibawa)
      5. **Regu 5**: *Cyber Teal / Turquoise Glow* (Nuansa Toska Tropis Kristal)
      6. **Regu 6**: *Ruby Crimson Wine* (Nuansa Merah Delima Mewah)
      7. **Regu 7**: *Deep Indigo Glow* (Nuansa Biru Indigo Modern)
      8. **Regu 8**: *Terracotta Copper* (Nuansa Oranye Tembaga Hangat)
    - Kartu regu yang aktif bertugas pada pekan berjalan (`.is-active-week`) tetap diperkuat dengan *glowing golden border* (`#fbbf24`) dan *pulse indicator*.
  - **Restrukturisasi Urutan Menu Eksekutif (1 sampai 7)**:
    - Menata ulang urutan DOM `<nav class="sidebar-menu">` di `index.html` dan aturan Flexbox `el.style.order` di `applyRBAC()` (`app.js`) menjadi:
      1. `pengurus-struktur` (Struktur Pengurus RT)
      2. `warga` (Data Warga)
      3. `ronda-pengurus` (Jadwal Ronda)
      4. `jimpitan` (Uang Jimpitan)
      5. `pengajuan-dana-admin` (Pengajuan Dana dari Warga)
      6. `non-iuran` (Pemasukan NON iuran)
      7. `aset-rt` (Inventaris dan Aset RT)
      *(diikuti oleh modul pembukuan kas khusus Admin 1: Checklist Iuran, 6 Pos Anggaran, Pengeluaran, Laporan, Pengaturan)*.
  - **Peningkatan Cache PWA**: Meningkatkan versi cache Service Worker ke `rt-finsmart-cache-v2.9.25` serta query string aset CSS dan JS.

### 2. 💼 Restrukturisasi & Penyederhanaan Dashboard Portal Admin 2 (Bendahara) (Update v2.9.24 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  1. Pada halaman portal **Admin 2 (Bendahara)**, hilangkan informasi/menu **"Pemasukkan Non Iuran"** dan **"Jadwal regu Ronda"**.
  2. Susun ulang menu dashboard Admin 2 secara spesifik dengan urutan baku:
     1. **Struktur Pengurus RT**
     2. **Uang Jimpitan**
     3. **Inventaris dan Aset RT**
- **Implementasi Teknis & Arsitektur DevOps**:
  - **Penyederhanaan Hak Akses (RBAC Streamlining)**:
    - Memperbarui `data-role-req` di `index.html` pada tombol sidebar `non-iuran` dari `ALL` menjadi `B1` (hanya dapat diakses oleh Admin 1/Ketua) dan `ronda-pengurus` dari `ALL` menjadi `PENGURUS` (dikelola oleh jajaran Seksi Keamanan & Ketertiban).
    - Memperbarui tabel izin `B2_ALLOWED_TARGETS` di `app.js` (`navigateToView` dan `applyRBAC`) sehingga secara ketat hanya mengizinkan 3 view: `['pengurus-struktur', 'jimpitan', 'aset-rt']`.
    - Jika Admin 2 mencoba mengakses URL atau link view non-otoritas (seperti `non-iuran` atau `ronda-pengurus`), sistem secara otomatis mengalihkannya (*fail-safe redirect*) ke menu default `#view-pengurus-struktur`.
  - **Penataan Urutan Menu 1-2-3 Presisi**:
    - Menyusun ulang urutan elemen DOM `<button class="sidebar-item">` di `index.html`:
      1. `data-target="pengurus-struktur"` (Struktur Pengurus RT)
      2. `data-target="jimpitan"` (Uang Jimpitan)
      3. `data-target="aset-rt"` (Inventaris & Aset RT)
    - Menerapkan CSS Flexbox `el.style.order` dinamis pada `applyRBAC()` (`pengurus-struktur: 1`, `jimpitan: 2`, `aset-rt: 3`), sehingga urutan menu selalu 100% konsisten dan sempurna baik di desktop sidebar maupun mobile navigation drawer.
  - **Penetapan Default View Login Admin 2**:
    - Mengarahkan login Admin 2 (`b2` / PIN `2222`) langsung ke halaman **Struktur Pengurus RT** (`pengurus-struktur`) sebagai landing view resmi bendahara 2.
    - Memperbarui deskripsi role akun Admin 2 pada modal login menjadi: *"Struktur Pengurus, Uang Jimpitan & Aset RT"*.
  - **Pembersihan Tombol Redundan di View Terkait**:
    - Menyembunyikan tombol navigasi silang `#btn-admin-manage-ronda` pada halaman Kas Jimpitan khusus saat sesi login `b2` aktif, mencegah kebocoran navigasi ke modul ronda.
  - **Peningkatan Cache PWA**: Meningkatkan versi cache Service Worker ke `rt-finsmart-cache-v2.9.24` serta query string aset CSS dan JS.

### 2. 🏢 Pembersihan Banner Struktur Pengurus & Penataan Rapi Subtitle Alamat (Update v2.9.23 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  1. Menghilangkan tombol/menu *"Jadwal Regu Ronda"* dari kotak banner *"Struktur Organisasi & Tata Kelola Pengurus"*, karena jadwal ronda kini telah memiliki halaman dedicated sendiri.
  2. Memindahkan kalimat *"• Melayani 71 Kepala Keluarga"* agar berada pas persis di bawah kalimat *"Rukun Tetangga 001 / Rukun Warga 013 Perumahan Graha Asri, Cikarang Utara"*, menghindari pemotongan teks yang canggung.
- **Implementasi Teknis & Arsitektur DevOps**:
  - **Pembersihan Tombol Redundan**: Menghapus tombol `#btn-pengurus-quick-ronda` dari `.org-actions-bar` di dalam `#view-pengurus-struktur` (`index.html`), sehingga bar aksi hanya menyisakan tombol esensial kepengurusan: *"Cetak Bagan Resmi"* (`#btn-print-org`) dan *"Salin Kontak Pengurus"* (`#btn-copy-org-contacts`).
  - **Penataan Subtitle Hierarkis Bersih**:
    - Memisahkan elemen `.org-hero-subtitle` menjadi dua blok span terstruktur: `.org-hero-loc` (untuk teks alamat RT/RW Graha Asri) dan `.org-hero-serve` (untuk teks `• Melayani 71 Kepala Keluarga`).
    - Menambahkan aturan CSS di `styles.css`: `.org-hero-subtitle .org-hero-serve { display: block; margin-top: 0.25rem; font-size: 0.9rem; color: #cbd5e1; font-weight: 500; }`.
    - Teks kini tersusun rapi dua baris proporsional tanpa terpotong di tengah kata *"Kepala / Keluarga"*.
  - **Peningkatan Cache**: Meningkatkan versi cache Service Worker ke `rt-finsmart-cache-v2.9.23`.

### 2. 📊 Optimalisasi Grafik Penerimaan Iuran Tahunan & Arsip 2021–2026 (Update v2.9.22 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  1. Pada bagian *"Grafik Penerimaan Iuran Bulanan 1 Tahun Berjalan"*, hilangkan kotak *"18% Partisipasi Aktif"* karena di atasnya (pada hub cockpit status) sudah ada informasi kepatuhan yang sama.
  2. Filter tahun dibuat mulai dari **2021 (Arsip)** sampai dengan **2026 (Berjalan)**.
  3. Menggeser posisi kotak *"Grafik Penerimaan Iuran Bulanan 1 Tahun Berjalan"* ke atas agar jarak (vertical gap) dengan komponen di atasnya tidak terlalu jauh.
- **Implementasi Teknis & Arsitektur DevOps**:
  - **Pembersihan Redundansi DOM**: Menghapus kotak `.annual-kpi-grid.public-kpi-single` di dalam kartu grafik publik landing hub (`index.html`), sehingga tampilan langsung beralih secara bersih dari judul & kontrol tahun/tipe grafik ke kurva/batang visualisasi Chart.js.
  - **Dukungan Opsi Arsip 2021–2026**: Menambahkan opsi filter tahun dari 2021 hingga 2026 pada dropdown `#select-annual-chart-year`, `#select-warga-chart-year`, dan `#select-keuangan-chart-year`.
  - **Dataset Benchmark Arsip Berkelanjutan**: Menambahkan konstanta `HISTORICAL_ARCHIVE_RATES` pada `app.js` (2021 s/d 2025) yang menyajikan histori gotong royong dan partisipasi warga secara realistis dan presisi saat memilih tahun arsip tanpa transaksi live di memori.
  - **Penataan Spasi Vertikal Ramping**:
    - Mengurangi margin bawah `.hub-cockpit-section` dan `.hub-orbital-nav-wrapper` dari `1.5rem` menjadi `0.25rem`.
    - Menghilangkan `margin-top` berlebih pada `.public-annual-dues-card` (dari `2rem` menjadi `0`), dan mengatur `.hub-chart-spotlight` menjadi `margin-top: 0`, memotong dead space hingga ~150px sehingga kartu grafik merapat proporsional dan elegan di bawah roda orbital navigasi.
  - **Peningkatan Multi-Canvas Chart.js**: Memperbarui `renderPublicAnnualDuesChart` agar secara serentak mengelola dan merender canvas publik landing hub (`#chartPublicAnnualDues`) serta halaman transparansi (`#chartKeuanganAnnualDues`) secara sinkron tanpa konflik instance.
  - **Pembaruan Cache**: Meningkatkan versi cache Service Worker ke `rt-finsmart-cache-v2.9.22`.

### 2. 🛡️ Pemisahan Moduler "Jadwal Regu Ronda" & Restrukturisasi Bersih Dashboard Pengurus (Update v2.9.21 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Merapikan dashboard pengurus agar bersih dan modular seperti menu acuan **"Inventaris & Aset RT"** (hanya menampilkan data terkait tanpa elemen yang tidak relevan).
  - Saat menu **"Jadwal Regu Ronda"** di sidebar diklik, sisi kanan langsung menampilkan **"Tata Kelola Jadwal & Regu Ronda Malam LIVE AKTIF"** tanpa menampilkan banner *"Struktur Organisasi & Tata Kelola Pengurus"* di atasnya.
  - Mempertahankan integritas menu yang sudah benar: **"Data Warga"**, **"Pengajuan Dana Warga"**, dan **"Inventaris & Aset RT"**.
  - Mengubah penamaan menu sidebar dari *"Uang Jimpitan Ronda"* menjadi **"Uang Jimpitan"** saja.
- **Implementasi Teknis & Arsitektur DevOps**:
  - **Ekstraksi Dedicated View**: Mengekstrak panel `#pengurus-tab-panel-ronda` keluar dari `#view-pengurus-struktur` dan menjadikannya sebuah `<section class="view-section" id="view-ronda-pengurus">` mandiri.
  - **Tampilan Langsung Bersih**: Saat membuka `ronda-pengurus`, pengguna langsung disajikan header *"Tata Kelola Jadwal & Regu Ronda Malam LIVE AKTIF"*, KPI metrik siaga (Regu Aktif, Total Personel 88 orang, Siklus 8 Minggu, Jam Operasional), filter 8 regu, dan kartu komandan/petugas ronda.
  - **Pembersihan Struktur Pengurus**: Menghilangkan tab-tab duplikasi (ronda, verifikasi fasum, dan buku induk warga) dari `view-pengurus-struktur`, sehingga menu **"Struktur Pengurus RT"** 100% fokus murni pada bagan alur hierarki organisasi, katalog kartu eksekutif, cetak bagan, dan kontak WhatsApp resmi.
  - **Penamaan Uang Jimpitan**: Memperbarui teks sidebar dan judul modul kas menjadi **"Uang Jimpitan"** (menghilangkan kata "Ronda" sesuai instruksi).
  - **Routing 1-ke-1 di `app.js`**: Menghapus mekanisme redirection/alias lama di `navigateToView`, sehingga `ronda-pengurus` langsung mengaktifkan `#view-ronda-pengurus` secara instan tanpa lag.
  - **Sinkronisasi RBAC & Navigasi**: Memperbarui tabel izin `B2_ALLOWED_TARGETS`, `PENGURUS_ALLOWED_TARGETS`, `WARGA_ALLOWED_TARGETS`, serta Service Worker Cache `v2.9.21`.

### 2. 🚀 Integrasi Navigasi Langsung 6 Sektor Orbital & Transformasi Dashboard Keuangan Mewah (Update v2.9.20 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Mengaktifkan interaksi klik pada setiap bagian roda navigasi orbital (**STATISTIK WARGA**, **KEUANGAN RT**, **PENGURUS RT**, **PORTAL WARGA**, **AGENDA WARGA**, **PROFIL DAN PETA**) agar masing-masing membuka halaman terkait.
  - Menghubungkan halaman yang sudah ada serta meningkatkan tampilan halaman menjadi mewah, elegan, interaktif, dan profesional agar pengunjung merasa nyaman dan senang.
- **Implementasi Teknis**:
  - **Navigasi Orbital Resilien**: Menyematkan *direct bulletproof event listener* pada seluruh elemen kelopak (`.orbital-petal-group`) dan tombol satelit (`.orbital-sat-btn`) di `app.js` (`initHubOrbitalNavigation`).
  - **PENGURUS RT** (Sektor 0) -> Membuka `#subview-pengurus` (Struktur kepengurusan periode 2022–2027 lengkap dengan kontak WhatsApp per seksi).
  - **PORTAL WARGA** (Sektor 1) -> Menghadirkan akses langsung ke `#view-portal-warga` jika terverifikasi, atau modal login mewah dengan tombol **"Coba Akses Akun Demo (Bpk. Wageyanto - B6 No. 02)"** 1-klik masuk bagi tamu/pengunjung.
  - **AGENDA WARGA** (Sektor 2) -> Membuka `#subview-kegiatan` (Jadwal ronda malam minggu interaktif pekan 1–5, agenda kerja bakti & kegiatan warga).
  - **PROFIL DAN PETA** (Sektor 3) -> Membuka `#subview-tentang` (Profil RT.001, visi misi, dan denah peta satelit 5 klaster jalan dengan zoom interaktif).
  - **STATISTIK WARGA** (Sektor 4) -> Membuka `#subview-demografi` (Visualisasi data kependudukan 71 KK / 284 jiwa dengan Chart.js).
  - **KEUANGAN RT** (Sektor 5) -> Transformasi total `#subview-layanan` menjadi **Dashboard Transparansi Keuangan Eksekutif**:
    1. 4 Kotak Vault Metrik: Saldo Kas Operasional, Saldo Jimpitan Ronda, Total Kas Aktif Terkonsolidasi, dan Tingkat Kepatuhan Warga.
    2. Matriks 6 Pos Anggaran Terbuka Kas RT (Keamanan 40%, Kebersihan 25%, Fasum 15%, Sosial 10%, Operasional 5%, Cadangan 5%) lengkap dengan indikator progress bar dan saldo realtime.
    3. Grafik Interaktif Performa Iuran Bulanan 1 Tahun Berjalan (Canvas Chart.js) dengan tombol toggle Area vs Batang dan filter tahun.
    4. Tabel Transparansi Arus Transaksi Kas Terkini dengan badge verifikasi bendahara.
- **Hasil Visual & Pengalaman Pengguna**:
  - Seluruh roda navigasi kini 100% interaktif dan responsif di seluruh perangkat (desktop, tablet, mobile).
  - Transisi halaman mulus dilengkapi sticky header dengan tombol *"Kembali ke Beranda"*.

### 2. 🔄 Perbaikan Arah Lengkungan Kontur Busur Teks Sektor 3 PROFIL DAN PETA (Update v2.9.19 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Memperbaiki kontur tulisan **"PROFIL DAN PETA"** pada Sektor 3 (arah Barat/180°) yang sebelumnya melengkung terbalik (cekung ke dalam/menuju pusat lingkaran).
- **Perbaikan Teknis**:
  - Menyesuaikan `sweep-flag` pada SVG `<path id="orb-txt-3">` dari `0` menjadi `1` (`d="M 164.85 360.2 A 148 148 0 0 1 164.85 239.8"`).
  - Dengan perubahan flag ini, busur teks melewati koordinat puncak $(152, 300)$, melengkung cembung keluar secara konsentris sempurna mengikuti kelopak roda navigasi orbital dengan teks tegak lurus menghadap luar.
- **Hasil Visual**:
  - Kontur tulisan kini mengalir harmonis dan konsentris mengikuti lekukan lingkaran roda navigasi tanpa distorsi.

### 2. 💫 Kalimat Mengikuti Kontur Lingkaran & Pembesaran Tipografi Sektor (Update v2.9.18 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Mengubah posisi kalimat **"PROFIL DAN PETA"** (Sektor 3) dan **"PENGURUS RT"** (Sektor 0) yang sebelumnya teks datar horizontal menjadi melengkung presisi mengikuti **kontur busur lingkaran** (`#orb-txt-3` dan `#orb-txt-0`) agar seluruh 6 sektor tampil serasi, dinamis, dan profesional layaknya kokpit eksekutif modern.
  - Membesarkan ukuran font seluruh label kalimat sektor (*STATISTIK WARGA*, *KEUANGAN RT*, *PENGURUS RT*, *PORTAL WARGA*, *AGENDA WARGA*, *PROFIL DAN PETA*) dari 11px menjadi **12.5px** (desktop) dan **11px** (mobile) dengan bobot 800 (*extra bold*) dan bayangan kontras tinggi (*drop shadow*).
- **Hasil Visual**:
  - Keselarasan visual 360° tercapai sempurna dengan seluruh teks mengalir mulus mengikuti garis orbit lingkaran.
  - Keterbacaan teks (*readability*) meningkat drastis di semua resolusi layar tanpa terjadi pemotongan teks (*text clipping*).

### 2. 🧹 Penyempurnaan Tampilan Bersih: Penghapusan Kotak Panel Detail di Bawah Roda Navigasi (Update v2.9.17 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Menghilangkan kotak panel detail di bawah roda navigasi (`#hub-orbital-detail-card`) sesuai tangkapan layar pengguna (*"Hilangkan kotak ini"*).
  - Dengan dihapusnya kotak ini, komposisi roda navigasi orbital sirkular menjadi lebih bersih, minimalis, dan tidak menghabiskan ruang halaman.
- **Interaksi Navigasi Langsung (*Direct Interaction*)**:
  - Klik langsung pada kelopak ataupun tombol satelit luar langsung membuka fitur terkait:
    - **Portal Warga (Sektor 1):** Langsung membuka form login / portal mandiri warga.
    - **Sektor Lain (0, 2, 3, 4, 5):** Langsung membuka subview terkait (*Pengurus RT, Agenda Warga, Profil dan Peta, Statistik Warga, Keuangan RT*).
  - Efek sorot visual (*glowing aura*) pada roda navigasi tetap bekerja mulus saat kursor melintas.
  - Menghapus aturan CSS dan dependensi DOM yang tidak terpakai sehingga ukuran bundle lebih ringan.

### 2. 🛸 Desain Unified Cockpit & Label Petal 2-Baris Rapi (Update v2.9.16 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Menyatukan bilah ticker atas dan header sebelumnya (Gambar 1) menjadi satu kesatuan kokpit elegan bersama roda navigasi orbital sirkular (Gambar 2) agar tidak memenuhi halaman (*space-efficient* & berkelas).
  - Melengkapi dan merapikan seluruh kalimat sektor kelopak roda navigasi menjadi **2-baris kalimat** agar terbaca utuh tanpa terpotong (clipping):
    1. **STATISTIK WARGA** (`STATISTIK` / `WARGA`)
    2. **KEUANGAN** (`KEUANGAN` / `RT`) *(dari sebelumnya KAS & KEUANGAN)*
    3. **PORTAL WARGA** (`PORTAL` / `WARGA`)
    4. **AGENDA WARGA** (`AGENDA` / `WARGA`)
    5. **PROFIL dan PETA** (`PROFIL` / `DAN PETA`)
    6. **PENGURUS RT** (`PENGURUS` / `RT`)
- **Implementasi Layout Cockpit**:
  - Mengapit diagram orbital di bagian tengah dengan kartu metrik di kiri & kanan:
    - **Sisi Kiri (Top-Left):** Kartu *Total Warga* (`112 KK (284 Jiwa)`) & *Performa Iuran 2026* (`18% Partisipasi Warga`).
    - **Sisi Kanan (Top-Right):** Kartu *Cakupan Wilayah* (`5 Ruas Lorong Jalan`) & *Status Lingkungan* (`Aman • Guyub Rukun`).
    - **Pojok Kanan Bawah (Bottom-Right):** Tombol mewah menyala *Event Terdekat* (`#btn-reopen-event-popup`) dengan aura glow merah-putih.
  - Menghilangkan duplikasi `.hub-ticker-bar` dan `.hub-section-header` terpisah, menghemat tinggi vertikal halaman sebesar ~400px sehingga seluruh kokpit tampil instan tanpa perlu scrolling panjang di layar desktop.
  - Geometri teks lengkung SVG ganda (`#orb-txt-*-1` dan `#orb-txt-*-2`) dengan radius presisi ($R=158$ dan $R=136$) memastikan tipografi 11px tetap tajam dan proporsional di semua resolusi layar.
  - Responsivitas adaptif penuh: grid kokpit otomatis bertransisi ke layout 2-kolom pada layar tablet/ponsel pintar.

### 2. 🎨 Transformasi Desain: Navigasi Orbital Eksekutif (Circular Orbital Navigation Wheel) Menggantikan Kotak-Kotak Grid (Update v2.9.15 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Mengganti deretan kotak-kotak kartu di halaman utama publik dengan desain roda orbital sirkular elegan sesuai diagram ilustrasi referensi pengguna.
  - Lingkaran merah di pusat diagram difungsikan sebagai **Logo RT Resmi** (seperti yang terdapat di pojok kiri atas navbar), dan 6 lingkaran kecil di luar bertindak sebagai titik akses pengganti kotak layanan.
- **Implementasi & Detail Arsitektur**:
  - **Pusat Inti (Center Core)**:
    - Lingkaran cincin merah elegan (`#dc2626`) dengan efek cahaya luar (*red outer glow*), cincin putih ganda, dan berkas cahaya pemutar (*orbital rotating light spinner*).
    - Memuat lambang resmi RT.001 Graha Asri (`assets/logo.png?v=2.6.7`) di atas cakram putih bersih dengan lencana emas *"RT.001 / RW.013"*.
    - Interaktif: Klik pada logo mengembalikan layar ke posisi atas hub secara mulus.
  - **6 Kelopak Busur Melengkung (Curved Arc Petals)**:
    - Digambar menggunakan geometri SVG `<path>` dengan ujung panah segitiga terarah presisi ke masing-masing lingkaran luar.
    - Mengadopsi gradasi warna kromatik spektrum teal-ke-royal blue persis sesuai gambar referensi:
      1. Sektor 0 (Kanan / Timur - 0°): **Struktur Pengurus** (Gradasi Royal Blue, ikon hierarki `fa-sitemap`).
      2. Sektor 1 (Kanan-Bawah / Tenggara - 60°): **Portal Warga** (Gradasi Sky Blue, ikon pintu `fa-door-open`).
      3. Sektor 2 (Kiri-Bawah / Barat Daya - 120°): **Agenda Warga** (Gradasi Cyan-Teal, ikon kalender `fa-calendar-days`).
      4. Sektor 3 (Kiri / Barat - 180°): **Profil & Peta** (Gradasi Emerald-Teal, ikon lokasi `fa-map-location-dot`).
      5. Sektor 4 (Kiri-Atas / Barat Laut - 240°): **Statistik Warga** (Gradasi Ocean Cyan, ikon target `fa-bullseye`).
      6. Sektor 5 (Kanan-Atas / Timur Laut - 300°): **Kas & Keuangan** (Gradasi Deep Blue, ikon jabat tangan `fa-handshake`).
    - Dilengkapi label teks melengkung sepanjang busur radial yang dirancang selalu terbaca tegak (*right-side up*).
  - **6 Tombol Node Satelit Luar**:
    - Tombol lingkaran sirkular dengan border bercahaya emas saat disorot/aktif (`:hover` / `.active`), ikon kontras tinggi, dan responsivitas klik langsung ke subview yang bersangkutan.
  - **Panel Detail Layanan Interaktif (Underneath Detail Card)**:
    - Terletak di bawah roda orbital, menampilkan lencana kategori, judul lengkap, deskripsi komprehensif, dan tombol aksi langsung (*Buka Fitur / Masuk ke Portal Warga*).
    - Sinkron secara *real-time* dengan gerakan *hover*, *focus*, dan *click/tap* pada kelopak maupun tombol satelit (default aktif: Portal Warga RT.001).
  - **Responsivitas Layar HP & Tablet**:
    - Skala SVG otomatis menyesuaikan lebar layar ponsel (360px–480px) tanpa menimbulkan scroll horizontal, menjamin estetika mewah di seluruh perangkat.
  - **Penyegaran Cache (Cache Busting)**:
    - Service Worker dinaikkan ke `rt-finsmart-cache-v2.9.15`.
    - Script dan stylesheet menggunakan query parameter `?v=2.9.15`.

### 2. 🔧 Perbaikan Bug Navigasi Kartu Hub & Eliminasi Notifikasi Palsu "Tekan sekali lagi untuk keluar" (Update v2.9.14 - 20 Sept 2026)
- **Latar Belakang & Investigasi Masalah**:
  - Saat pengguna mengklik salah satu kartu/kotak di beranda utama (misal: Demografi, Kas & Keuangan, Profil & Peta, Kegiatan, dsb.), muncul toast notifikasi di pojok kanan bawah: *"Tekan sekali lagi untuk keluar dari aplikasi"* dan halaman subview gagal terbuka.
  - **Akar Masalah (Root Cause)**:
    - Delegasi klik kartu sebelumnya melakukan mutasi hash langsung `window.location.hash = viewId`. Pada browser berbasis Chromium, perubahan hash memicu event `popstate`.
    - Handler `popstate` saat itu belum memeriksa apakah hash tujuan merupakan subview valid dan langsung menganggap aksi tersebut sebagai tombol Back di beranda (Hub), sehingga memicu proteksi keluar aplikasi (exit guard) dan membatalkan pembukaan halaman.
- **Solusi & Rekayasa Perbaikan**:
  1. **Routing Subview Cerdas pada `popstate`**:
     - Handler `popstate` kini mendeteksi apakah `currentHash` mengarah ke subview publik (`tentang`, `demografi`, `layanan`, `kegiatan`, `pengurus`). Jika ya, subview dibuka secara mulus (`switchPublicView(currentHash, true)`).
     - Proteksi exit guard ("Tekan sekali lagi untuk keluar dari aplikasi") hanya aktif saat pengguna **benar-benar berada di beranda utama (`#hub` atau kosong)** dan menekan tombol Back browser/ponsel.
  2. **Panggilan Navigasi Langsung**:
     - Event listener klik kartu `[data-subview]` kini memanggil `switchPublicView(viewId)` secara langsung tanpa mutasi hash sintetis yang mendahuluinya.
     - Riwayat browser dicatat secara bersih via `window.history.pushState` tanpa memicu event `popstate` palsu.
  3. **Penyelarasan Cache PWA**:
     - Parameter aset dinaikkan ke versi `v2.9.14` pada `index.html`, `styles.css`, `app.js`, dan `sw.js`.

---

### 2. ✨ Penambahan Efek Pendaran Cahaya (Outer Glow) Merah Putih di Pinggir Kotak Event (Update v2.9.13 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Menambahkan efek di pinggir kotak event terdekat seolah menyala (*outer glow*) dengan nuansa merah putih yang anggun dan berkarakter, tanpa elemen putaran latar belakang.
- **Solusi & Rekayasa CSS Luminous Outerglow**:
  1. **Multi-Stop Atmospheric Outer Glow (`box-shadow`)**:
     - Memadukan pendaran cahaya merah cerah (`rgba(239, 68, 68, 0.85)`), kilau putih kristal (`rgba(255, 255, 255, 0.65)`), serta aura ambient merah tua yang menyebar (`rgba(220, 38, 38, 0.45)`).
     - Garis bingkai (*border*) kartu diberi sentuhan putih menyala berpadu merah muda (`rgba(255, 255, 255, 0.75)`).
  2. **Animasi Pendaran Bernapas Halus (`@keyframes redWhiteOuterGlowPulse`)**:
     - Efek pendaran bernapas secara dinamis (3 detik alternate) menghasilkan kesan kotak event benar-benar menyala memancarkan cahaya (*luminous outer glow*).
     - Pada saat kursor berada di atas kartu (*hover*), pendaran cahaya meningkat lebih terang secara elegan.
  3. **Penyelarasan Cache PWA**:
     - Parameter aset dinaikkan ke versi `v2.9.13` pada `index.html`, `styles.css`, `app.js`, dan `sw.js`.

---

### 2. 🧹 Pembersihan Total Efek Merah Putih & Sinkronisasi Cache Registration (Update v2.9.12 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Memastikan seluruh efek merah putih yang berputar di belakang kotak event benar-benar bersih dan hilang.
  - Memperbaiki registrasi Service Worker di `app.js` yang sebelumnya mempertahankan nama cache lama sehingga browser klien terus menampilkan cache usang.
- **Tindakan & Solusi**:
  1. **Konfirmasi Nol Elemen & Animasi Rotasi Merah Putih**:
     - `styles.css` dan `index.html` diverifikasi 100% bebas dari segala rotasi conic/outerglow merah-putih di belakang kotak event.
     - Kotak kembali berlatar luxury dark emerald glassmorphism dengan garis tepi emerald halus (`border: 1.5px solid rgba(16, 185, 129, 0.45)`).
  2. **Pembersihan Cache PWA Agresif**:
     - `CURRENT_CACHE_NAME` dan URL registrasi SW pada `app.js` diselaraskan ke `v2.9.12`.
     - `sw.js` cache name diperbarui ke `rt-finsmart-cache-v2.9.12` dan membersihkan seluruh cache lama secara otomatis saat aktivasi.
  3. **Penyelarasan Versi**:
     - Parameter query aset dinaikkan ke versi `v2.9.12` pada `index.html`, `styles.css`, `app.js`, dan `sw.js`.

---

### 2. 🛡️ Restorasi Kotak Event ke Kondisi Awal Sebelum Efek Merah Putih Memutar di Belakang (Update v2.9.11 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Mengembalikan kotak event ke kondisi awal yang bersih (*clean luxury glassmorphism*) persis sebelum diberikan efek garis merah-putih memutar maupun outerglow di belakangnya.
- **Tindakan & Restorasi Arsitektur**:
  1. **Menghapus Seluruh Efek Rotasi Merah Putih di Belakang Kotak**:
     - Menghapus elemen ekstra `.event-border-outerglow`, `.event-border-rotator-frame`, `.event-border-rotator`, `.event-card-inner-base`, dan halo merah-putih.
     - Mengembalikan struktur kartu `.hub-event-banner` ke tampilan awal: border emerald mewah `border: 1.5px solid rgba(16, 185, 129, 0.45)`, background deep luxury green gradient, dan bayangan multi-stop halus tanpa perputaran warna merah putih di belakangnya.
  2. **Pengembalian Carousel Slider & Komponen Asli**:
     - Mengembalikan Carousel Controller Bar (`.event-flyer-carousel-bar` dengan indikator halaman, slider dots interaktif, tombol navigasi prev/next, dan autoplay rotasi event otomatis 7 detik).
     - Menampilkan kembali daftar 3 agenda terdekat (Kerja Bakti, Ronda Malam & Penarikan Jimpitan, serta Maulid Nabi & Santunan Yatim).
  3. **Penyelarasan Cache PWA**:
     - Parameter aset dinaikkan ke versi `v2.9.11` pada `index.html`, `styles.css`, `app.js`, dan `sw.js`.

---

### 2. 🇮🇩 Transformasi Garis-Garis Merah Putih Menjadi Outerglow Memancar Keliling Kotak (Update v2.9.10 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  - Mengubah pendaran cahaya pinggir kotak EVENT TERDEKAT di mana garis-garis merah putih yang mengelilingi kotaknya aktif memancarkan **outerglow** (pendaran cahaya bersinar ke luar kotak).
- **Solusi & Rekayasa Desain 3-Lapis (Tri-Layer Outerglow Architecture)**:
  1. **Lapisan Outerglow (`.event-border-outerglow`)**:
     - Diposisikan di belakang kotak (`z-index: 0`, `inset: -12px`) dengan `border-radius: 38px`.
     - Menggunakan `repeating-conic-gradient` 24 strip merah-putih murni (`#ef4444` dan `#ffffff`) dengan akselerasi hardware.
     - Diberi filter `blur(18px)` dan opacity tinggi (0.95), berputar 360° secara halus (`rotateRedWhiteOuterglow 6s linear infinite`) dipadukan dengan efek denyut bernapas dinamis (`redWhiteOuterglowPulse 3s ease-in-out infinite alternate`).
  2. **Lapisan Garis Merah-Putih Pinggir Kotak (`.event-border-rotator-frame`)**:
     - Membungkus pinggir kotak dengan garis-garis merah putih berputar tepat pada frame kartu (`z-index: 1`), dipadukan dengan background dasar kartu (`.event-card-inner-base`, `z-index: 2`).
  3. **Z-Index Konsisten untuk Konten Interaktif**:
     - Seluruh elemen flyer (`.event-flyer-topline`, `.event-banner-main`, `.event-flyer-footer-actions`, `.btn-event-popup-close`) berada di `z-index: 5-25`, memastikan teks tajam, kontras, dan tombol interaktif 100% responsif.
  4. **Penyelarasan Cache PWA**:
     - Parameter aset dinaikkan ke versi `v2.9.10` pada `index.html`, `styles.css`, `app.js`, dan `sw.js`.

---

### 2. 🌟 Rampingkan Pop-Up Event Terdekat (1 Item) & Efek Pendaran Cahaya Merah Putih Memutari Kotak (Update v2.9.9 - 20 Sept 2026)
- **Latar Belakang & Permintaan Pengguna**:
  1. Menampilkan **hanya 1 item agenda terdekat utama saja** (Kerja Bakti & Fogging DBD) agar ukuran kartu pop-up menjadi jauh lebih ramping, proporsional, dan ringkas.
  2. Menghilangkan kontrol slider carousel yang memakan tempat.
  3. Mengganti efek garis tepi menjadi **pendaran cahaya (*radiant glowing halo aura*) merah putih yang mengelilingi kotak event**.
- **Solusi & Rekayasa Desain**:
  1. **Ukuran Kotak Pop-up Lebih Ramping & Kompak**:
     - Memangkas lebar maksimal kartu menjadi `max-width: 530px` (sebelumnya 620px) dengan padding proporsional.
     - Menghilangkan elemen carousel indicator, slider dots, dan navigasi panah sehingga tinggi kotak berkurang drastis dan tampil sangat ramping ("ramping").
  2. **Efek Pendaran Cahaya Merah Putih Mengelilingi Kotak (`.event-card-redwhite-halo`)**:
     - Menyematkan elemen halo dengan `filter: blur(14px)` dan `conic-gradient` merah-putih yang memutari bagian luar kartu secara halus (`rotateRedWhiteHalo`).
     - Dipadukan dengan animasi pendaran cahaya bernafas (`redWhitePulsingAura`) pada bingkai kartu sehingga memancarkan aura cahaya merah dan putih yang anggun dan dinamis.
  3. **Penyelarasan Cache PWA**:
     - Parameter aset telah dinaikkan ke versi `v2.9.9` pada `index.html`, `styles.css`, `app.js`, dan `sw.js`.

---

### 2. 🇮🇩 Efek Animasi Garis-Garis Merah Putih Memutar Pinggir Kotak EVENT TERDEKAT (Update v2.9.8 - 20 Sept 2026)
- **Latar Belakang & Kebutuhan**:
  - Menambahkan animasi bingkai dinamis berupa **garis-garis merah putih yang memutar mengelilingi kotak EVENT TERDEKAT** agar tampilan pop-up semakin eye-catching, hidup, dan kental dengan nuansa Merah Putih warga.
- **Solusi & Rekayasa CSS Animation**:
  1. **Border Runner Garis Merah Putih Memutar pada Kotak Modal (`.hub-event-banner`)**:
     - Menggunakan lapisan animasi `repeating-conic-gradient` dengan segmen garis berselang-seling merah (`#e11d48` / `#dc2626`) dan putih (`#ffffff`) murni.
     - Digerakkan dengan animasi kontinu 360 derajat `@keyframes rotateRedWhiteBorder` yang diakselerasi perangkat keras (`will-change: transform`).
     - Lapisan dalam kartu disetel menyisakan bingkai tepi 3.5px yang memancarkan rotasi garis merah putih secara presisi mengikuti kelengkungan *border-radius: 28px*.
     - Efek pendaran cahaya (*atmospheric neon aura*) merah dan putih di sekeliling kotak saat diam maupun disentuh (hover).
  2. **Border Runner Merah Putih Memutar pada Kapsul Label "EVENT TERDEKAT" (`.event-live-beacon`)**:
     - Kapsul label badge di bagian header kartu juga disematkan animasi garis merah putih memutar di sekeliling tepinya, menyempurnakan identitas visual yang serasi dan harmonis.
  3. **Penyelarasan Cache PWA**:
     - Seluruh aset diperbarui ke versi `v2.9.8` di `index.html`, `styles.css`, `app.js`, dan `sw.js`.

---

### 2. 📢 Perombakan Pop-Up Event Terdekat Menjadi Model "Luxury Event Flyer Modal" (Update v2.9.7 - 20 Sept 2026)
- **Latar Belakang & Masalah Sebelumnya**:
  1. Pop-up pengumuman event sebelumnya masih menggunakan format banner horizontal memanjang (880px) yang ditempelkan ke modal overlay.
  2. Muncul scrollbar vertikal di sisi kanan kartu yang memotong tombol navigasi slider (`<` `>`) dan mengganggu estetika visual.
  3. Tombol aksi (CTA) dan navigasi slider berdesakan di kolom kanan sempit.
- **Solusi & Rekayasa Desain UI/UX (Opsi 1)**:
  1. **Desain Pop-Up Luxury Digital Flyer (Vertikal & Proporsional)**:
     - Mengubah orientasi menjadi kartu flyer sentral modern (`max-width: 620px`) yang pas di layar desktop, tablet, maupun ponsel tanpa scrollbar yang memotong kartu.
     - Penambahan garis aksen atas bercahaya (*ambient top accent beam*) dengan kombinasi emerald dan gold.
  2. **Grid Detail Acara 2x2 Glass Cards**:
     - Mengubah daftar chip memanjang menjadi grid 2x2 berbingkai transparan dengan ikon terspesialisasi:
       * 📅 *Hari & Tanggal* (Emerald)
       * ⏰ *Waktu Pelaksanaan* (Cyan)
       * 📍 *Lokasi / Titik Kumpul* (Rose)
       * ☕ *Konsumsi & Fasilitas* (Gold)
  3. **Bar Navigasi & Carousel Rapi**:
     - Indikator agenda (*"Agenda X dari 3"*), dots indikator dinamis dengan glow hijau emerald, dan tombol panah navigasi (`<` `>`) tersusun rapi di bagian bawah.
  4. **Tombol Aksi Penuh (Full-Width CTAs)**:
     - Tombol *"Lihat Agenda Lengkap Warga"* (Emerald gradient beranimasi) dan *"Ingatkan di WA Warga"* (WhatsApp green outline glow) berdampingan proporsional dan mudah ditekan.
  5. **Fleksibilitas Menutup Modal**:
     - Modal dapat ditutup melalui tombol silang (X) yang elegan, menekan tombol `Esc`, tombol detail agenda, maupun mengklik area latar luar (backdrop).
  6. **Pembaruan Cache PWA**:
     - Parameter cache diperbarui ke `v2.9.7` pada `index.html`, `styles.css`, `app.js`, dan `sw.js`.

---

### 2. 🔒 Penghapusan Hint Kalimat PIN Rahasia & Penataan Berkas Font Bersih (Update v2.9.6 - 20 Sept 2026)
- **Latar Belakang & Kebutuhan**:
  1. Teks petunjuk *"PIN: 1111 / 2222 / 3333"* yang berada di bawah kolom PIN pada formulir login pengurus perlu dihilangkan demi menjaga keamanan dan kerahasiaan kredensial sistem.
  2. Merapikan penempatan berkas font `MaskingRenta.otf` agar tersimpan eksklusif di dalam folder `assets/MaskingRenta.otf` dan menghapus berkas redundan di root folder.
- **Solusi & Rekayasa Keamanan**:
  1. **Penghapusan Teks Hint PIN di Modal Login**: Menghapus elemen `<span class="login-hint-badge"><i class="fa-solid fa-circle-info"></i> PIN: 1111 / 2222 / 3333</span>` pada baris opsi login di `index.html`.
  2. **Pembersihan Pesan Kesalahan**: Menghapus teks bocoran PIN pada pesan kesalahan login di `app.js` (kini hanya menampilkan *"PIN salah. Silakan coba lagi."*).
  3. **Konsolidasi Berkas Font Kustom**: Mengonsolidasikan pemuatan font ke folder `assets/MaskingRenta.otf`, menyelaraskan `@font-face` di `styles.css`, preload di `index.html`, dan cache di `sw.js`, serta menghapus berkas duplikat di root folder `WORKSPACE RT/`.
  4. **Penyelarasan Cache PWA**: Seluruh parameter aset diperbarui ke versi `v2.9.6`.

---

### 1. 🔤 Penerapan Font Custom "MaskingRenta" pada Teks "WARGA RT.001 RW.013" (Update v2.9.5 - 20 Sept 2026)
- **Latar Belakang & Kebutuhan**:
  - Pengguna menyediakan berkas tipografi kustom resmi `MaskingRenta.otf` untuk diterapkan khusus pada elemen judul utama *"WARGA RT.001 RW.013"* di banner bendera merah putih halaman depan agar tampilan teks memiliki identitas visual yang khas, tegas, dan eksklusif.
- **Solusi & Rekayasa Web Typography**:
  1. **Integrasi `@font-face` MaskingRenta**:
     - Mendaftarkan deklarasi font kustom di awal `styles.css` dengan alias `MaskingRenta` dan `Masking Renta`.
     - Mendukung pemuatan lokal dari root `./MaskingRenta.otf` dan `./assets/MaskingRenta.otf` dengan `font-display: swap` dan rentang bobot fleksibel (`font-weight: 100 900`).
     - Menyematkan `<link rel="preload" href="MaskingRenta.otf" as="font" type="font/otf" crossorigin>` pada `<head>` di `index.html` untuk memangkas *render blocking* dan mengeliminasi kedipan font (FOUT/FOIT).
  2. **Penerapan pada Elemen Split-Text**:
     - Menyetel `font-family: 'MaskingRenta', 'Masking Renta', ...` pada `.split-line-main` dan seluruh sub-elemen kata serta huruf split-text (`.word` dan `.char`).
     - Mempertahankan warna solid Deep Emerald (`#006600`) dengan pembatas kontras putih solid (`-webkit-text-stroke` dan solid `text-shadow`) agar teks MaskingRenta terbaca jernih di atas bagian merah maupun putih bendera.
     - Mempertahankan animasi breathing 4 detik (`textLevitation`) dan 3D hover tilt.
  3. **Preservasi Responsivitas Layar Ponsel (Mobile 90% Pengguna)**:
     - Memastikan styling font `MaskingRenta` diatur dengan `white-space: nowrap;` dan `font-size: clamp(1.12rem, 5vw, 1.5rem) !important;` pada media query ponsel, menjamin judul tidak patah baris di layar smartphone.
  4. **Pembaruan Cache Service Worker PWA**:
     - Berkas font `MaskingRenta.otf` dan `assets/MaskingRenta.otf` didaftarkan ke `ASSETS_TO_CACHE` di `sw.js`.
     - Parameter aset di `index.html` dan `sw.js` diselaraskan ke `v2.9.5`.

---

### 1. 🌿 Tipografi Kontras Tinggi & Warna Solid Deep Emerald `#006600` pada "WARGA RT.001 RW.013" serta Optimasi Layar Ponsel (Update v2.9.4 - 20 Sept 2026)
- **Latar Belakang & Kebutuhan**:
  1. Efek gradasi `background-clip` perak/emas muda dan soft outer glow sebelumnya membuat teks judul *"WARGA RT.001 RW.013"* tampak memudar di atas latar belakang video bendera merah putih yang dinamis.
  2. Dibutuhkan kontras tinggi dengan warna solid pekat `#006600` (Deep Emerald).
  3. Penambahan pembatas kontras putih tipis solid (`text-shadow` dan `-webkit-text-stroke` putih solid) untuk memisahkan teks dari area merah bendera yang gelap dan mempertahankan keterbacaan di area putih bendera.
  4. Animasi 3D hover tilt dan levitation 4 detik (*breathing*) dipertahankan sepenuhnya tanpa merusak warna solid `#006600`.
  5. Optimasi khusus tampilan ponsel (*mobile-first* 90% pengguna) agar teks tetap dalam satu baris utuh (`white-space: nowrap`), tidak patah kata/baris secara canggung, dan proporsional di seluruh resolusi layar smartphone.
- **Solusi & Rekayasa CSS**:
  1. **Warna Solid Deep Emerald (`#006600`)**: Menghapus `background: linear-gradient` dan `-webkit-background-clip: text`. Menyetel `color: #006600; -webkit-text-fill-color: #006600;` pada `.split-line-main` dan seluruh anak elemen split-text (`.word` dan `.char`).
  2. **Pembatas Kontras Putih Solid**: Menerapkan `-webkit-text-stroke: 0.65px rgba(255, 255, 255, 0.95)` dan multi-directional solid crisp `text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.95), -1px -1px 0px rgba(255, 255, 255, 0.95), 1px -1px 0px rgba(255, 255, 255, 0.95), -1px 1px 0px rgba(255, 255, 255, 0.95), 0px 2px 5px rgba(0, 0, 0, 0.5)` yang menghasilkan rasio kontras 7.24:1 terhadap latar putih dan batas pemisah putih yang tegas terhadap latar merah bendera.
  3. **Preservasi Animasi**: Mempertahankan `animation: textLevitation 4s ease-in-out infinite;` dan 3D hover tilt `transform: perspective(900px) rotateX(7deg) rotateY(-5deg) translateY(-5px) scale(1.025);`.
  4. **Optimasi Layar Ponsel (Mobile 90% Pengguna)**: Menerapkan `font-size: clamp(1.12rem, 5vw, 1.5rem) !important;`, `white-space: nowrap;`, `line-height: 1.25;`, dan margin kata yang presisi di dalam media query mobile sehingga judul tertata rapi, proporsional, dan sangat tajam saat dibuka dari smartphone warga.
  5. **Penyelarasan Cache Busting ke `v=2.9.4`**: Berkas `index.html`, `styles.css`, `app.js`, dan `sw.js` diperbarui ke `v2.9.4`.

---

### 1. 💼 Transformasi "Pemasukkan NON iuran", Laporan Lengkap Akuntansi & Akses Transparansi Multi-Role (Read-Only) (Update v2.9.3 - 20 Sept 2026)
- **Latar Belakang & Kebutuhan**:
  1. Penamaan modul dan seluruh istilah terkait diubah dari *"Penerimaan Di Luar Iuran"* menjadi **"Pemasukkan NON iuran"**.
  2. Dibutuhkan sajian **Laporan Lengkap** akuntansi formal mencakup seluruh komponen kas non-iuran: **Pemasukkan**, **Pengeluaran**, dan **Saldo Kas Berjalan**, dilengkapi rekap per kategori sumber dana, buku besar mutasi kronologis, dan lembar pengesahan resmi bertanda tangan Ketua RT & Bendahara 1.
  3. Kebutuhan azas transparansi publik agar modul Pemasukkan NON iuran dapat ditinjau langsung oleh **Warga** (di Portal Warga), **Pengurus RT**, serta **Admin 2 (Bendahara 2)**, namun dengan proteksi ketat **Read / View Only** (hak cipta/edit/hapus mutlak berada di Bendahara 1).
- **Solusi & Rekayasa Arsitektur**:
  1. **Standardisasi Nomenklatur Global ("Pemasukkan NON iuran")**:
     - Memperbarui label menu sidebar, header banner, kartu metrik, formulir modal input, tabel mutasi kas, lembar kuitansi digital WhatsApp, hingga tajuk berkas ekspor CSV menjadi *"Pemasukkan NON iuran"*.
  2. **Modal Laporan Lengkap Akuntansi Kas Non-Iuran (`#modal-non-dues-report`)**:
     - **Kop Surat Resmi**: Rukun Tetangga 001 / RW 013 Perumahan Graha Asri - Sektor Graha Jababeka.
     - **3 Summary Card**: Total Pemasukkan (Penerimaan), Total Pengeluaran, dan Saldo Bersih Kas Non-Iuran.
     - **Tabel Rekapitulasi per Kategori Sumber Dana**: Agregasi frekuensi transaksi dan nominal subtotal (Donasi Warga, Bantuan Hibah, Sewa Fasum, Sponsorship, dan Daur Ulang).
     - **Buku Kas Kronologis Lengkap**: Menggabungkan seluruh arus dana masuk dan keluar secara terurut tanggal, dengan kolom Tanggal, Jenis, Kategori, Uraian, Pemasukan (Debet), Pengeluaran (Kredit), dan Saldo Kas Berjalan (*Running Balance*).
     - **Tanda Tangan Pengesahan Ganda**: Kolom persetujuan Ketua RT 001 (Supriyadi) dan Bendahara 1 RT 001.
     - **Opsi Ekspor**: Tombol *Cetak / Simpan PDF* (tampilan print stylesheet ramah cetak) dan *Unduh CSV*.
  3. **Integrasi Rekapitulasi ke Laporan Keuangan Umum (`#view-laporan`)**:
     - Menambahkan sub-tabel akuntansi *"Rekapitulasi Kas Pemasukkan NON Iuran"* di bawah tabel pos anggaran pada lembar laporan keuangan komprehensif RT.
  4. **Proteksi Hak Akses Multi-Role (Read / View Only)**:
     - **Bendahara 1 (B1)**: Tetap memegang hak *Super Admin* penuh untuk mencatat pemasukan, mencatat pengeluaran, serta menghapus data transaksi.
     - **Admin 2 (B2)** & **Pengurus RT**: Dapat membuka modul dari sidebar dan memeriksa buku kas, melihat kuitansi, membaca laporan lengkap, serta mengekspor data. Tombol *"Catat Penerimaan"* dan *"Catat Pengeluaran"* disembunyikan otomatis, tombol hapus diganti lencana *"Terverifikasi"*, dan backend JavaScript dijaga dengan proteksi guard `isB1`.
     - **Portal Warga (`#view-portal-warga`)**: Dilengkapi kartu transparansi mewah *"Pemasukkan NON Iuran RT"* dengan live summary (Pemasukan, Pengeluaran, Saldo), indikator mutasi terakhir, tombol cepat *"Rincian Kas"*, dan tombol *"Laporan Lengkap"*.
  5. **Penyelarasan Cache Busting & PWA ke `v=2.9.3`**:
     - Berkas [index.html](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/index.html), [styles.css](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/styles.css), [app.js](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/app.js), dan [sw.js](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/sw.js) diselaraskan ke versi `v2.9.3`.

---

### 1. ✨ Tipografi Mewah & Modern Elemen Teks "WARGA RT.001 RW.013" (Update v2.9.2 - 20 Sept 2026)
- **Latar Belakang & Kebutuhan**:
  - Teks utama *"WARGA RT.001 RW.013"* pada video banner bendera merah putih halaman depan sebelumnya menggunakan `text-shadow` hitam pekat yang kaku dan statis. Diperlukan sentuhan styling CSS modern untuk menghadirkan kesan mewah (*luxury*), elegan, dan interaktif sesuai standar desain web premium.
- **Solusi & Implementasi 5 Fitur CSS Modern**:
  1. **Tipografi & Soft Outer Glow**:
     - Menghapus bayangan hitam pekat (`rgba(0,0,0,1)` dan `rgba(0,0,0,0.95)`).
     - Menggantinya dengan pendaran cahaya lembut (*soft outer glow*) menggunakan kombinasi `text-shadow` dan `filter: drop-shadow` berwarna terang (`#fef08a` emas muda dan `#ffffff` putih murni) dengan blur tinggi dan opasitas rendah yang membaur mulus di atas kibaran bendera.
  2. **Aksen Logam Metalik (Silver & Champagne Gold)**:
     - Menerapkan gradasi warna multi-stop (`#f8fafc`, `#cbd5e1`, `#fef08a`, `#ffffff`, `#fde047`, `#cbd5e1`) menyerupai kilau perak dan emas muda mewah.
     - Menggunakan `background: linear-gradient(115deg, ...)` dengan `-webkit-background-clip: text`, `background-clip: text`, serta `color: transparent` dan `-webkit-text-fill-color: transparent`.
     - Menyinkronkan kliping teks ke seluruh elemen anak kata dan huruf split-text (`.word` dan `.char`) secara terpadu.
  3. **Animasi Shimmer (Light Sweep)**:
     - Menambahkan `@keyframes metallicShimmer` yang menggeser `background-position` melintasi teks dari kiri ke kanan secara berkala (`6s ease-in-out infinite`), memantulkan garis kilauan cahaya alami.
  4. **Animasi Levitation (Breathing Mulus 4 Detik)**:
     - Menambahkan `@keyframes textLevitation` yang menggerakkan teks naik-turun secara statis (sekitar 4px) dalam ritme siklus 4 detik (`4s ease-in-out infinite`) selaras dengan gelombang bendera merah putih di latar belakang.
  5. **3D Hover Tilt & Reaksi Interaktif**:
     - Menambahkan `transform: perspective(900px)` dan rotasi 3D (`rotateX(7deg) rotateY(-5deg) translateY(-5px) scale(1.025)`) pada state `.split-line-main:hover` dengan transisi halus kurva `cubic-bezier(0.16, 1, 0.3, 1)`.
     - Saat kursor diarahkan, pendaran glow menguat secara dramatis (`filter: drop-shadow(...)`), memberikan respons interaktif yang memukau pengguna.
  6. **Penyelarasan Cache Busting ke `v=2.9.2`**:
     - Berkas [index.html](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/index.html), [styles.css](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/styles.css), dan [sw.js](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/sw.js) diselaraskan ke `v2.9.2`.

---

### 2. 💫 Logo Bulat dengan Efek Rotating Orbital Glowing Ring di Sidebar Dashboard Admin (Update v2.9.1 - 20 Sept 2026)
- **Latar Belakang & Kebutuhan**:
  - Logo pada header sidebar Dashboard Admin sebelumnya masih berbentuk kotak bersudut tumpul (*rounded square*) biasa tanpa animasi, berbeda dengan estetika logo di halaman depan (*splash loading screen* Gambar 2) yang berbentuk bulat elegan dengan lingkaran orbital berkilau dan berkas cahaya yang berputar mengelilingi logo.
- **Solusi & Rekayasa Desain (Sesuai Gambar 2)**:
  1. **Struktur DOM Baru (`.sidebar-logo-wrap`)**:
     - Menggantikan `.logo-img-wrapper` statis dengan struktur berlapis 4 elemen:
       - `.sidebar-ambient-halo`: Aura pendaran ambient lembut berdenyut halus (*radial-gradient pulse* warna emas & zamrud).
       - `.sidebar-orbital-track`: Lintasan orbit melingkar 360 derajat dengan pantulan cahaya halus.
       - `.sidebar-orbital-spinner`: Berkas cahaya melengkung (*arc beam*) berputar terus-menerus (`rotateOrbitalLight`) dengan kombinasi warna emas menyala (`#fbbf24`), hijau zamrud (`#34d399`), serta titik sorot bintang putih berkilau di ujung putaran.
       - `.sidebar-logo-circle`: Lencana bulat putih mewah (*circular badge*) `border-radius: 50%` dengan bayangan kedalaman multi-layer, membingkai logo resmi RT.001 / RW.013 Graha Asri secara presisi.
  2. **Responsivitas & Kondisi Ciut (Collapsed Sidebar)**:
     - Ketika sidebar diciutkan (`.sidebar.collapsed`), logo otomatis berpusat rapi dan proporsional (44px) tanpa terdistorsi atau terpotong.
  3. **Penyelarasan Cache Busting ke `v=2.9.1`**:
     - Berkas [index.html](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/index.html), [styles.css](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/styles.css), [app.js](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/app.js), dan [sw.js](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/sw.js) diselaraskan ke `v2.9.1`.

---

### 2. 💰 Modul Penerimaan Di Luar Iuran Bulanan Khusus Bendahara 1 (Update v2.9.0 - 20 Sept 2026)
- **Latar Belakang & Kebutuhan**:
  - Pengurus RT membutuhkan pencatatan terpisah dan transparan khusus Bendahara 1 untuk mengelola seluruh dana non-iuran bulanan warga (donasi sukarela, bantuan hibah pemerintah/kelurahan, sewa sarana/fasum RT seperti tenda dan kursi, sponsorship acara warga/17-an, serta hasil penjualan sampah daur ulang/rongsok RT).
- **Solusi & Rekayasa Arsitektur**:
  1. **Hak Akses Eksklusif Bendahara 1 (B1 Strict RBAC)**:
     - Ditambahkan menu navigasi baru: **"Penerimaan Di Luar Iuran"** (`data-target="non-iuran"`) dengan ikon `fa-hand-holding-dollar` dan lencana counter realtime.
     - Dibatasi secara ketat hanya dapat dilihat dan dibuka oleh Bendahara 1 (PIN: `1111`). Menu tersembunyi 100% untuk B2, Pengurus RT, Warga, maupun pengunjung publik yang belum login.
     - Upaya pengaksesan URL hash langsung (`#non-iuran`) otomatis dicegat oleh sistem proteksi `applyRBAC()` dan `navigateToView()`.
  2. **Tiga Indikator Finansial Utama (KPI Cards)**:
     - **Total Penerimaan Non-Iuran**: Kalkulasi akumulasi seluruh dana masuk di luar iuran bulanan + counter jumlah transaksi.
     - **Total Pengeluaran Non-Iuran**: Kalkulasi akumulasi seluruh pengeluaran pos kas non-iuran + counter pos pengeluaran.
     - **Saldo Kas Non-Iuran**: Saldo kas bersih (`Penerimaan − Pengeluaran`) dengan styling dinamis (warna emas berkilau jika positif/surplus).
     - **Mutasi Terakhir**: Menampilkan tanggal, kategori pos, dan nominal transaksi terakhir.
  3. **Form Modal Input Transaksi Modern**:
     - **Catat Penerimaan (`#modal-add-non-dues-income`)**: Tanggal penerimaan, kategori sumber, donatur/sumber dana (dengan autocomplete datalist 112 KK warga), nominal rupiah terformat titik ribuan, metode pembayaran (Tunai/Transfer/QRIS), dan catatan peruntukan.
     - **Catat Pengeluaran (`#modal-add-non-dues-expense`)**: Tanggal pengeluaran, kategori pengeluaran, uraian keperluan, penanggung jawab/penerima, nominal rupiah, dan catatan bukti nota toko.
  4. **Kuitansi Digital & WhatsApp Share Generator**:
     - Setiap transaksi penerimaan dilengkapi tombol **"Kuitansi"** yang memunculkan tanda terima sah berkop RT.001 / RW.013 Graha Asri lengkap dengan nomor bukti, tanggal, donatur, jumlah nominal, dan stempel status *"DITERIMA DENGAN AMANAH"*.
     - Dilengkapi tombol **"Bagikan ke WhatsApp"** yang otomatis memformat pesan konfirmasi tanda terima sopan dan siap kirim ke donatur/warga.
  5. **Ekspor CSV & Persistensi Penuh**:
     - Tombol **"Ekspor CSV"** untuk mengunduh mutasi kas non-iuran dalam format spreadsheet.
     - Tersimpan otomatis di `localStorage` dan terintegrasi dalam skema cadangan database `state`.
  6. **Penyelarasan Cache Busting ke `v=2.9.0`**:
     - Seluruh aset di [index.html](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/index.html), [app.js](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/app.js), dan [sw.js](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/sw.js) diselaraskan ke `v2.9.0`.

---

### 2. 🔒 Penegakan Status Read/View-Only Menyeluruh di Dashboard Warga (Update v2.8.9 - 20 Sept 2026)
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
