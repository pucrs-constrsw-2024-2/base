import express from 'express'
import healthRoutes from './health.js'
import authRoutes from './auth.js'
import userRoutes from './user.js'

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/auth', authRoutes)
router.use('/users', userRoutes)

export default router
