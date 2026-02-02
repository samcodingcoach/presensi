# Dokumentasi Routes Users

Folder `routes/users/` berisi berbagai endpoint API untuk mengelola data user dalam aplikasi presensi. Semua endpoint dirancang untuk berkomunikasi dengan database sesuai dengan struktur tabel `users`.

## Struktur Folder

```
routes/
└── users/
    ├── index.js          # Pengelompokan semua route users
    ├── new.js            # Endpoint untuk membuat user baru
    ├── list.js           # Endpoint untuk menampilkan daftar user
    └── update.js         # Endpoint untuk memperbarui data user
```

## Daftar Endpoint

### 1. Membuat User Baru
- **URL**: `/api/user/new`
- **Method**: `POST`
- **Deskripsi**: Menambahkan user baru ke dalam database
- **Request Body**:
  ```json
  {
    "nama": "string",
    "username": "string",
    "password": "string",
    "role": "integer" (opsional, default: 2)
  }
  ```
- **Validasi**:
  - `nama`, `username`, dan `password` wajib diisi
  - `role` opsional, jika tidak disertakan akan menggunakan nilai default 2
  - `is_active` otomatis diisi dengan 1 (aktif)
- **Response Sukses**:
  ```json
  {
    "success": true,
    "message": "User berhasil ditambahkan",
    "data": {
      "id_user": 1,
      "nama": "string",
      "username": "string",
      "role": integer,
      "is_active": 1,
      "created_at": "datetime"
    }
  }
  ```
- **Catatan**: Password akan dienkripsi menggunakan bcrypt sebelum disimpan

### 2. Menampilkan Daftar User
- **URL**: `/api/user/list`
- **Method**: `GET`
- **Deskripsi**: Mengambil semua data user dari database
- **Response Sukses**:
  ```json
  {
    "success": true,
    "message": "Data user berhasil diambil",
    "data": [
      {
        "id_user": 1,
        "nama": "string",
        "username": "string",
        "role": integer,
        "is_active": integer,
        "created_at": "datetime"
      },
      ...
    ]
  }
  ```
- **Catatan**: Password tidak disertakan dalam response untuk alasan keamanan

### 3. Memperbarui Data User
- **URL**: `/api/user/update/:id`
- **Method**: `PUT`
- **Deskripsi**: Memperbarui data user berdasarkan ID
- **Parameter URL**:
  - `id` (wajib): ID user yang akan diperbarui
- **Request Body** (semua opsional):
  ```json
  {
    "nama": "string",
    "username": "string",
    "password": "string",
    "role": "integer",
    "is_active": "integer"
  }
  ```
- **Validasi**:
  - ID harus berupa angka
  - User dengan ID tersebut harus ada
  - Minimal satu field harus disertakan untuk diperbarui
- **Response Sukses**:
  ```json
  {
    "success": true,
    "message": "User berhasil diperbarui",
    "data": {
      "id_user": integer,
      "nama": "string",
      "username": "string",
      "role": integer,
      "is_active": integer,
      "created_at": "datetime"
    }
  }
  ```
- **Catatan**: Jika password disertakan, akan dienkripsi ulang menggunakan bcrypt

## Fitur Keamanan

- Semua password dienkripsi menggunakan bcrypt sebelum disimpan ke database
- Password tidak pernah dikembalikan dalam response API
- Validasi input dilakukan untuk mencegah data yang tidak valid
- Validasi ID user untuk mencegah akses ke data yang tidak sah

## Struktur Tabel Users

| Kolom         | Tipe Data      | Deskripsi                    |
|---------------|----------------|------------------------------|
| id_user       | INT            | Primary key, auto increment  |
| nama          | VARCHAR        | Nama lengkap user            |
| username      | VARCHAR        | Username unik                |
| password_hash | VARCHAR        | Password terenkripsi         |
| role          | INT            | Peran user (misal: 1=admin, 2=user biasa) |
| is_active     | TINYINT        | Status aktif (1=aktif, 0=tidak aktif) |
| created_at    | DATETIME       | Waktu pembuatan akun (current_timestamp) |