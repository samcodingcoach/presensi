const express = require("express");
const app = express();
const port = 3000;

// Middleware untuk parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route untuk user
const usersRoute = require('./routes/users');

// Route utama
app.get("/", (req, res) => {
  res.send("Hello dari Node.js + Express!");
});

// Tambahkan route untuk user
app.use('/api/user', usersRoute);

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});

