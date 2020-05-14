const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const musicRouter = require('./routers/music')
const recommendRouter = require('./routers/recommend')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT

app.use(morgan('tiny'))
app.use(express.json())

app.use(userRouter)
app.use(musicRouter)
app.use(recommendRouter)
app.set('etag', false)



app.listen(port, () => {
    console.log("Server is on port : ", port)
})