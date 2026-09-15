# 📱 Panduan Lengkap: Cara Mengubah RT-FinSmart Pro Menjadi File .APK Android

Aplikasi **RT-FinSmart Pro (Keuangan RT.001 / RW.013)** telah dirancang 100% menggunakan arsitektur **Progressive Web App (PWA)** dengan Manifest & Service Worker modern. Anda dapat mengubahnya menjadi file `.apk` dengan 3 metode mudah di bawah ini.

---

## ⚡ METODE 1: Cara Paling Cepat & Gratis Tanpa Coding (PWABuilder)
*Direkomendasikan untuk Pengurus RT yang ingin file `.apk` instan dalam 2 menit.*

1. **Upload / Host Web Ini Secara Gratis:**
   - Anda bisa meng-upload folder proyek ini ke layanan hosting gratis seperti **Vercel** (vercel.com), **Netlify** (netlify.com), atau **GitHub Pages**.
   - Contoh hasil URL: `https://rt01-finsmart.vercel.app`

2. **Buka Situs PWABuilder:**
   - Kunjungi [https://www.pwabuilder.com](https://www.pwabuilder.com)
   - Masukkan link URL website RT Anda di kolom input, lalu klik **Start**.

3. **Download File APK:**
   - PWABuilder akan mendeteksi manifest dan service worker secara otomatis (Skor PWA 100%).
   - Klik tombol **"Package for Android"** / **"Generate APK"**.
   - Unduh file `.apk` atau `.aab` yang dihasilkan.
   - Selesai! Bagikan file `.apk` tersebut ke grup WhatsApp pengurus RT untuk di-install di HP masing-masing.

---

## 📲 METODE 2: Install Langsung di HP Android Tanpa Download APK (WebAPK Native)
*Cara paling praktis tanpa perlu file installer, langsung muncul di menu aplikasi HP.*

1. Buka link web RT-FinSmart Pro di browser **Google Chrome** pada HP Android Anda.
2. Klik tombol **Titik Tiga (⋮)** di pojok kanan atas Chrome.
3. Pilih menu **"Tambahkan ke Layar Utama"** atau **"Install Aplikasi"** (*Add to Home Screen*).
4. Klik **Install**.
5. Aplikasi RT-FinSmart Pro akan otomatis terpasang di menu aplikasi HP Anda lengkap dengan ikon mewah dan berjalan secara mandiri (*Full Screen Standalone App* layaknya aplikasi perbankan berkelas).

---

## 💻 METODE 3: Build APK Menggunakan Capacitor / Android Studio (Untuk Developer)
*Jika Anda ingin mengompilasi file APK secara offline di komputer:*

1. Buka Terminal / PowerShell di folder proyek ini:
   ```bash
   npm init -y
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "RT FinSmart Pro" "com.rt001rw013.finsmart" --web-dir .
   ```

2. Tambahkan platform Android:
   ```bash
   npx cap add android
   ```

3. Buka di Android Studio:
   ```bash
   npx cap open android
   ```

4. Di Android Studio, klik **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
5. File `app-debug.apk` atau `app-release.apk` akan siap digunakan di folder `android/app/build/outputs/apk/`.

---

## 🔒 Keamanan & Data
- Aplikasi ini bekerja secara **Offline-First**. Data tersimpan aman di HP/komputer pengurus (LocalStorage/IndexedDB).
- Dilengkapi fitur **Backup JSON** di menu Pengaturan untuk mengamankan data dan memindahkan database antar HP pengurus dengan mudah.
