const express = require('express');
const router = express.Router();
const deleteController = require('../controllers/delete.song.controller');
const asyncMiddleWare =  require('../middleware/async')

// Define the route and attach the controller
router.delete('/api/delete/:id', asyncMiddleWare(deleteController));

module.exports = router; // Ensure the router is exported correctly
