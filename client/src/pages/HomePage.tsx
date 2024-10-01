import { FC } from 'react'
import { useStore } from '../store/store'
import { Button } from '@/components/ui/button'


export const HomePage: FC = () => {
  const userList = useStore(state => state.userList)
  const getUsers = useStore(state => state.getUsers)
  const user = useStore(state => state.user)
  const logout = useStore(state => state.logout)
  const isLoading = useStore(state => state.isLoading)

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
      <div>Email: {user?.email}</div>
      <strong>Name: {user?.name}</strong>
      <strong className="flex gap-2">
        <span>Role:</span>
        [
        {user?.role?.map(role =>
          <span key={role.id}>
            <span>{role.name}</span>,
          </span>
        )}
        ]
      </strong>

      <Button className="px-2 py-2 bg-red-400 shadow-md text-slate-800  hover:bg-red-300"
        onClick={() => logout()}>Выйти</Button>
      <Button className="px-2 py-2 bg-green-400 shadow-md  text-slate-800  hover:bg-green-300" onClick={getUsers}>Получить
        список пользователей</Button>


      {
        userList.map(user =>
          <div key={user.id}>
            {user?.email}
          </div>,
        )
      }

    </div>
  )
}
