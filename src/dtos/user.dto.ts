
import { IUserDto } from "../types/user.js"

export class UserDto {
  id
  email
  isActivated
  name
  role
  password?


  constructor(model: IUserDto) {
    this.id = model.id
    this.email = model.email
    this.isActivated = model.isActivated
    this.name = model.name
    this.role = model.role
    this.password = model.password
  }
}
