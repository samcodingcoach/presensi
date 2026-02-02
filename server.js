const express = require("express");
const app = express();
const port = 3000;

// Middleware untuk parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route untuk user
const usersRoute = require('./routes/users');
// Import route untuk kelas
const kelasRoute = require('./routes/kelas');

// Route utama
app.get("/", (req, res) => {
  res.send("Hello dari Node.js + Express!");
});

// Tambahkan route untuk user
app.use('/api/user', usersRoute);

// Tambahkan route untuk kelas
app.use('/api/kelas', kelasRoute);

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});

