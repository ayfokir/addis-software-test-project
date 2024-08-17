const express = require('express');
const router = express.Router();

const createRouter = require('./add-song'); // Ensure the path is correct
const getSongs = require('./get-songs')
const editSong = require("./edit-song")
const Delete  = require('./delete-song')
// Use the add-song router
router.use( createRouter); // Namespace the route (optional)
router.use( getSongs); // Namespace the route (optional)
router.use(editSong)
router.use(Delete)
module.exports = router; // Ensure the router is exported correctly
