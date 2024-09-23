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
                return next(ApiError.UnautorizendError())
            }

            const accsessToken = authorizationHeader.split(" ")[1]

            if (!accsessToken) {
                return next(ApiError.UnautorizendError())
            }
            console.log('accsessToken', accsessToken);


            const { role: userRole } = jwt.verify(accsessToken, process.env.JWT_ACCESS_SECRET) as JwtPayload
            console.log('userRole ', userRole);

            let hasRole = false

            userRole.forEach((role: string) => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })

            if (!hasRole) {
                return next(ApiError.ForbiddenError())
            }

            next()
        } catch (error) {
            return next(ApiError.UnautorizendError())
        }
    }
}