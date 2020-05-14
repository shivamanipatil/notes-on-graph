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

//recommend songs/tracks based on liked songs
router.get('/me/discoverSongs', auth, async (req, res) => {
    try {
        const tracks = []
        for(const song of req.user.favouriteSongs) {
            payload['method'] = 'track.getSimilar'
            payload['artist'] = song.artist
            payload['track'] = song.track
            payload['limit'] = 1
            console.log(song.track, song.artist)
            const response = await axios({
                method: 'get',
                url: URL,
                params: payload,
                headers: {'user-agent': 'q1ra'}
            })
            console.log(response.data.similartracks.track)
            tracks.push({
                'name': response.data.similartracks.track[0].name,
                'artist': response.data.similartracks.track[0].artist.name
            })
        }
        res.send(tracks)
    } catch (error) {
        res.status(400).send()   
    }
})

//get similar artists from queried artist
router.get('/recommend/artists', auth, async (req, res) => {    
    try {
        if(!req.query.artist) {
            throw new Error ("Please provide artist name.")
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
router.get('/recommend/tracks', auth, async (req, res) => {
    try {
        if(!req.query.artist && !req.query.track) {
            throw new Error ("Please provide artist and track name.")
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