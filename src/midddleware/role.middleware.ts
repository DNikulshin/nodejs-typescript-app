import { User } from '@prisma/client'
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


            const {role:  userRoles }  = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET) as JwtPayload

            let hasRole = false

            userRoles.map(role => {
                if(roles.includes(role?.name)) {
                    hasRole = true
                }
            })

            if (!hasRole) {
                return next(ApiError.ForbiddenError())
            }

            next()
        } catch (error) {
            return next(ApiError.UnauthorizedError())
        }
    }
}