import express from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import routes from './routes/index.js'
import swaggerFile from '../swagger_output.json' with { type: 'json' }
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/', routes)

app.listen(port, () => {
  console.log(`OAuth server listening on port ${port}`)
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`)
})
