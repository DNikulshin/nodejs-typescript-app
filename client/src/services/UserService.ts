import { AxiosResponse } from "axios";
import { AuthResponse } from '../models/response/AuthResponse.ts'
import { IUser } from "../models/User";
import $api from "../http";
import { LoginProps } from './AuthService.ts'


export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<AuthResponse>> {

        return  $api.get<AuthResponse>('/users')

    }
}
