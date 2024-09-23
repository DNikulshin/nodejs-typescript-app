import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prismaClient = new PrismaClient()

class TokenService {
     generateTokens(payload: string | object) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRESIN
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRESIN,

        })

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {

            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await prismaClient.token.findUnique({
            where: { userId }
        })

        if (!tokenData) {
            await prismaClient.token.create({
                data: {
                    userId,
                    refreshToken
                }
            })
        }

        await prismaClient.token.update({
            where: {
                userId
            },
            data: {
                refreshToken
            }
        })
    }

    async removeToken(refreshToken: string) {

        console.log('removeToken' , refreshToken);
        if (!refreshToken) {
            return null
        }

        const tokenData = await prismaClient.token.delete({
            where: {
                refreshToken
            }
        })
        console.log('removeToken' ,tokenData);
        

        return tokenData

    }

    async findToken(refreshToken: string) {
        const tokenData = await prismaClient.token.findUnique({
            where: {
                refreshToken
            }
        })
       console.log('findToken', tokenData);

        return tokenData
    }


}


export default new TokenService()