
import { create } from 'zustand'
import { IUser } from '../models/User'
import AuthService from '../services/AuthService'

interface IStore {
    user: IUser
    isAuth: boolean,
    login: (email: string, password: string) => Promise<void>,
    registration: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>
}


export const useStore = create<IStore>()((set) => ({
    user: {
        id: '',
        email: '',
        isActivated: false
    },
    isAuth: false,

    login: async (email, password) => {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('accessToken', response.data.accessToken)
            set({ isAuth: true })
            set({ user: response.data.user })

        } catch (e: any) { // any ???
            console.log(e)
            console.log(e.response?.data?.message)

        }
    },
    registration: async (email, password) => {
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem('accessToken', response.data.accessToken)
            set({ isAuth: true })
            set({ user: response.data.user })

        } catch (e: any) { // any ???
            console.log(e)
            console.log(e.response?.data?.message)

        }
    },
    logout: async () => {
        try {
            await AuthService.logout()
            localStorage.removeItem('accessToken')
            set({ isAuth: false })
            set({ user: {} as IUser })

        } catch (e: any) { // any ???
            console.log(e.response?.data?.message)

        }
    }
}))