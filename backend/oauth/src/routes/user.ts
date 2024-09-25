import { passwordSchema } from './../schemas/passwordSchema.js';
import express from 'express'
import { getUser, getUserById, createUser, updateUser, deleteUser, updatePassword } from '../controllers/userController.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { createUserSchema, updateUserSchema } from '../schemas/userSchema.js'

const router = express.Router()

router.get('/', getUser)
router.get('/:id', getUserById)
router.post('/', validateRequest(createUserSchema), createUser)
router.patch('/:id', validateRequest(passwordSchema), updatePassword)
router.put('/:id', validateRequest(updateUserSchema), updateUser)
router.delete('/:id', deleteUser)

export default router
