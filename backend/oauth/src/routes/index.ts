import express from 'express'
import healthRoutes from './health.js'
import exampleRoute from './example.js'

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/example', exampleRoute)

export default router
