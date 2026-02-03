const express = require('express');
const router = express.Router();

// Import routes
const newRoute = require('./new');
const updateRoute = require('./update');
const deleteRoute = require('./delete');

// Define routes
router.use('/new', newRoute);
router.use('/update', updateRoute);
router.use('/delete', deleteRoute);

module.exports = router;