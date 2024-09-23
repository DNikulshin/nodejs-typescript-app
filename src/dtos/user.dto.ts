
import { IUserDto } from "../types/user.js"

export class UserDto {
  id
  email
  isActivated
  name
  roleName


  constructor(model: IUserDto) {
    this.id = model.id
    this.email = model.email
    this.isActivated = model.isActivated
    this.name = model.name
    this.roleName = model.roleName

  }
}
