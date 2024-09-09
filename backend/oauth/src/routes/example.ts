import express from 'express'
import { exampleController, createExampleController } from '../controllers/exampleController.js'
const router = express.Router()

router.get('/', exampleController)
router.post('/', createExampleController)

export default router
