const express = require('express');
const db = require('../../koneksi');

const router = express.Router();

// Endpoint untuk memperbarui data siswa berdasarkan ID
router.post('/:id', (req, res) => {
  const id_siswa = req.params.id;
  const { 
    id_kelas, 
    nama_lengkap, 
    panggilan, 
    tanggal_lahir, 
    jenis_kelamin, 
    foto, 
    alamat, 
    no_hp, 
    aktif,
    nis,
    disabilitas,
    dijemput
  } = req.body;

  // Validasi ID siswa
  if (!id_siswa || isNaN(id_siswa)) {
    return res.status(400).json({
      success: false,
      message: 'ID siswa wajib disertakan dan harus berupa angka'
    });
  }

  // Validasi NIS jika disediakan (minimal 3, maksimal 10 karakter)
  if (nis && (nis.length < 3 || nis.length > 10)) {
    return res.status(400).json({
      success: false,
      message: 'NIS harus terdiri dari 3 hingga 10 karakter'
    });
  }

  // Validasi jenis_kelamin jika disediakan (harus 0 atau 1)
  if (jenis_kelamin !== undefined && ![0, 1].includes(jenis_kelamin)) {
    return res.status(400).json({
      success: false,
      message: 'Jenis kelamin harus 0 (perempuan) atau 1 (laki-laki)'
    });
  }

  // Validasi aktif jika disediakan (harus 0 atau 1)
  if (aktif !== undefined && ![0, 1].includes(aktif)) {
    return res.status(400).json({
      success: false,
      message: 'Status aktif harus 0 atau 1'
    });
  }

  // Validasi disabilitas jika disediakan (harus 0 atau 1)
  if (disabilitas !== undefined && ![0, 1].includes(disabilitas)) {
    return res.status(400).json({
      success: false,
      message: 'Disabilitas harus 0 atau 1'
    });
  }

  // Validasi dijemput jika disediakan (harus 0 atau 1)
  if (dijemput !== undefined && ![0, 1].includes(dijemput)) {
    return res.status(400).json({
      success: false,
      message: 'Dijemput harus 0 atau 1'
    });
  }

  // Cek apakah siswa dengan ID tersebut ada
  const checkQuery = 'SELECT id_siswa FROM siswa WHERE id_siswa = ?';
  db.query(checkQuery, [id_siswa], (err, result) => {
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

    // Siapkan data yang akan diperbarui
    const updateData = {};

    if (id_kelas !== undefined) updateData.id_kelas = id_kelas;
    if (nama_lengkap !== undefined) updateData.nama_lengkap = nama_lengkap;
    if (panggilan !== undefined) updateData.panggilan = panggilan;
    if (tanggal_lahir !== undefined) updateData.tanggal_lahir = tanggal_lahir;
    if (jenis_kelamin !== undefined) updateData.jenis_kelamin = jenis_kelamin;
    if (foto !== undefined) updateData.foto = foto;
    if (alamat !== undefined) updateData.alamat = alamat;
    if (no_hp !== undefined) updateData.no_hp = no_hp;
    if (aktif !== undefined) updateData.aktif = aktif;
    if (nis !== undefined) updateData.nis = nis;
    if (disabilitas !== undefined) updateData.disabilitas = disabilitas;
    if (dijemput !== undefined) updateData.dijemput = dijemput;

    // Jika tidak ada data yang akan diperbarui
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada data yang diperbarui. Harap sertakan setidaknya satu field untuk diperbarui.'
      });
    }

    // Lakukan update
    const updateQuery = 'UPDATE siswa SET ? WHERE id_siswa = ?';
    db.query(updateQuery, [updateData, id_siswa], (err, result) => {
      if (err) {
        console.error('Error updating siswa:', err);
        return res.status(500).json({
          success: false,
          message: 'Gagal memperbarui siswa di database'
        });
      }

      // Ambil data siswa yang telah diperbarui
      const selectQuery = 'SELECT * FROM siswa WHERE id_siswa = ?';
      db.query(selectQuery, [id_siswa], (err, result) => {
        if (err) {
          console.error('Error fetching updated siswa:', err);
          return res.status(500).json({
            success: false,
            message: 'Gagal mengambil data siswa yang diperbarui'
          });
        }

        res.status(200).json({
          success: true,
          message: 'Siswa berhasil diperbarui',
          data: result[0]
        });
      });
    });
  });
});

module.exports = router;