import { NextFunction, Request, Response } from 'express'


class RoleController {

  async check(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({message: 'Role!'})
    } catch (e) {
      next(e)
    }
  }
}

export default new RoleController()