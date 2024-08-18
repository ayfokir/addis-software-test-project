const { getSongs } = require('../services/get-songs-service');

async function getSong(req, res, next) {
    try {
        // Get Songs
        const result = await getSongs();
        console.log("See songs:");
        console.log(result);
                
        if (result.success) {
            if (!result.songs.length) {
                res.status(404).json({ error: "No songs found!" });
            } else {
                res.status(200).json({
                    songs: result.songs,
                    success: true,
                    message: "Songs Fetched Successfully"
                });
            }
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
    getSong
};
