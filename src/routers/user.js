const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

//read profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)    
})

//Register new users
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

//login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})         
    } catch(e) {
        res.status(400).send()
    }
})

//logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        //delete auth token when logging out
        req.user.tokens = req.user.tokens.filter((token) => {
            token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

//logout from all devices
router.post('/users/logoutAll', auth, async (req, res) => {
    
    try {
        //empty the tokens array
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

//delete user
router.delete('/users/me/', auth, async (req, res) => {
    try {
        await req.user.remove()
        req.send(req.user)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router