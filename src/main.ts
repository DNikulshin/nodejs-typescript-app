import express from 'express'
import cors from 'cors'
import { connectDb } from './db/connect.js'
import { Task } from './models/Task.js'
import { getTasks, createTask } from './controllers/task.controller.js'
const message: string = 'Hello NodeJS'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/tasks', getTasks)
app.use('/tasks', createTask)

async function start() {
  try {
    await connectDb.authenticate()
    await Task.sync()
    app.get('*', (req, res) => {
      res.send(message)
    })

    app.listen(3000, () => {
      console.log('Server is running on port 3000')
    })
  } catch (error) {
    console.error(error)
  }
}
start()
