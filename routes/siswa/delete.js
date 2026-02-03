const express = require('express');
const db = require('../../koneksi');

const router = express.Router();

// Endpoint untuk menghapus data siswa berdasarkan ID hanya jika dibuat hari ini
router.post('/:id', (req, res) => {
  const id_siswa = req.params.id;

  // Validasi ID siswa
  if (!id_siswa || isNaN(id_siswa)) {
    return res.status(400).json({
      success: false,
      message: 'ID siswa wajib disertakan dan harus berupa angka'
    });
  }

  // Ambil data siswa untuk memeriksa tanggal pembuatan
  const selectQuery = 'SELECT id_siswa, created_at FROM siswa WHERE id_siswa = ?';
  db.query(selectQuery, [id_siswa], (err, result) => {
    if (err) {
      console.error('Error checking siswa:', err);
      return res.status(500).json({
        success: false,
        message: 'Gagal memeriksa siswa di database'
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Siswa tidak ditemukan'
      });
    }

    const siswa = result[0];
    
    // Dapatkan tanggal hari ini dalam format YYYY-MM-DD
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
    
    // Dapatkan tanggal dari created_at dalam format YYYY-MM-DD
    const createdAtDate = new Date(siswa.created_at);
    const createdAtDateString = createdAtDate.toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Bandingkan tanggal
    if (createdAtDateString !== todayString) {
      return res.status(400).json({
        success: false,
        message: `Siswa hanya dapat dihapus jika dibuat hari ini (${todayString}). Siswa ini dibuat pada tanggal ${createdAtDateString}.`
      });
    }

    // Hapus siswa dari database
    const deleteQuery = 'DELETE FROM siswa WHERE id_siswa = ?';
    db.query(deleteQuery, [id_siswa], (err, result) => {
      if (err) {
        console.error('Error deleting siswa:', err);
        return res.status(500).json({
          success: false,
          message: 'Gagal menghapus siswa dari database'
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Siswa tidak ditemukan atau gagal dihapus'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Siswa berhasil dihapus'
      });
    });
  });
});

module.exports = router;