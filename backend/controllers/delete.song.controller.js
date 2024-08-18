const { deleteSong } = require('../services/delete.song.service');

async function Delete(req, res, next) {
    try {
        const songId = req.params.id; // Assuming the song ID is passed as a URL parameter
        const result = await deleteSong(songId);

        if (result.success) {
            res.status(200).json({
                message: 'Song deleted successfully',
                song: result.song,
                success: true
            });
        } else {
            res.status(404).json({
                error: result.error,
                success: false
            });
        }
    } catch (error) {
        res.status(500).json({error: process.env.NODE_ENV === 'development' ? error.message : "Unexpected error occurred", success: false });
    }
}

module.exports = {
    Delete
};
