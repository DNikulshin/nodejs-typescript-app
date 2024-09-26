import { NextFunction, Request, Response } from 'express'


class TestController {
  async alive(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({message: 'Server is alive!'})
    } catch (e) {
      next(e)
    }
  }
}

export default new TestController()
