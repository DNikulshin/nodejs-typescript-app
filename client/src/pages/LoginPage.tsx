import { FC } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Form } from "../components/AppForm"
import { useStore } from "../store/store"

export const LoginPage: FC = () => {

  const isAuth = useStore(state => state.isAuth)

  if(isAuth) {
    return <Navigate to='/' replace/>
  }

  return (
    <div>
      <h1>LoginPage</h1>

      <Form title="Авторизация" type="login" buttonText="Войти">
        <p>Нет аккауна ? </p>
        <Link to='/registration'>Регистрация</Link>
      </Form>


    </div>
  )
}
