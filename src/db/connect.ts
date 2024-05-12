import path from 'path'
import { Sequelize } from 'sequelize'
const __dirname = path.resolve()

export const connectDb = new Sequelize('sqlite::memory:')

// export const connectDb =  new Sequelize({
//   dialect: 'sqlite',
//   storage: path.resolve(__dirname, 'db/database.sqlite'),
// })
