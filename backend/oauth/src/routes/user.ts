import express from 'express'
import { getUser, createUser } from '../controllers/userController.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { createUserSchema } from '../schemas/userSchema.js'

const router = express.Router()

router.get('/', getUser)
router.post('/', validateRequest(createUserSchema), createUser)

export default router
