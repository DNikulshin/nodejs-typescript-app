import { Post, Role } from '@prisma/client'

export interface IUser {
    id: string
    email: string
    isActivated: boolean
    name?: string | undefined
    role?: Role[]
    post?: Post[]
}
