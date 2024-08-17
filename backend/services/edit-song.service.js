const mongoose = require('../config/db.config'); // Importing mongoose config ensures the connection is established
const Song = require('./model/Song'); // Import the Song model


async function editSong(songData, songId) {
    try {
        const song = await Song.findById(songId);
        if (!song) {
            throw new Error('Song not found');
        }
        // Update song data
        song.title = songData.title;
        song.artist = songData.artist;
        song.album = songData.album;
        song.genre = songData.genre;
        const updatedSong = await song.save();
        console.log('Song updated:', updatedSong);
        return { success: true, song: updatedSong };
    } catch (error) {
        console.error('Error editing song:', error.message);
        return { success: false, error: error.message };
    }
}

module.exports = {
    editSong
};