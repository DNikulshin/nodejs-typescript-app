import { FC, useState } from 'react'
import UserService from '../services/UserService'
import { IUser } from '../models/User'
import { useStore } from '../store/store'


export const HomePage: FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const user = useStore(state => state.user)
  const logout = useStore(state => state.logout)
  const isLoading = useStore(state => state.isLoading)
  const getUsers = async () => {

    try {
      const response = await UserService.fetchUsers()

      setUsers(response.data)
    } catch (e) {
      console.log(e)

    }

  }

  if (isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }
  return (
    <div className="flex w-full h-full flex-col justify-center items-center gap-3">
      <h1>Home</h1>
      {/* <div>{errors.map(err =>
      <span>{err?.msg}</span>
    )}</div> */}
      <div>{user.email}</div>
      <strong>{user?.name}</strong>
      <button className="px-2 py-2 bg-red-400 shadow-md" onClick={() => logout()}>Выйти</button>
      <button className="px-2 py-2 bg-green-400 shadow-md" onClick={getUsers}>Получить список пользователей</button>


      {
        users.map(user =>
          <div key={user.id}>{user.email}</div>,
        )
      }

    </div>
  )
}
