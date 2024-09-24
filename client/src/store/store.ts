
import { create } from 'zustand'
import { IUser } from '../models/User'
import AuthService from '../services/AuthService'
import ErrorHandler from '../exeptions/ErrorHandler'

interface IStore {
    user: IUser
    isAuth: boolean,
    login: (email: string, password: string) => Promise<void>,
    registration: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>
    isLoading: boolean
    errors: any[] //any type ???
}

// interface IError {
//     msg: string
//     path?: string
//     type?: string
//     value?: string

// }


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
            return ErrorHandler(error)

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
            return ErrorHandler(error)


        } finally {
            set({ isLoading: false })
        }
    },
    logout: async () => {
        try {
            set({ isLoading: true })
            await AuthService.logout()
            localStorage.removeItem('accessToken')
            set({ isAuth: false })
            set({ user: {} as IUser })
            set({ isLoading: false })
        } catch (error) {
           return ErrorHandler(error)

        } finally {
            set({ isLoading: false })
        }
    }
}))
