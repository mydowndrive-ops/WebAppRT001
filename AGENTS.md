# SOP & Aturan Kerja Otomatis Agen (AGENTS.md)

Dokumen ini merupakan aturan mutlak (*mandatory system rule*) untuk setiap AI agent yang bekerja pada repositori ini.

---

### 1. Sinkronisasi Data & Cadangan Lokal (`data/`)
- Setiap ada perubahan pada data warga, aset, iuran, jimpitan, ataupun agenda:
  - Sinkronkan dengan database **Supabase Cloud**.
  - Perbarui snapshot JSON di folder **`data/`** (`warga_master.json`, `aset_master.json`, dll.).
  - Sistem tidak boleh lagi memiliki ketergantungan pada Google Drive / Google Sheets.

### 2. Pembaruan Wajib `LATEST.md` (Hanya LATEST.md, Bukan BEDA PC)
- Setiap kali selesai melakukan perubahan atau penambahan fitur:
  - Perbarui stempel waktu (Tanggal & Jam WIB) dan versi rilis aktif.
  - Catat changelog perubahan secara terperinci di `LATEST.md`.
  - **PENTING**: Dokumen panduan `BEDA PC.md` / `BEDA PC.pdf` bersifat statis dan **TIDAK PERLU DIUPDATE**. Dokumen yang diperbarui secara berkala **HANYA `LATEST.md`** saja.

### 3. Otomatis Commit & Push ke GitHub (`origin/main`) Tanpa Menunggu Perintah
- Setiap perubahan kode atau data **WAJIB LANGSUNG DI-COMMIT DAN DI-PUSH KE GITHUB** tanpa perlu menunggu perintah/permintaan dari pengguna:
  ```bash
  git add .
  git commit -m "<tipe>(<lingkup>): <deskripsi perubahan>"
  git push origin main
  ```
- **Tujuan**: Memungkinkan pengguna langsung melanjutkan pengembangan dari perangkat/laptop lain kapan saja melalui GitHub tanpa harus mengakses Google Drive.
