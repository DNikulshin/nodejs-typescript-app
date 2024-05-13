import express from 'express'
import path from 'path'
import cors from 'cors'
import { sequelize } from './db/connect.js'
import routes from './router/task.rourer.js'
const __dirname = path.resolve()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

if (process.env.ENV_PROD === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

async function start() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(3000, () => {
      console.log('Server is running on port 3000')
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
start()
