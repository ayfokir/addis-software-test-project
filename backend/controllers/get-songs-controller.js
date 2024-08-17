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
                    status: true
                });
            }
        } else {
            res.status(400).json({
                error: result.error,
                status: false
            });
        }
    } catch (error) {
        console.error('Error in getSong controller:', error);
        res.status(500).json({ error: "Something went wrong!", status: false });
    }
}

module.exports = {
    getSong
};
