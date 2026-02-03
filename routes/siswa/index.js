const express = require('express');
const router = express.Router();

// Import routes
const newRoute = require('./new');

// Define routes
router.use('/new', newRoute);

module.exports = router;