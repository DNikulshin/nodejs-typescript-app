import prismaClient from '../../prisma/prisma.client.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import mailService from "./mail.service.js"
import tokenService from "./token.service.js"
import { UserDto } from "../dtos/user.dto.js"
import { ApiError } from '../exeptions/api.error.js'
import { IUserDto } from '../types/user.js'


class UserService {

    async registration({ email, password = '', name = '', roleName}: Omit<IUserDto, 'id'>) {
        const candidate = await prismaClient.user.findUnique({
            where: { email }
        })

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с email: ${email} уже существует`)
        }
        const hashedPassword = await bcrypt.hash(password, 5)
        const activationLink = uuidv4()
        const user = await prismaClient.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                activationLink,
                role: roleName[0]
            },
            select: {
                id: true,
                email: true,
                isActivated: true,
                name: true,
                role: true
            }
        })
        const userDto = new UserDto(user)
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        const tokens = tokenService.genereteTokens({ ...userDto })
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink: string) {
        const user = await prismaClient.user.findFirst({
            where: { activationLink }
        })

        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }

        await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                isActivated: true
            }
        })

    }

    async login(email: string, password: string) {
        const user = await prismaClient.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw ApiError.BadRequest(`Неверный логин или пароль`)
        }

        const isPassEquals = await bcrypt.compare(password, user.password)

        if (!isPassEquals) {
            throw ApiError.BadRequest(`Неверный логин или пароль`)
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.genereteTokens({ ...userDto })
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }

    }


    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }


    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnautorizendError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken) as IUserDto
        const tokenFromDb = await tokenService.findToken(refreshToken)
        console.log('refresh ', userData);


        if (!userData || !tokenFromDb) {
            throw ApiError.UnautorizendError()
        }

        const user = await prismaClient.user.findUnique({
            where: { id: userData.id }
        }) as IUserDto


        const userDto = new UserDto(user)
        const tokens = tokenService.genereteTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                email: true,
                isActivated: true,
                name: true,
                role: true,
                posts: true
            }
        })
        return users
    }

}

export default new UserService()