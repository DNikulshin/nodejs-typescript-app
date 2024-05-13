import { Request, Response } from 'express'
import { Task } from '../models/Task.js'
import mockData from '../db/mockdata.js'

// const testData = [
//   {
//     title: 'Task 1',
//     description: 'Description 1',
//   },
//   {
//     title: 'Task 2',
//     description: 'Description 2',
//   },
// ]

export const getTasks = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const tasks = await Task.findAll()
    console.log('tasks db getAll', tasks)
    // console.log('testData', testData)
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
export const createTask = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    // testData.push({
    //   title: req.body.title,
    //   description: req.body.description,
    // })

    const tasks = await Task.create({
      title: req.body.title,
      description: req.body.description,
    })
    // const test = mockData.createItem({
    //   title: req.body.title,
    //   description: req.body.description,
    // })

    // const data = await mockData.getAll()

    // console.log('test', test)
    // console.log('testData', testData)
    console.log('tasks db create', tasks)
    res.status(201).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
