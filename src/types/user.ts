import { Role } from "@prisma/client"

export interface IUserDto {
    id: string
    email: string
    isActivated?: boolean | null
    name?: string | null
    role?: Role | null
    password?: string
  }
