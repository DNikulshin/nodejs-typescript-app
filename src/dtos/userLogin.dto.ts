
import { Role, Token } from "@prisma/client"
import { IUserDto } from "../types/user.js"

export class UserLoginDto {
  id
  email
  isActivated
  name?
  roles?: Role[]
  tokens?: Token[]


  constructor(model: IUserDto) {
    this.id = model.id
    this.email = model.email
    this.isActivated = model.isActivated
    this.name = model.name
    this.roles = model.roles
    this.tokens = model.tokens
  }
}
