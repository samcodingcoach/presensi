const express = require('express');
const router = express.Router();
const db = require('../../koneksi');

// Enkripsi menggunakan fungsi bawaan MySQL: AES_ENCRYPT
router.post('/', (req, res) => {
  const { username, nama_lengkap, role, password, email, hp, aktif } = req.body;

  // Validasi dasar
  if (!username || !nama_lengkap || !role || !password || !email || !hp || aktif === undefined) {
    return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
  }

  const sql = `
    INSERT INTO users 
      (username, nama_lengkap, role, password, email, hp, aktif)
    VALUES 
      (?, ?, ?, AES_ENCRYPT(?, ?), ?, ?, ?)
  `;

  db.query(sql, [username, nama_lengkap, role, password, hp, email, hp, aktif], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ success: false, message: 'Gagal menambahkan user', error: err.message });
    }

    res.json({
      success: true,
      message: `User '${username}' berhasil ditambahkan`,
      insertedId: result.insertId
    });
  });
});

module.exports = router;
