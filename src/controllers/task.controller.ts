import { Request, Response } from 'express'
import { Task } from '../models/Task.js'

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll()
    if(!tasks) {
      res.status(404).json({ message: 'Tasks not found...' })
    }
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const getTask = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    if(!id) {
      res.status(404).json({message: `Not id: ${id}`})
    }
    const task = await Task.findOne({
      where: {id}
    })
    if(!task) {
      res.status(404).json({ message: `Task id: ${id} not found...` })
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
export const createTask = async (req: Request, res: Response) => {
  try {
    if(req.body.title || req.body.description) {
      res.status(400).json({message: 'Bad Request not title || description'})
    }

    const tasks = await Task.create({
      title: req.body.title,
      description: req.body.description,
    })

    res.status(201).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const removeTask = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    if(!id) {
      res.status(404).json({message: `Not id: ${id}`})
    }

    const task = await Task.destroy({
      where: {id}
    })
    if(!task) {
      res.status(404).json({message: `task id: ${id} not found`})
    }
    res.status(204).json(`remove task id: ${id}`)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
