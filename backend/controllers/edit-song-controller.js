const { editSong } = require('../services/edit-song.service');

async function EditSong(req, res, next) {
    try {
        let song = req.body;
        let  songId = req.params.id
        console.log("See the song before edit:");
        console.log(song);
        
        const editedSong = await editSong(song, songId);
        console.log("See song after edit:");
        console.log(editedSong);
        
        if (!editedSong.success) {
            res.status(404).json({ error: editedSong.error });
        } else { 
            res.status(200).json({
                song: editedSong.song,
                status: true
            });
        }
    } catch (error) {
        console.error('Error in EditSong controller:', error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

module.exports = {
    EditSong
};
