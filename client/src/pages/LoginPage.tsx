
import { Form } from "../components/AppForm"
import { useStore } from "../store/store"

export const LoginPage = () => {
  const isLoading = useStore(state => state.isLoading)

  if (isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }

  return (
    <div>
      <h1>LoginPage</h1>

      <Form title="Авторизация" type="login" buttonText="Войти"/>

    </div>
  )
}
