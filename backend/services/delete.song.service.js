
const mongoose = require('../config/db.config'); // Importing mongoose config ensures the connection is established
const Song = require('./model/Song'); // Import the Song model

async function deleteSong(songId) {
    try {
        const result = await Song.findByIdAndDelete(songId);
        if (result) {
            // Song found and deleted
            console.log('Song deleted:', result);
            return { success: true, song: result }; // Return an object with the deleted song document
        } else {
            // Song not found
            console.log('Song not found with ID:', songId);
            return { success: false, error: 'Song not found' }; // Return an error message if no song was found
        }
    } catch (error) {
        // An error occurred
        console.error('Error deleting song:', error);
        return { success: false, error: error.message }; // Return the error message
    }
}

module.exports = {
    deleteSong
};