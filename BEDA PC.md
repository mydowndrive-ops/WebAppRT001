# 📖 PANDUAN KERJA BEDA LAPTOP / PC (RT-FinSmart PRO)

**Aplikasi:** RT-FinSmart PRO (RT.001 / RW.013 Graha Asri)  
**Versi:** `v2.9.81`  
**Repositori GitHub:** `https://github.com/mydowndrive-ops/WebAppRT001.git`  
**Database Cloud:** Supabase Cloud (`https://wmbguanfpgkcnfeagkcp.supabase.co`)  
**Live Production URL (Cloudflare Pages):** `https://rt001rw013grahaasri.pages.dev`  
**Format PDF Resmi:** Tersedia di file [BEDA PC.pdf](file:///c:/Users/anthu/Documents/%E3%80%90Project%20RT%E3%80%91/WORKSPACE%20RT/BEDA%20PC.pdf)

---

## 💡 TUJUAN PANDUAN INI
Agar saat Anda berganti komputer, menggunakan laptop kantor, meminjam laptop teman/orang lain, atau berpindah tempat kerja, Anda dapat **langsung membuka dan melanjutkan pengembangan/pengelolaan web secara instan tanpa harus login ke Google Drive sama sekali**.

Seluruh kode sumber, data warga (112 KK), inventaris aset (33 item), iuran, jimpitan, akun portal warga, dan konfigurasi telah tersinkronisasi otomatis via **GitHub** dan **Supabase Cloud**.

---

## 💻 SKENARIO 1: Membuka di Laptop / PC Baru (Belum Ada Project)
Lakukan langkah ini **hanya satu kali** pada komputer atau laptop baru:

1. Buka terminal di laptop tersebut (**PowerShell**, **Command Prompt / CMD**, atau **Git Bash**).
2. Jalankan perintah clone untuk mengunduh seluruh proyek beserta seluruh datanya:
   ```bash
   git clone https://github.com/mydowndrive-ops/WebAppRT001.git
   ```
3. Masuk ke folder proyek:
   ```bash
   cd WebAppRT001
   ```
4. Buka proyek:
   - Jika memakai VS Code / Antigravity IDE:
     ```bash
     code .
     ```
   - Atau langsung klik 2x file `index.html` di File Explorer untuk membuka di browser Chrome / Edge.

> **Status Langsung Siap Pakai:** Seluruh data master warga (112 KK), aset (33 item), iuran, dan jimpitan otomatis termuat dari Supabase Cloud & snapshot lokal `data/`.

---

## 🔄 SKENARIO 2: Melanjutkan di Laptop / PC yang Pernah Membuka Project
Jika laptop tersebut sudah pernah meng-clone proyek ini sebelumnya dan Anda ingin mengambil pembaruan paling mutakhir yang baru saja dikerjakan di PC lain:

1. Buka terminal di dalam folder proyek tersebut.
2. Jalankan satu perintah ini sebelum mulai bekerja:
   ```bash
   git pull origin main
   ```
3. Selesai! Seluruh perubahan kode terakhir, dokumentasi riwayat `LATEST.md`, dan data master lokal langsung terupdate serentak ke versi paling baru.

---

## 🚀 SKENARIO 3: Setiap Kali Selesai Melakukan Perubahan
* **Jika Anda bekerja bersama AI Agent (Antigravity IDE / Gemini):**  
  SOP otomatis telah aktif permanen: Agen akan **otomatis** memperbarui database Supabase Cloud, memperbarui snapshot lokal di folder `data/`, mencatat riwayat di `LATEST.md`, serta langsung melakukan `git push origin main` **tanpa menunggu perintah Anda**.
* **Jika Anda mengedit file secara manual sendiri tanpa Agen:**  
  Jalankan 3 perintah standar ini di terminal sebelum mematikan laptop:
  ```bash
  git add .
  git commit -m "update: catatan perubahan Anda"
  git push origin main
  ```

---

## 🗄️ INFORMASI ARSITEKTUR DATA (PENGGANTI GOOGLE DRIVE)

| Komponen | Teknologi / Lokasi | Keterangan |
| :--- | :--- | :--- |
| **Repositori Kode** | GitHub (`mydowndrive-ops/WebAppRT001`) | Cabang `origin/main` selalu paling mutakhir |
| **Database Cloud** | Supabase Cloud (PostgREST API) | Live real-time multi-perangkat (Warga, Aset, Iuran, Jimpitan) |
| **Cadangan Luring** | Folder lokal `data/*.json` | Snapshot data offline jika tidak ada koneksi internet |
| **Google Drive** | **TIDAK DIGUNAKAN LAGI** | Seluruh spreadsheet di Google Drive sudah aman dihapus permanen |

---

## 🔑 KREDENSIAL DEFAULT CEPAT
* **PIN Admin Bendahara 1 (Iuran & Keuangan):** `1111`
* **PIN Admin Bendahara 2 (Jimpitan & Ronda):** `2222`
* **PIN Pengurus RT (Ketua / Sekr / Humas):** `3333`
* **Password Default Portal Warga:** `C2` + Blok + NoRumah (Contoh Blok B1 No 05: `C2B105`)
