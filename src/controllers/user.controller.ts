import { Request, Response, NextFunction } from 'express'
import userService from '../services/user.service.js'
import { MAX_AGE_REFRESH_TOKEN } from '../constants/index.js'
import { validationResult } from 'express-validator'
import { ApiError } from '../exeptions/api.error.js'

class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { email, password, name } = req.body

            const userData = await userService.registration({ email, password, name })

            res.cookie(
                process.env.REFRESH_TOKEN,
                userData.refreshToken, {
                maxAge: MAX_AGE_REFRESH_TOKEN,
                httpOnly: true,
                secure: true //if https
            })
            return res.json(userData)

        } catch (e) {
            next(e)

        }

    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie(
                process.env.REFRESH_TOKEN,
                userData.refreshToken, {
                maxAge: MAX_AGE_REFRESH_TOKEN,
                httpOnly: true,
                secure: true //if https

            })

            return res.json(userData)

        } catch (e) {
            next(e)

        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        const { refreshToken } = req.cookies

        try {
            const token = await userService.logout(refreshToken)
            res.clearCookie(process.env.REFRESH_TOKEN)
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link

            await userService.activate(activationLink)

            return res.redirect(process.env.CLIENT_URL)

        } catch (e) {
            next(e)

        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {

            const refreshToken: string = req.cookies[process.env.REFRESH_TOKEN]
            const userData = await userService.refresh(refreshToken)
            res.cookie(
                process.env.REFRESH_TOKEN,
                userData.refreshToken, {
                maxAge: MAX_AGE_REFRESH_TOKEN,
                httpOnly: true,
                // secure: true //if https
            })

            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {

            const users = await userService.getAllUsers()
            return res.json(users)

        } catch (e) {
            next(e)

        }
    }

    async removeUserByID(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        try {

            const user = await userService.removeUserByID(id)
            return res.json(user)

        } catch (e) {
            next(e)

        }
    }

}

export default new UserController()
