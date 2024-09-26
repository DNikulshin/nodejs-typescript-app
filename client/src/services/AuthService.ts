import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
export interface LoginProps {
    email: string
    password: string
}

export interface RegistrationProps {
    email: string
    password: string
    name?: string | undefined
}



export default class AuthService {

    static async login({ email, password }: LoginProps): Promise<AxiosResponse<AuthResponse>> {

        return  $api.post<AuthResponse>('/login', { email, password })

    }
    static async registration({ email, password, name }: RegistrationProps): Promise<AxiosResponse<AuthResponse>> {

        return  $api.post<AuthResponse>('/registration', { email, password, name })

    }
    static async logout(): Promise< void> {
       await $api.post('/logout')
    }
}
