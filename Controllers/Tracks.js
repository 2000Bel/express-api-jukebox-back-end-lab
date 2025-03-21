//controllers/Track.js
const express = require('express');
const router = express.Router();
const Track = require('../models/Track');

//(GET /tracks)
router.get('/', async (req, res) => {
    try {
        const tracks = await Track.find();
        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// (POST /tracks)
router.post('/', async (req, res) => {
    try {
        const { title, artist, coverArtUrl, soundClipUrl } = req.body;
        const newTrack = await Track.create({ title, artist, coverArtUrl, soundClipUrl });
        res.status(201).json(newTrack);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//(GET /tracks/:id)
router.get('/:id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) { return res.status(404).json({ error: 'Track not found' });
    }
 res.status(200).json(track);
} catch (error) {
 res.status(500).json({ error: error.message });
}
});

//(PUT /tracks/:id)
router.put('/:id', async (req, res) => {
    try {

        const { title, artist, coverArtUrl, soundClipUrl } = req.body;
        const updatedTrack = await Track.findByIdAndUpdate(
            req.params.id,
            { title, artist, coverArtUrl, soundClipUrl },
            { new: true }
        );
        if (!updatedTrack) {
            return res.status(404).json({ error: 'Track not found' });
        }
        res.status(200).json(updatedTrack)
    } catch (error) {
        res.status(500).json({ error: error.message });
}
});

//(DELETE /tracks/:id)
router.delete('/:id', async (req, res) => {
    try {
        const deletedTrack = await Track.findByIdAndDelete(req.params.id);
        if (!deletedTrack) {
            return res.status(404).json({ error: 'Track not found' });
        }
        res.status(200).json(deletedTrack);
    } catch (error) {
 res.status(500).json({ error: error.message });
}
});

module.exports = router;