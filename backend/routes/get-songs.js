const express = require('express');
const router = express.Router();
const getController = require('../controllers/get-songs-controller');

// Define the route and attach the controller
router.get('/api/get', getController.getSong);

module.exports = router; // Ensure the router is exported correctly
