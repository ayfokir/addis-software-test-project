const express = require('express');
const router = express.Router();
const deleteController = require('../controllers/delete.song.controller');

// Define the route and attach the controller
router.delete('/api/delete/:id', deleteController.Delete);

module.exports = router; // Ensure the router is exported correctly
