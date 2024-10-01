import { FC, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Form } from "../components/AppForm"
import { IError, useStore } from '../store/store.ts'

export const RegisterPage: FC = () => {
  const [errors, serError] = useState<IError[]>([])

  const isAuth = useStore(state => state.isAuth)
  const errorsStore = useStore(state => state.errors)

  useEffect(() => {
    serError(prev => [...prev, ...[]])

    if(errorsStore)
    serError(prev => [...prev, ...errorsStore])

  }, [])


  if (isAuth) {
    return <Navigate to='/' replace />
  }
  return (
    <main className="overflow-hidden">
      <Form title="Регистрация" type="registration" buttonText="Зарегистрироваться" errors={errors}>
        <strong>Есть аккаунт ? </strong>
        <Link className="px-2 py-2 bg-orange-400 bg-opacity-80 shadow-md" to='/login'>Авторизация</Link>
      </Form>
    </main>
  )
}
