const mongoose = require('../config/db.config'); // Importing mongoose config ensures the connection is established
const Song = require('./model/Song'); // Import the Song model

// Function to get all songs
async function getSongs() {
    try {
        const songs = await Song.find();
        console.log('Songs retrieved:', songs);
        return { success: true, songs };
    } catch (error) {
        console.error('Error getting songs:', error);
        return { success: false,error: process.env.NODE_ENV === 'development' ? error.message : "Unexpected error occurred" };
    }
}

module.exports = {
    getSongs
};