const express = require('express');
const router = express.Router();
const getController = require('../controllers/get-songs-controller');
const asyncMiddleWare =  require('../middleware/async')

// Define the route and attach the controller
router.get('/api/get', asyncMiddleWare(getController));

module.exports = router; // Ensure the router is exported correctly
