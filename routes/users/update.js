const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../koneksi');

const router = express.Router();

// Endpoint untuk memperbarui data user
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { nama, username, password, role, is_active } = req.body;

    // Validasi ID user
    if (!userId || isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: 'ID user wajib disertakan dan harus berupa angka'
      });
    }

    // Cek apakah user dengan ID tersebut ada
    const checkQuery = 'SELECT id_user FROM users WHERE id_user = ?';
    db.query(checkQuery, [userId], async (err, result) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({
          success: false,
          message: 'Gagal memeriksa user di database'
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User tidak ditemukan'
        });
      }

      // Siapkan data yang akan diperbarui
      const updateData = {};
      
      if (nama) updateData.nama = nama;
      if (username) updateData.username = username;
      if (role !== undefined) updateData.role = role;
      if (is_active !== undefined) updateData.is_active = is_active;

      // Jika password disertakan, hash terlebih dahulu
      if (password) {
        const saltRounds = 10;
        try {
          updateData.password_hash = await bcrypt.hash(password, saltRounds);
        } catch (hashError) {
          console.error('Error hashing password:', hashError);
          return res.status(500).json({
            success: false,
            message: 'Gagal mengenkripsi password'
          });
        }
      }

      // Jika tidak ada data yang akan diperbarui
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Tidak ada data yang diperbarui. Harap sertakan setidaknya satu field untuk diperbarui.'
        });
      }

      // Lakukan update
      const updateQuery = 'UPDATE users SET ? WHERE id_user = ?';
      db.query(updateQuery, [updateData, userId], (err, result) => {
        if (err) {
          console.error('Error updating user:', err);
          return res.status(500).json({
            success: false,
            message: 'Gagal memperbarui user di database'
          });
        }

        // Ambil data user yang telah diperbarui
        const selectQuery = 'SELECT id_user, nama, username, role, is_active, created_at FROM users WHERE id_user = ?';
        db.query(selectQuery, [userId], (err, result) => {
          if (err) {
            console.error('Error fetching updated user:', err);
            return res.status(500).json({
              success: false,
              message: 'Gagal mengambil data user yang diperbarui'
            });
          }

          res.status(200).json({
            success: true,
            message: 'User berhasil diperbarui',
            data: result[0]
          });
        });
      });
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memperbarui user'
    });
  }
});

module.exports = router;