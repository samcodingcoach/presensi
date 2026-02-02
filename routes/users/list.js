const express = require('express');
const db = require('../../koneksi');

const router = express.Router();

// Endpoint untuk menampilkan semua user
router.get('/', (req, res) => {
  // Query untuk mengambil semua data user kecuali password_hash
  const query = 'SELECT id_user, nama, username, role, is_active, created_at FROM users ORDER BY id_user';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil data user dari database'
      });
    }

    // Jika tidak ada user ditemukan
    if (results.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Tidak ada data user ditemukan',
        data: []
      });
    }

    // Mengembalikan data user
    res.status(200).json({
      success: true,
      message: 'Data user berhasil diambil',
      data: results
    });
  });
});

module.exports = router;