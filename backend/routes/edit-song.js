const express = require('express');
const router = express.Router();
const editController = require('../controllers/edit-song-controller');

// Define the route and attach the controller
router.patch('/api/edit/:id', editController.EditSong);

module.exports = router; // Ensure the router is exported correctly
