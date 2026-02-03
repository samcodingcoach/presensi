const express = require('express');
const router = express.Router();
const db = require('../../koneksi');

// Route untuk menampilkan daftar siswa
router.get('/', (req, res) => {
  const query = `
    SELECT
        s.id_siswa,
        s.id_kelas,
        k.nama_kelas,
        k.simbol_kelas,
        s.nis,
        s.nama_lengkap,
        s.panggilan,
        s.tanggal_lahir,
        s.jenis_kelamin,
        s.foto,
        s.alamat,
        s.no_hp,
        s.aktif,
        s.disabilitas,
        s.dijemput
    FROM siswa s
    INNER JOIN kelas k
        ON s.id_kelas = k.id_kelas
    ORDER BY s.id_siswa DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data siswa',
        error: err.message
      });
    }

    res.json({
      success: true,
      message: 'Daftar siswa berhasil diambil',
      data: results,
      count: results.length
    });
  });
});

// Route untuk mencari siswa berdasarkan id_siswa atau nis
router.get('/:searchParam', (req, res) => {
  const searchParam = req.params.searchParam;
  
  // Validasi apakah parameter adalah angka (untuk id_siswa) atau string (untuk nis)
  const isNumeric = /^\d+$/.test(searchParam);
  
  let query = '';
  let queryParams = [];
  
  if (isNumeric) {
    // Jika parameter adalah angka, anggap sebagai id_siswa
    query = `
      SELECT
          s.id_siswa,
          s.id_kelas,
          k.nama_kelas,
          k.simbol_kelas,
          s.nis,
          s.nama_lengkap,
          s.panggilan,
          s.tanggal_lahir,
          s.jenis_kelamin,
          s.foto,
          s.alamat,
          s.no_hp,
          s.aktif,
          s.disabilitas,
          s.dijemput
      FROM siswa s
      INNER JOIN kelas k
          ON s.id_kelas = k.id_kelas
      WHERE s.id_siswa = ?
      ORDER BY s.id_siswa DESC
    `;
    queryParams = [parseInt(searchParam)];
  } else {
    // Jika parameter bukan angka, anggap sebagai nis
    query = `
      SELECT
          s.id_siswa,
          s.id_kelas,
          k.nama_kelas,
          k.simbol_kelas,
          s.nis,
          s.nama_lengkap,
          s.panggilan,
          s.tanggal_lahir,
          s.jenis_kelamin,
          s.foto,
          s.alamat,
          s.no_hp,
          s.aktif,
          s.disabilitas,
          s.dijemput
      FROM siswa s
      INNER JOIN kelas k
          ON s.id_kelas = k.id_kelas
      WHERE s.nis LIKE ?
      ORDER BY s.id_siswa DESC
    `;
    queryParams = [`%${searchParam}%`];
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mencari data siswa',
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.json({
        success: true,
        message: 'Data siswa tidak ditemukan',
        data: [],
        count: 0
      });
    }

    res.json({
      success: true,
      message: 'Data siswa ditemukan',
      data: results,
      count: results.length
    });
  });
});

module.exports = router;