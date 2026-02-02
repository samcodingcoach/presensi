const express = require('express');
const db = require('../../koneksi');

const router = express.Router();

// Endpoint untuk menampilkan semua kelas atau kelas berdasarkan ID
router.get('/:id?', (req, res) => {
  const id_kelas = req.params.id;

  if (id_kelas) {
    // Jika ID kelas disediakan, cari kelas dengan ID tersebut
    if (isNaN(id_kelas)) {
      return res.status(400).json({
        success: false,
        message: 'ID kelas harus berupa angka'
      });
    }

    // Query untuk mengambil data kelas berdasarkan ID
    const query = 'SELECT * FROM kelas WHERE id_kelas = ?';
    
    db.query(query, [id_kelas], (err, results) => {
      if (err) {
        console.error('Error fetching kelas by ID:', err);
        return res.status(500).json({
          success: false,
          message: 'Gagal mengambil data kelas dari database'
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Kelas tidak ditemukan'
        });
      }

      // Mengembalikan data kelas
      res.status(200).json({
        success: true,
        message: 'Data kelas berhasil diambil',
        data: results[0]
      });
    });
  } else {
    // Jika ID kelas tidak disediakan, ambil semua kelas
    // Query untuk mengambil semua data kelas
    const query = 'SELECT * FROM kelas ORDER BY id_kelas';

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching kelas:', err);
        return res.status(500).json({
          success: false,
          message: 'Gagal mengambil data kelas dari database'
        });
      }

      // Jika tidak ada kelas ditemukan
      if (results.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'Tidak ada data kelas ditemukan',
          data: []
        });
      }

      // Mengembalikan data kelas
      res.status(200).json({
        success: true,
        message: 'Data kelas berhasil diambil',
        data: results
      });
    });
  }
});

module.exports = router;