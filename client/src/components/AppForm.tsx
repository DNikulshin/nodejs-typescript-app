import { ChangeEvent, FC, FormEventHandler, useState } from "react"
import { useStore } from "../store/store"

interface FormPropsTypes {
    title: string
    type: 'login' | 'regisration',
    buttonText: string
}



export const Form: FC<FormPropsTypes> = ({ title, type, buttonText }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    const login = useStore(state => state.login)
    const registration = useStore(state => state.registration)



    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (!email.trim() && !password.trim()) return

    }

    const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <form className="flex flex-col w-full h-screen px-4 justify-center items-center gap-4" onSubmit={onSubmit}>
            <h1 className="text-3xl">{title}</h1>

            <input
                className="bg-gray-200 mb-2 px-2 py-2 shadow-md"
                onChange={changeEmailHandler}
                value={email}
                type="text"
                placeholder="Email"
            />

            <input
                className=" bg-gray-200 px-2 py-2 shadow-md"
                onChange={changePasswordHandler}
                value={password}
                type="password"
                placeholder="Пароль"
            />

            {type === 'login' && <button disabled={!email || !password}
                className="px-2 py-2 bg-gray-400 shadow-md disabled:bg-slate-200"
                onClick={() => login(email, password)}>
                {buttonText}
            </button>}

            {type === 'regisration' && <button
                disabled={!email || !password}
                className="px-2 py-2 bg-gray-400 shadow-md  disabled:bg-slate-200"
                onClick={() => registration(email, password)}
            >
                {buttonText}
            </button>}

        </form>
    )
}
