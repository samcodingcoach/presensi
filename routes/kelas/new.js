const express = require('express');
const db = require('../../koneksi');

const router = express.Router();

// Endpoint untuk membuat kelas baru
router.post('/', (req, res) => {
  const { nama_kelas, simbol_kelas, wali, hp_wali } = req.body;

  // Validasi input
  if (!nama_kelas || !simbol_kelas) {
    return res.status(400).json({
      success: false,
      message: 'Nama kelas dan simbol kelas wajib diisi'
    });
  }

  // Validasi panjang simbol_kelas (maksimal 4 karakter)
  if (simbol_kelas.length > 4) {
    return res.status(400).json({
      success: false,
      message: 'Simbol kelas maksimal terdiri dari 4 karakter'
    });
  }

        // Data kelas yang akan disimpan
  const kelasData = {
    nama_kelas,
    simbol_kelas,
    wali: wali || '', // Berikan string kosong jika tidak disediakan
    hp_wali: hp_wali || '' // Berikan string kosong jika tidak disediakan
  };

  // Simpan ke database
  const query = 'INSERT INTO kelas SET ?';
  db.query(query, kelasData, (err, result) => {
    if (err) {
      console.error('Error inserting kelas:', err);
      console.error('Query:', query);
      console.error('Data:', kelasData);
      return res.status(500).json({
        success: false,
        message: `Gagal menyimpan kelas ke database: ${err.message}`
      });
    }

    // Ambil data kelas yang baru saja dibuat
    const newKelas = {
      id_kelas: result.insertId,
      nama_kelas: kelasData.nama_kelas,
      simbol_kelas: kelasData.simbol_kelas,
      wali: kelasData.wali,
      hp_wali: kelasData.hp_wali
    };

    res.status(201).json({
      success: true,
      message: 'Kelas berhasil ditambahkan',
      data: newKelas
    });
  });
});

module.exports = router;