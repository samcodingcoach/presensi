const express = require('express');
const db = require('../../koneksi');

const router = express.Router();

// Endpoint untuk membuat siswa baru
router.post('/', (req, res) => {
  const { 
    id_kelas, 
    nama_lengkap, 
    panggilan, 
    tanggal_lahir, 
    jenis_kelamin, 
    foto, 
    alamat, 
    no_hp, 
    nis,
    disabilitas,
    dijemput
  } = req.body;

  // Validasi input
  if (!id_kelas || !nama_lengkap || !nis) {
    return res.status(400).json({
      success: false,
      message: 'ID kelas, nama lengkap, dan NIS wajib diisi'
    });
  }
  
  // Validasi panjang NIS (minimal 3, maksimal 10 karakter)
  if (nis.length < 3 || nis.length > 10) {
    return res.status(400).json({
      success: false,
      message: 'NIS harus terdiri dari 3 hingga 10 karakter'
    });
  }

  // Validasi jenis_kelamin (harus 0 atau 1)
  if (jenis_kelamin !== undefined && ![0, 1].includes(jenis_kelamin)) {
    return res.status(400).json({
      success: false,
      message: 'Jenis kelamin harus 0 (perempuan) atau 1 (laki-laki)'
    });
  }

  // Validasi disabilitas dan dijemput (harus 0 atau 1 jika disediakan)
  if (disabilitas !== undefined && ![0, 1].includes(disabilitas)) {
    return res.status(400).json({
      success: false,
      message: 'Disabilitas harus 0 atau 1'
    });
  }
  
  if (dijemput !== undefined && ![0, 1].includes(dijemput)) {
    return res.status(400).json({
      success: false,
      message: 'Dijemput harus 0 atau 1'
    });
  }

  // Data siswa yang akan disimpan
  const siswaData = {
    id_kelas,
    nama_lengkap,
    panggilan: panggilan || '',
    tanggal_lahir: tanggal_lahir || null,
    jenis_kelamin: jenis_kelamin !== undefined ? jenis_kelamin : 0,
    foto: foto || '',
    alamat: alamat || '',
    no_hp: no_hp || '',
    aktif: 1, // Secara default aktif saat dibuat
    nis,
    disabilitas: disabilitas !== undefined ? disabilitas : 0,
    dijemput: dijemput !== undefined ? dijemput : 0
  };

  // Simpan ke database
  const query = 'INSERT INTO siswa SET ?';
  db.query(query, siswaData, (err, result) => {
    if (err) {
      console.error('Error inserting siswa:', err);
      console.error('Query:', query);
      console.error('Data:', siswaData);
      return res.status(500).json({
        success: false,
        message: `Gagal menyimpan siswa ke database: ${err.message}`
      });
    }

    // Ambil data siswa yang baru saja dibuat
    const newSiswa = {
      id_siswa: result.insertId,
      ...siswaData
    };

    res.status(201).json({
      success: true,
      message: 'Siswa berhasil ditambahkan',
      data: newSiswa
    });
  });
});

module.exports = router;