table users
Name, Type
id_user, int primary key auto increment
nama, varchar 
username, varchar
password_hash, varchar
role, int 
is_active, tinyint bool 1/0
crated_at, datetime current_timestamp


table kelas
id_kelas, int primary key auto increment
nama_kelas, varchar
simbol_kelas, varchar (4)
wali, varchar
hp_wali, varchar 


table siswa
id_siswa, int primary key auto increment
id_kelas, int
nama_lengkap, varchar
panggilan, varchar
tanggal_lahir, date
jenis_kelamin, tinyint 0 perempuan 1 laki laki
foto, varchar 100
alamat, text
no_hp, varchar
aktif, tinyint
created_at, datetime current_timestamp
disabilitas, tinyint
dijemput, tinyint 
nis, varchar (10) maksimal 10 minimal 3