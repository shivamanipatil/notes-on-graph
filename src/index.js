const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const musicRouter = require('./routers/music')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(musicRouter)
app.set('etag', false)

app.listen(port, () => {
    console.log("Server is on port : ", port)
})