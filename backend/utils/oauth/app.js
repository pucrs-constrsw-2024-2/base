require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require('./src/routes/users')
const { urlencoded } = require('body-parser')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.OAUTH_INTERNAL_PORT || 3000

app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/auth', authRoutes)

app.listen(PORT, () =>
    console.log('rodando')
)