require('dotenv').config()

const mongoose = require('mongoose')

const mongoURL = process.env.dbURL;

mongoose
    .connect(mongoURL, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db