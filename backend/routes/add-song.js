const express = require('express');
const router = express.Router();
const CreateController = require('../controllers/add-song-controller');
const asyncMiddleWare =  require('../middleware/async')
// Define the route and attach the controller
router.post('/api/create', asyncMiddleWare(CreateController)); // pass original route handler, CreateController  
// router.post('/api/create', CreateController);

module.exports = router; // Ensure the router is exported correctly

  