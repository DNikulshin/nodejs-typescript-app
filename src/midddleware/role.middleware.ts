import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ApiError } from '../exeptions/api.error.js'

export default function (roles: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {

            if (req.method === 'OPTIONS') {
                next()
            }

            const authorizationHeader = req.headers.authorization

            if (!authorizationHeader) {
                return next(ApiError.UnauthorizedError())
            }

            const accessToken = authorizationHeader.split(" ")[1]

            if (!accessToken) {
                return next(ApiError.UnauthorizedError())
            }


            const {role:  userRole }  = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET) as JwtPayload

      
            if (!roles.includes(userRole)) {
                return next(ApiError.ForbiddenError())
            }

            next()
        } catch (error) {
            return next(ApiError.UnauthorizedError())
        }
    }
}