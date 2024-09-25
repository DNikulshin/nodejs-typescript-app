
import { create } from 'zustand'
import axios from 'axios'
import { IUser } from '../models/User'
import AuthService from '../services/AuthService'
import ErrorHandler from '../exeptions/ErrorHandler'
import { AuthResponse } from '../models/response/AuthResponse'

interface IStore {
    user: IUser
    isAuth: boolean,
    login: (email: string, password: string) => Promise<void>,
    registration: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    checkAuth: () => Promise<void>
    isLoading: boolean
    errors: IError[]
}

export interface IError {
    msg: string
    path?: string
    type?: string
    value?: string

}


export const useStore = create<IStore>()((set) => ({
    user: {
        id: '',
        email: '',
        isActivated: false
    },
    isAuth: false,
    isLoading: false,
    errors: [],

    login: async (email, password) => {
        try {
            set({ errors: [] })
            set({ isLoading: true })
            const response = await AuthService.login(email, password)
            localStorage.setItem('accessToken', response.data.accessToken)
            set({ isAuth: true })
            set({ user: response.data.user })
            set({ isLoading: false })
        } catch (error) {
            const errors = ErrorHandler(error) as IError[]
            set({ errors})

        } finally {
            set({ isLoading: false })
        }
    },
    registration: async (email, password) => {
        try {
            set({ errors: [] })
            set({ isLoading: true })
            const response = await AuthService.registration(email, password)
            localStorage.setItem('accessToken', response.data.accessToken)
            set({ isAuth: true })
            set({ user: response.data.user })
            set({ isLoading: false })
        } catch (error) {
            const errors = ErrorHandler(error) as IError[]
            set({ errors})

        } finally {
            set({ isLoading: false })
        }
    },
    logout: async () => {
        try {
            await AuthService.logout()
            localStorage.removeItem('accessToken')
            set({ isAuth: false })
            set({ user: {} as IUser })
            set({ isLoading: false })
        } catch (error) {
          ErrorHandler(error) as IError[]
        }
    },
    checkAuth: async () => {
        try {
            set({ isLoading: true })
            const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_APP_API_URL}/refresh`, {
                withCredentials: true
            })

            localStorage.setItem('accessToken', response.data.accessToken)
            set({ isAuth: true })
            set({ user: response.data.user })
        } catch (error) {
            ErrorHandler(error) as IError[]
        } finally {
            set({ isLoading: false })
        }
    }
}))
