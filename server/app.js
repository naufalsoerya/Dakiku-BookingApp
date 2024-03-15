require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/index');
const { errHandler } = require('./middlewares/errHandler');

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

app.use(errHandler)

module.exports = app