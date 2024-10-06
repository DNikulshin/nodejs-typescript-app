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


        const tokenData = await this.findAllUserToken(userId)

        if (!tokenData?.tokens.length) {
            await prismaClient.token.create({
                data: {
                    user: {
                        connect: {
                            id: userId
                        }
                    },
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
        if (!refreshToken) {
            return null
        }

        return prismaClient.token.delete({
            where: {
                refreshToken
            }
        })

    }

    async findAllUserToken(userId: string) {
        if (!userId) {
            return null
        }

        return prismaClient.user.findUnique({
            where: {
                id: userId
            },
            include: {
                tokens: true
            }
        })
    }

}

export default new TokenService()
