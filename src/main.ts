import express from 'express'
import path from 'path'
import {createWriteStream} from 'fs'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from './router/index.js'
import prisma from '../prisma/prisma.client.js'
import errorMiddleware from './midddleware/error.middleware.js'
import morgan from 'morgan'

const __dirname = path.resolve()

const accessLogStream = createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' })


const app = express()
app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 500 },
  stream: accessLogStream
}))

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/api', routes)
app.use(errorMiddleware)

if (process.env.ENV_PROD === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || 'localhost'

async function start() {
  try {

    await prisma.$connect()
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on port http:\/\/${HOST}:${PORT}`)
    })
  } catch (error) {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  }
}
start()
