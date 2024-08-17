const mongoose = require('../config/db.config'); // Importing mongoose config ensures the connection is established
const Song = require('./model/Song'); // Import the User model

async function createSong(songData) {
    try {
        const song = new Song({
            title: songData.title,
            artist: songData.artist,
            album: songData.album,
            genre: songData.genre
        });
        await song.save();
        console.log('Song created:', song);
        return { success: true, song };
    } catch (error) {
        console.error('Error creating song:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    createSong
};