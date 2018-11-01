const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgon = require('morgan')
const auth = require('./services/auth')
const { PORT } = require('./config/config').Initialize()

let app = express()

require('./db/index').Connect()

app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

app.use(morgon("dev"))

app.get('/welcome', (req, res) => auth.welcome(req, res))

app.post('/register', (req, res) => auth.register(req, res))

app.post('/login', async (req, res) => auth.login(req, res))

app.listen(PORT, () => console.log(`server is running on ${PORT}`))