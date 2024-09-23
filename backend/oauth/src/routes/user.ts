import express from 'express'
import { getUser, getUserById, createUser, updateUser } from '../controllers/userController.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { createUserSchema, updateUserSchema } from '../schemas/userSchema.js'

const router = express.Router()

router.get('/', getUser)
router.get('/:id', getUserById)
router.post('/', validateRequest(createUserSchema), createUser)
router.put('/:id', validateRequest(updateUserSchema), updateUser)

export default router
