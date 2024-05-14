import { Router } from 'express'
import {getTasks, createTask, removeTask, getTask} from '../controllers/task.controller.js'
const router = Router()

router.get('/tasks', getTasks)
router.get('/tasks/:id', getTask)
router.post('/tasks', createTask)
router.delete('/tasks/:id', removeTask)


export default router
