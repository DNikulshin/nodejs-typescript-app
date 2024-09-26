import { FC } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Form } from "../components/AppForm"
import { useStore } from '../store/store.ts'

export const RegisterPage: FC = () => {
  const isAuth = useStore(state => state.isAuth)

  if(isAuth) {
    return <Navigate to='/' replace/>
  }
  return (
    <div>
      <h1>RegisterPage</h1>
      <Form title="Регистрация" type="registration" buttonText="Зарегистрироваться">
        <p>Есть аккаунт ? </p>
        <Link to='/login'>Авторизация</Link>
      </Form>
      </div>
  )
}
