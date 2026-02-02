const express = require('express');
const router = express.Router();

// Import routes
const newRoute = require('./new');
const listRoute = require('./list');

// Define routes
router.use('/new', newRoute);
router.use('/list', listRoute);

module.exports = router;