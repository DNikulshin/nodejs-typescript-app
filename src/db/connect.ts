import path from 'path'
import { Sequelize } from 'sequelize'
const __dirname = path.resolve()

// export const sequelize = new Sequelize('sqlite::memory:')
// export const sequelize = new Sequelize('tasks_db', 'postgres', '@Valeria09', {
//     host: 'localhost',
//     dialect: 'postgres'
// })
export const sequelize =  new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, 'db/database.sqlite'),
})
