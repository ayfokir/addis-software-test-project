const { createSong } = require('../services/add-song-service');

async function Create(req, res, next) {
    try {
        // Create a new song
        let song = req.body;
        console.log("See the song:", song);
        
        const result = await createSong(song);
        
        if (result.success) {
            res.status(201).json({
                song: result.song,
                success: true,
                message: "Song Add successfully"
            });
        } else {
            res.status(400).json({
            error: result.error,
            success: false
            });
        }
    } catch (error) {
        res.status(500).json({error: process.env.NODE_ENV === 'development' ? error.message : "Unexpected error occurred", success: false });
    }
}

module.exports = {
    Create
};

