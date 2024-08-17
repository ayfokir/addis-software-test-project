const express = require('express');
const router = express.Router();
const CreateController = require('../controllers/add-song-controller');

// Define the route and attach the controller
router.post('/api/create', CreateController.Create);

module.exports = router; // Ensure the router is exported correctly
