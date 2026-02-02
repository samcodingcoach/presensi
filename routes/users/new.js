const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../koneksi');

const router = express.Router();

// Endpoint untuk membuat user baru
router.post('/', async (req, res) => {
  try {
    const { nama, username, password, role } = req.body;

    // Validasi input
    if (!nama || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nama, username, dan password wajib diisi'
      });
    }

    // Hash password sebelum disimpan
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Data user yang akan disimpan
    const userData = {
      nama,
      username,
      password_hash: passwordHash,
      role: role || 2, // Default role adalah 2 jika tidak disediakan
      is_active: 1 // Default aktif
    };

    // Simpan ke database
    const query = 'INSERT INTO users SET ?';
    db.query(query, userData, (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({
          success: false,
          message: 'Gagal menyimpan user ke database'
        });
      }

      // Ambil data user yang baru saja dibuat (tanpa password_hash untuk keamanan)
      const newUser = {
        id_user: result.insertId,
        nama: userData.nama,
        username: userData.username,
        role: userData.role,
        is_active: userData.is_active,
        created_at: new Date()
      };

      res.status(201).json({
        success: true,
        message: 'User berhasil ditambahkan',
        data: newUser
      });
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat user'
    });
  }
});

module.exports = router;