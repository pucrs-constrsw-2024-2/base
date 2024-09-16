require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require('./src/routes/users')

const app = express()
const PORT = process.env.OAUTH_INTERNAL_PORT || 3000

app.use(express.json())

app.use('/auth', authRoutes)
app.use(cors())

app.listen(PORT, () =>
    console.log('rodando')
)