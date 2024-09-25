import { Form } from "../components/AppForm"
import { useStore } from "../store/store"


export const RegisterPage = () => {

  const isLoading = useStore(state => state.isLoading)

  if (isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }
  return (
    <div>
      <h1>RegisterPage</h1>
      <Form title="Регистрация" type="regisration" buttonText="Зарегистрироваться"/>
      </div>
  )
}
