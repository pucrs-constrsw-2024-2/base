import { passwordSchema } from './../schemas/passwordSchema.js';
import express from 'express'
import { getUser, getUserById, createUser, updatePassword } from '../controllers/userController.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { createUserSchema } from '../schemas/userSchema.js'

const router = express.Router()

router.get('/', getUser)
router.get('/:id', getUserById)
router.post('/', validateRequest(createUserSchema), createUser)
router.patch('/:id', validateRequest(passwordSchema), updatePassword)

export default router
