
import { Token } from "@prisma/client"
import { IUserDto } from "../types/user.js"

export class UserLoginDto {
  id
  email
  isActivated
  name?
  role?
  token?


  constructor(model: IUserDto) {
    this.id = model.id
    this.email = model.email
    this.isActivated = model.isActivated
    this.name = model.name
    this.role = model.role
    this.token = model.token
  }
}
