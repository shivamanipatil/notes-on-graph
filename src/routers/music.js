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
router.get('/music/getSimilarSongs', auth, async (req, res) => {
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

//search for a track 
router.get('/music/search', auth, async (req, res) => {
    try {
        if(!req.query.track) {
            throw new Error ("Please provide track.")
        }
        payload['track'] = req.query.track
        payload['limit'] = req.query.limit? req.query.limit: DEFAULT_LIMIT
        payload['method'] = 'track.Search'
        
        const response = await axios({
            method: 'get',
            url: URL,
            params: payload,
            headers: {'user-agent': 'q1ra'}
        })
        res.send(response.data.results.trackmatches.track.map((track) => {
            return {
                'artist': track.artist,
                'track': track.name
            }
        }))
    } catch(e) {
        res.status(404).send(e)
    }
})

//like a track
router.post('/music/like/track', auth, async (req, res) => {
    try {
        if(!req.query.track) {
            throw new Error ("Please provide track.")
        }
        payload['track'] = req.query.track
        payload['limit'] = req.query.limit? req.query.limit: DEFAULT_LIMIT
        payload['method'] = 'track.Search'
        
        const response = await axios({
            method: 'get',
            url: URL,
            params: payload,
            headers: {'user-agent': 'q1ra'}
        })
        const tracks = response.data.results.trackmatches.track.map((track) => {
            return {
                'artist': track.artist,
                'track': track.name
            }
        })
        
        if(tracks.len == 0) {
            throw new Error("No tracks found.")
        }
        req.user.favouriteSongs.push(tracks[0])
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(404).send(e)
    }
})

//like an artist
router.post('/music/like/artist', auth, async (req, res) => {        
    try {
        if(!req.query.artist) {
            throw new Error ("Please provide track.")
        }
        payload['artist'] = req.query.artist
        payload['limit'] = req.query.limit? req.query.limit: DEFAULT_LIMIT
        payload['method'] = 'artist.Search'
        
        const response = await axios({
            method: 'get',
            url: URL,
            params: payload,
            headers: {'user-agent': 'q1ra'}
        })
        const artists = response.data.results.artistmatches.artist.map((artist) => {
            return {
                'artist': artist.name,
            }
        })
        
        if(artists.len == 0) {
            throw new Error("No artists found.")
        }
        req.user.favouriteArtists.push(artists[0])
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(404).send(e)
    }
})

// unlike a track 
router.delete('/music/unlike/track/:id', auth, async (req, res) => {
    try {
        req.user.favouriteSongs = req.user.favouriteSongs.filter(track => track._id != req.params.id)
        await req.user.save()
        res.send()
    } catch(error) {
        res.status(500).send(error)
    }  
})

// unlike an artist 
router.delete('/music/unlike/artist/:id', auth, async (req, res) => {
    try {
        req.user.favouriteArtists = req.user.favouriteArtists.filter(artist => artist._id != req.params.id)
        await req.user.save()
        res.send()
    } catch(error) {
        res.status(500).send(error)
    }  
})


module.exports = router