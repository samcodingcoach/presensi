# Dokumentasi Project Presensi Node.js

## Ringkasan Project
Project ini adalah aplikasi web sederhana menggunakan Node.js dan Express.js yang terhubung ke database MySQL/MariaDB. Aplikasi ini dirancang untuk sistem presensi dengan menggunakan database bernama 'presensi_sd'.

## Struktur Project
```
presensi/
├── server.js          # File utama aplikasi Express
├── koneksi.js         # Konfigurasi koneksi database
├── package.json       # Dependensi dan metadata project
├── package-lock.json  # Versi pasti dari semua dependensi
├── node_modules/      # Folder dependensi terinstall
└── routes/            # Folder untuk route (saat ini kosong)
```

## File Utama

### server.js
- Menggunakan Express.js sebagai framework web
- Menjalankan server pada port 3000
- Memiliki satu endpoint dasar di `/` yang mengembalikan pesan "Hello dari Node.js + Express!"

### koneksi.js
- Menggunakan library `mysql2` untuk koneksi database
- Terhubung ke database MySQL/MariaDB lokal
- Host: localhost
- User: root
- Password: samsu (konfigurasi lokal)
- Database: presensi_sd
- Melakukan pengecekan koneksi saat dijalankan

## Dependensi
- express: ^5.2.1
- mysql2: ^3.16.2

## Cara Menjalankan
Jalankan perintah berikut di terminal:
```bash
node server.js
```

Server akan berjalan di http://localhost:3000

## Catatan
- Pastikan database 'presensi_sd' sudah dibuat sebelum menjalankan aplikasi
- Sesuaikan konfigurasi koneksi database di koneksi.js dengan pengaturan lokal Anda