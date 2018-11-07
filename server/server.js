const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgon = require('morgan')
const auth = require('./services/auth')
const family = require('./services/family')
const { PORT } = require('./config/config').Initialize()

let app = express()

require('./db/index').Connect()

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

app.use(morgon("dev"))

app.use((req, res, next) => auth.authenticate(req, res, next))

app.get('/welcome', (req, res) => auth.welcome(req, res))

app.post('/register', (req, res) => auth.register(req, res))

app.post('/login', async (req, res) => auth.login(req, res))

app.post('/AddMember', async(req, res) => family.addMember(req, res))

app.get('/GetMembers/:parentid', async(req, res) => family.getMembers(req, res))

app.listen(PORT, () => console.log(`server is running on ${PORT}`))