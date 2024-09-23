import { Role } from "./role.js"

export interface IUserDto {
    id: string
    email: string
    isActivated?: boolean
    name?: string
    role?: string
    password?: string
  }

 
