const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// mongoose is a document data structure used for nosql mongo
// instruct mongoose to connect to your local mongodb instance
mongoose.connect('mongodb://localhost/my-blog', { useMongoClient: true })
// enable promises for mongoose (for easier async operations)
mongoose.Promise = Promise

const app = express()

// body-parser gets the request body data and makes it available in req.body for middleware use
// bodyParser.json() for parsing application/json
app.use(bodyParser.json())
// add the morgan middleware to see some basic HTTP logs in the terminal when your Express app receives HTTP requests
app.use(morgan('dev'))

// slash route '/api/users' will require and use the users file in routes directory
app.use('/api/users', require('./routes/users'))

app.use('/api/blogs', require('./routes/blogs'))

app.get('/', (req, res) => {
    res.status(200).send()
})

module.exports = app