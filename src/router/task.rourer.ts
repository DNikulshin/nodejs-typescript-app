import { Router } from 'express'
import { getTasks, createTask } from '../controllers/task.controller.js'
const router = Router()

router.get('/tasks', getTasks)
router.post('/tasks', createTask)

export default router
