import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import prismaClient from '../../prisma/prisma.client.js'
import { UserDto } from '../dtos/user.dto.js'
import { ApiError } from '../exeptions/api.error.js'
import { IUserDto } from '../types/user.js'
import mailService from './mail.service.js'
import tokenService from './token.service.js'
import { UserLoginDto } from '../dtos/userLogin.dto.js'


class UserService {

  async registration({ email, password, name}: Omit<IUserDto, 'id'>) {

    const candidate = await prismaClient.user.findUnique({
      where: { email },
    })

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с email: ${email} уже существует`)
    }

    if (!password) {
      throw ApiError.BadRequest(`Укажите email или пароль`)
    }

    const findRole = await prismaClient.role.findUnique({
      where: {
        name: "USER",
      },
      select: {
        id: true,
        name: true
      }
    })

    if(!findRole) {
      await prismaClient.role.create({
      data: {
        name: 'USER'
      }
     })
    }

    const hashedPassword = await bcrypt.hash(password, 5)


    const activationLink = uuidv4()
    const user = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        activationLink,
        role: {
          connect: [
            {name: 'USER'}
          ]
        }
      },
      select: {
        id: true,
        email: true,
        isActivated: true,
        name: true,
        role: true,
        posts: true
      }
    }) as unknown as IUserDto

    const userDto = new UserDto(user)
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
    const tokens = tokenService.generateTokens({ ...userDto })
    const test = await tokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async activate(activationLink: string) {
    const user = await prismaClient.user.findFirst({
      where: { activationLink },
    }) as User

    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации')
    }

    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActivated: true,
      },
    })

  }

  async login(email: string, password: string) {
    const user = await prismaClient.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        isActivated: true,
        password: true,
        name: true,
        role: true,
        posts: true,
        token: {
          select: {
            id: true
          }
        }
      }
    }) as unknown as IUserDto


    if (!user) {
      throw ApiError.BadRequest(`Неверный логин или пароль`)
    }

    const isPassEquals = await bcrypt.compare(password, user.password)

    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный логин или пароль`)
    }

    const userLoginDto = new UserLoginDto(user)
    const tokens = tokenService.generateTokens({ ...userLoginDto })
  
    await tokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userLoginDto,
    }

  }


  async logout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken)
  }


  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken) as IUserDto
    const tokenFromDb = await tokenService.findToken(refreshToken)

    console.log('tokenFromDb', tokenFromDb);
    

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await prismaClient.user.findFirst({
      where: { id: userData.id  },
      select: {
        id: true,
        email: true,
        isActivated: true,
        name: true,
        role: true,
        posts: true,
        token: {
          select: {
            id: true
          }
        }

      }
    }) as unknown as IUserDto


    const userDto = new UserLoginDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(user.id , tokens.refreshToken, tokenFromDb.id)


    console.log(user.token);
    
    return {
      ...tokens,
      user: userDto,
    }
  }

  async getAllUsers() {
    return prismaClient.user.findMany({
      select: {
        id: true,
        email: true,
        isActivated: true,
        name: true,
        role: true,
        posts: true,
      },
    })
  }
  async removeUserByID(id: string) {
    return prismaClient.user.delete({
      where: {
        id
      }
    })
  }

}

export default new UserService()
