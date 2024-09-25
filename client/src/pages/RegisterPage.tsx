import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Form } from "../components/AppForm"

export const RegisterPage: FC = () => {

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
