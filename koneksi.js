const mysql = require('mysql2');

const koneksi = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // sesuaikan dengan user MariaDB kamu
  password: 'samsu',       // kosongkan kalau tidak ada password
  database: 'presensi_sd'  // ganti dengan nama database kamu
});

koneksi.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal:', err);
    process.exit();
  } else {
    console.log('Koneksi ke database berhasil');
  }
});

module.exports = koneksi;
