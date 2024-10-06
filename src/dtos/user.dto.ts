
import { Role, Token } from "@prisma/client"
import { IUserDto } from "../types/user.js"

export class UserDto {
  id
  email
  isActivated
  name
  roles? : Role[]
  password?
  tokens? : Token[]


  constructor(model: IUserDto) {
    this.id = model.id
    this.email = model.email
    this.isActivated = model.isActivated
    this.name = model.name
    this.roles = model.roles
    this.password = model.password
    this.tokens = model.tokens
  }
}
