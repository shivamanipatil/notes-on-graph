const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const axios = require('axios')

//query params object
let payload = {
    'api_key': process.env.LASTFM_API_KEY,
    'format': 'json',
}

const DEFAULT_LIMIT = 3
const URL = 'http://ws.audioscrobbler.com/2.0/'

//get similar artists from queried artist
router.get('/music/getSimilarArtists', auth, async (req, res) => {    
    try {
        if(!req.query.artist) {
            res.send({error: "Please provide artist name."})
        }    
        payload['artist'] = req.query.artist
        payload['method'] = 'artist.getSimilar'
        payload['limit'] = req.query.limit? req.query.limit: DEFAULT_LIMIT
        const response = await axios({
            method: 'get',
            url: URL,
            params: payload,
            headers: {'user-agent': 'q1ra'}
        })
        res.send(response.data.similarartists.artist.map((artist) => artist.name))
    } catch(e) {
        res.status(400).send(e)
    }
})

//get similar songs from queried artist and song
router.get('/music/getSimilarSongs', auth, async (req, res) => {
    try {
        if(!req.query.artist && !req.query.song) {
            res.send({error: "Please provide artist and song."})
        }
        payload['artist'] = req.query.artist
        payload['track'] = req.query.track
        payload['limit'] = req.query.limit? req.query.limit: DEFAULT_LIMIT
        payload['method'] = 'track.getSimilar'
        
        const response = await axios({
            method: 'get',
            url: URL,
            params: payload,
            headers: {'user-agent': 'q1ra'}
        })
        res.send(response.data.similartracks.track.map((track) => track.name))
    } catch(e) {
        res.status(400).send(e)
    }
})



module.exports = router