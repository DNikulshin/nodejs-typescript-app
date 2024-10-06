import { Role, Token } from "@prisma/client"

export interface IUserDto {
    id: string
    email: string
    isActivated?: boolean | null
    name?: string | null
    roles?: Role[]
    password: string
    tokens?: Token[]
  }
