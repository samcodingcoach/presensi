const express = require('express');
const router = express.Router();

// Import routes
const newRoute = require('./new');
const updateRoute = require('./update');

// Define routes
router.use('/new', newRoute);
router.use('/update', updateRoute);

module.exports = router;