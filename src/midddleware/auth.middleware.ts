import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exeptions/api.error.js'
import tokenService from '../services/token.service.js'
import { IUserDto } from '../types/user.js'

interface RequestWithUser extends Request {
  user?: IUserDto
}

export  default function authMiddleware (req: RequestWithUser, res: Response, next: NextFunction) {
  try {

    if(req.method === 'OPTIONS') {
      next()
    }

    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
      return next(ApiError.UnautorizendError())
    }

    const accsessToken = authorizationHeader.split(" ")[1]

    if (!accsessToken) {
      return next(ApiError.UnautorizendError())
    }

    const userData = tokenService.validateAccessToken(accsessToken) as unknown as IUserDto

    if (!userData) {
      return next(ApiError.UnautorizendError())
    }

    req.user = userData

    next()
  } catch (error) {
    return next(ApiError.UnautorizendError())
  }
}