import { Router } from 'express'
import { getTasks, createTask } from '../controllers/task.controller.js'
const router = Router()

router.get('', getTasks)
router.post('', createTask)
