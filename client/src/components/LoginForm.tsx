import { FC, useState } from "react"
import { useStore } from "../store/store"


export const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const isLoading = useStore(state => state.isLoading)

    const login = useStore(state => state.login)

    const registration = useStore(state => state.registration)

  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }

    return (
        <form className="flex flex-col w-full px-4 justify-center items-center gap-4">
            <h1 className="text-3xl">Auth Form</h1>

            <input
                className="bg-gray-200 mb-2 px-2 py-2 shadow-md"
                onChange={e => {
                    setEmail(e.target.value)

                }}
                value={email}
                type="text"
                placeholder="Email"
            />

            <input
                className=" bg-gray-200 px-2 py-2 shadow-md"
                onChange={e => {

                    setPassword(e.target.value)
                  }
                }
                value={password}
                type="password"
                placeholder="Пароль"
            />

            <button disabled={isLoading} type="button" className="px-2 py-2 bg-gray-400 shadow-md" onClick={() => login(email, password)}>Авторизация</button>

               <button disabled={isLoading}  type="button" className="px-2 py-2 bg-gray-400 shadow-md" onClick={() => registration(email, password)}>Регистрация</button>

        </form>
    )
}
