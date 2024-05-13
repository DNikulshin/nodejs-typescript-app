import express from 'express'
import cors from 'cors'
import { sequelize } from './db/connect.js'
import routes from './router/task.rourer.js'
const message: string = 'Hello NodeJS'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

async function start() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.get('/', (req, res) => {
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
