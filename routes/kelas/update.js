const express = require('express');
const db = require('../../koneksi');

const router = express.Router();

// Endpoint untuk memperbarui data kelas berdasarkan ID
router.put('/:id', (req, res) => {
  const id_kelas = req.params.id;
  const { nama_kelas, simbol_kelas, wali, hp_wali } = req.body;

  // Validasi ID kelas
  if (!id_kelas || isNaN(id_kelas)) {
    return res.status(400).json({
      success: false,
      message: 'ID kelas wajib disertakan dan harus berupa angka'
    });
  }

  // Validasi panjang simbol_kelas jika disediakan (maksimal 4 karakter)
  if (simbol_kelas && simbol_kelas.length > 4) {
    return res.status(400).json({
      success: false,
      message: 'Simbol kelas maksimal terdiri dari 4 karakter'
    });
  }

  // Cek apakah kelas dengan ID tersebut ada
  const checkQuery = 'SELECT id_kelas FROM kelas WHERE id_kelas = ?';
  db.query(checkQuery, [id_kelas], (err, result) => {
    if (err) {
      console.error('Error checking kelas:', err);
      return res.status(500).json({
        success: false,
        message: 'Gagal memeriksa kelas di database'
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kelas tidak ditemukan'
      });
    }

    // Siapkan data yang akan diperbarui
    const updateData = {};
    
    if (nama_kelas) updateData.nama_kelas = nama_kelas;
    if (simbol_kelas) updateData.simbol_kelas = simbol_kelas;
    if (wali !== undefined) updateData.wali = wali; // Field ini bisa diupdate menjadi string kosong
    if (hp_wali !== undefined) updateData.hp_wali = hp_wali; // Field ini bisa diupdate menjadi string kosong

    // Jika tidak ada data yang akan diperbarui
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada data yang diperbarui. Harap sertakan setidaknya satu field untuk diperbarui.'
      });
    }

    // Lakukan update
    const updateQuery = 'UPDATE kelas SET ? WHERE id_kelas = ?';
    db.query(updateQuery, [updateData, id_kelas], (err, result) => {
      if (err) {
        console.error('Error updating kelas:', err);
        return res.status(500).json({
          success: false,
          message: 'Gagal memperbarui kelas di database'
        });
      }

      // Ambil data kelas yang telah diperbarui
      const selectQuery = 'SELECT * FROM kelas WHERE id_kelas = ?';
      db.query(selectQuery, [id_kelas], (err, result) => {
        if (err) {
          console.error('Error fetching updated kelas:', err);
          return res.status(500).json({
            success: false,
            message: 'Gagal mengambil data kelas yang diperbarui'
          });
        }

        res.status(200).json({
          success: true,
          message: 'Kelas berhasil diperbarui',
          data: result[0]
        });
      });
    });
  });
});

module.exports = router;