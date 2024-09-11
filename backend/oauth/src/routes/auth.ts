import express from 'express'
import { loginHandler } from '../controllers/loginController.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { loginSchema } from '../schemas/loginSchema.js'

const router = express.Router()

router.post('/login', validateRequest(loginSchema), loginHandler)

export default router
