import { LoginForm } from "./components/LoginForm"
import { useStore } from './store/store.ts'

function App() {
  const isAuth = useStore(state => state.isAuth)
  const logout = useStore(state => state.logout)
  const user = useStore(state => state.user)

  return (
    <div className="flex w-full h-screen flex-col justify-center items-center">
      <div>{user.email}</div>
      <strong>{user?.name}</strong>

      <strong>{isAuth ? 'Авторизован' : 'Не авторизован'}</strong>
      <button  className="px-2 py-2 bg-red-400 shadow-md" onClick={() => logout()}>logout</button>
     <LoginForm/>
    </div>
  )
}

export default App
