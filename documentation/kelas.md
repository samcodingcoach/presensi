# Dokumentasi Routes Kelas

Folder `routes/kelas/` berisi berbagai endpoint API untuk mengelola data kelas dalam aplikasi presensi. Semua endpoint dirancang untuk berkomunikasi dengan database sesuai dengan struktur tabel `kelas`.

## Struktur Folder

```
routes/
└── kelas/
    ├── index.js          # Pengelompokan semua route kelas
    ├── new.js            # Endpoint untuk membuat kelas baru
    ├── list.js           # Endpoint untuk menampilkan daftar kelas
    └── update.js         # Endpoint untuk memperbarui data kelas
```

## Daftar Endpoint

### 1. Membuat Kelas Baru
- **URL**: `/api/kelas/new`
- **Method**: `POST`
- **Deskripsi**: Menambahkan kelas baru ke dalam database
- **Request Body**:
  ```json
  {
    "nama_kelas": "string",
    "simbol_kelas": "string (maksimal 4 karakter)",
    "wali": "string (opsional)",
    "hp_wali": "string (opsional)"
  }
  ```
- **Validasi**:
  - `nama_kelas` dan `simbol_kelas` wajib diisi
  - `simbol_kelas` maksimal 4 karakter
  - `wali` dan `hp_wali` opsional, jika tidak disertakan akan diisi dengan string kosong
- **Response Sukses**:
  ```json
  {
    "success": true,
    "message": "Kelas berhasil ditambahkan",
    "data": {
      "id_kelas": 1,
      "nama_kelas": "string",
      "simbol_kelas": "string",
      "wali": "string",
      "hp_wali": "string"
    }
  }
  ```

### 2. Menampilkan Daftar Kelas
- **URL**: `/api/kelas/list`
- **Method**: `GET`
- **Deskripsi**: Mengambil semua data kelas dari database
- **Response Sukses**:
  ```json
  {
    "success": true,
    "message": "Data kelas berhasil diambil",
    "data": [
      {
        "id_kelas": 1,
        "nama_kelas": "string",
        "simbol_kelas": "string",
        "wali": "string",
        "hp_wali": "string"
      },
      ...
    ]
  }
  ```

### 3. Menampilkan Kelas Berdasarkan ID
- **URL**: `/api/kelas/list/:id`
- **Method**: `GET`
- **Deskripsi**: Mengambil data kelas berdasarkan ID
- **Parameter URL**:
  - `id` (wajib): ID kelas yang akan diambil
- **Validasi**:
  - ID harus berupa angka
- **Response Sukses**:
  ```json
  {
    "success": true,
    "message": "Data kelas berhasil diambil",
    "data": {
      "id_kelas": 1,
      "nama_kelas": "string",
      "simbol_kelas": "string",
      "wali": "string",
      "hp_wali": "string"
    }
  }
  ```
- **Response Error**:
  - Jika ID bukan angka: `{"success": false, "message": "ID kelas harus berupa angka"}`
  - Jika kelas tidak ditemukan: `{"success": false, "message": "Kelas tidak ditemukan"}`

### 4. Memperbarui Data Kelas
- **URL**: `/api/kelas/update/:id`
- **Method**: `PUT`
- **Deskripsi**: Memperbarui data kelas berdasarkan ID
- **Parameter URL**:
  - `id` (wajib): ID kelas yang akan diperbarui
- **Request Body** (semua opsional):
  ```json
  {
    "nama_kelas": "string",
    "simbol_kelas": "string (maksimal 4 karakter)",
    "wali": "string",
    "hp_wali": "string"
  }
  ```
- **Validasi**:
  - ID harus berupa angka
  - Kelas dengan ID tersebut harus ada
  - Jika `simbol_kelas` disertakan, harus maksimal 4 karakter
  - Minimal satu field harus disertakan untuk diperbarui
- **Response Sukses**:
  ```json
  {
    "success": true,
    "message": "Kelas berhasil diperbarui",
    "data": {
      "id_kelas": integer,
      "nama_kelas": "string",
      "simbol_kelas": "string",
      "wali": "string",
      "hp_wali": "string"
    }
  }
  ```

## Fitur Validasi

- Validasi input untuk memastikan data yang diterima sesuai dengan kebutuhan
- Validasi ID untuk mencegah akses ke data yang tidak sah
- Validasi panjang simbol_kelas (maksimal 4 karakter)
- Penanganan error yang konsisten dan informatif

## Struktur Tabel Kelas

| Kolom         | Tipe Data      | Deskripsi                    |
|---------------|----------------|------------------------------|
| id_kelas      | INT            | Primary key, auto increment  |
| nama_kelas    | VARCHAR        | Nama lengkap kelas           |
| simbol_kelas  | VARCHAR(4)     | Singkatan kelas (maksimal 4 karakter) |
| wali          | VARCHAR        | Nama wali kelas              |
| hp_wali       | VARCHAR        | Nomor HP wali kelas          |