require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/index');
const ImageKit = require("imagekit");
const { errHandler } = require('./middlewares/errHandler');

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

app.use(routes)

app.use(errHandler)

module.exports = app