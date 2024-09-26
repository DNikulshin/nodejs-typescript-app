import { create } from 'zustand'
import axios from 'axios'
import { IUser } from '../models/User'
import AuthService, { LoginProps, RegistrationProps } from '../services/AuthService'
import ErrorHandler from '../exeptions/ErrorHandler'
import { AuthResponse } from '../models/response/AuthResponse'
import UserService from '../services/UserService.ts'

interface IStore {
  user: IUser,
  userList: IUser[],
  isAuth: boolean,
  login: ({ email, password }: LoginProps) => Promise<void>,
  registration: ({ email, password, name }: RegistrationProps) => Promise<void>,
  logout: () => Promise<void>,
  checkAuth: () => Promise<void>,
  getUsers: () => Promise<void>
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
    isActivated: false,
  },
  isAuth: false,
  isLoading: false,
  errors: [],
  userList: [],

  login: async ({ email, password }) => {
    try {
      set({ errors: [] })
      set({ isLoading: true })
      const response = await AuthService.login({ email, password })
      set({ isAuth: true })
      localStorage.setItem('accessToken', response.data.accessToken)
      set({ user: response.data.user })

    } catch (error) {
      const errors = ErrorHandler(error)
      set({ errors })

    } finally {
      set({ isLoading: false })
    }
  },
  registration: async ({ email, password, name }) => {
    try {
      set({ errors: [] })
      set({ isLoading: true })
      const response = await AuthService.registration({ email, password, name })
      set({ isAuth: true })
      localStorage.setItem('accessToken', response.data.accessToken)

      set({ user: response.data.user })

    } catch (error) {
      const errors = ErrorHandler(error)
      set({ errors })

    } finally {
      set({ isLoading: false })
    }
  },
  logout: async () => {
    try {
      await AuthService.logout()
      set({ isAuth: false })
      localStorage.removeItem('accessToken')
      set({ user: {} as IUser })

    } catch (error) {
      return ErrorHandler(error)
    }
  },
  checkAuth: async () => {
    try {
      set({ isLoading: true })
      const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_APP_API_URL}/refresh`, {
        withCredentials: true,
      })
      set({ isAuth: true })
      localStorage.setItem('accessToken', response.data.accessToken)
      set({ user: response.data.user })

    } catch (error) {
      return ErrorHandler(error)
    } finally {
      set({ isLoading: false })
    }
  },
  getUsers: async () => {

    try {
      const response = await UserService.fetchUsers()

      set({ userList: response.data })
    } catch (error) {
      return ErrorHandler(error)
    }

  },

}))
