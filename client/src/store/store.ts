
import { AxiosError } from 'axios'
import { create } from 'zustand'
import { IUser } from '../models/User'
import AuthService from '../services/AuthService'
import { toast} from 'react-toastify'

interface IStore {
    user: IUser
    isAuth: boolean,
    login: (email: string, password: string) => Promise<void>,
    registration: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>
    isLoading: boolean
    errors: IError[]
}

interface IError {
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
            set({errors: []})
            set({isLoading: true})
            const response = await AuthService.login(email, password)
            localStorage.setItem('accessToken', response.data.accessToken)
            set({ isAuth: true })
            set({ user: response.data.user })
            set({isLoading: false})
        } catch (e) {
            if(e instanceof AxiosError) {
                toast(e.response?.data?.message, {type: 'error'})
                set({errors: e.response?.data?.errors })
                console.log(e.response?.data?.message)
                console.log(e.response?.data?.errors)
            } else {
                toast(e.message, {type: 'error'})
                set({errors: e?.errors })
                console.log(e?.errors)
                throw e
            }

        } finally {
            set({isLoading: false})
        }
    },
    registration: async (email, password) => {
        try {
            set({errors: []})
            set({isLoading: true})
            const response = await AuthService.registration(email, password)
            localStorage.setItem('accessToken', response.data.accessToken)
            set({ isAuth: true })
            set({ user: response.data.user })
            set({isLoading: false})
        } catch (e) {
            if(e instanceof AxiosError) {
                toast(e.response?.data?.message, {type: 'error'})
                set({errors: e.response?.data?.errors })
                console.log(e.response?.data?.message)
                console.log(e.response?.data?.errors)
            } else {
                toast(e.message, {type: 'error'})
                set({errors: e?.errors })
                console.log(e?.errors)
                throw e
            }


        } finally {
            set({isLoading: false})
        }
    },
    logout: async () => {
        try {
            set({isLoading: true})
            await AuthService.logout()
            localStorage.removeItem('accessToken')
            set({ isAuth: false })
            set({ user: {} as IUser })
            set({isLoading: false})
        } catch (e) { // any ???
            if(e instanceof AxiosError) {
                console.log(e)
                console.log(e.response?.data?.message)
                toast(e.response?.data?.message, {type: 'error'})
            }
            toast(e.message, {type: 'error'})
            throw e
        } finally {
            set({isLoading: false})
        }
    }
}))
