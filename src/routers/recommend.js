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
        const n = req.user.favouriteSongs.length > 2? 2: req.user.favouriteSongs.length
        const favSongs = req.user.favouriteSongs.slice(0, n)
        for(const song of favSongs) {
            payload['method'] = 'track.getSimilar'
            payload['artist'] = song.artist
            payload['track'] = song.track
            payload['limit'] = 4
            const response = await axios({
                method: 'get',
                url: URL,
                params: payload,
                headers: {'user-agent': 'q1ra'}
            })
            //console.log(response.data.similartracks.track)
            // tracks.push({
            //     'name': response.data.similartracks.track[0].name,
            //     'artist': response.data.similartracks.track[0].artist.name
            // })
            console.log(response.data.similartracks.track)
            response.data.similartracks.track.map((track => {
                tracks.push({
                    'name': track.name,
                    'artist': track.artist.name
                })
            }))
            
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
        res.send(response.data.similarartists.artist.map((artist) => {
            console.log(artist)
            return artist.name;
        }))
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
        console.log(response.data.similartracks.track)
        res.send(response.data.similartracks.track.map((track) => {
            return {
                track: track.name,
                artist: track.artist.name
            }
        }))
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router