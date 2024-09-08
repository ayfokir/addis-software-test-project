const express = require('express');
const router = express.Router();
const editController = require('../controllers/edit-song-controller');
const asyncMiddleWare =  require('../middleware/async')

// Define the route and attach the controller
router.patch('/api/edit/:id', asyncMiddleWare(editController));

module.exports = router; // Ensure the router is exported correctly
