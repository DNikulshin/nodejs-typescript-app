import { FC } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Form } from "../components/AppForm"
import { useStore } from '../store/store.ts'

export const RegisterPage: FC = () => {

  const isAuth = useStore(state => state.isAuth)

  if (isAuth) {
    return <Navigate to='/login' replace />
  }
  return (
    <main className="overflow-hidden">
      <Form title="Регистрация" type="registration" buttonText="Зарегистрироваться">
        <strong>Есть аккаунт ? </strong>
        <Link className="px-2 py-2 bg-orange-400 bg-opacity-80 shadow-md" to='/login'>Авторизация</Link>
      </Form>
    </main>
  )
}
