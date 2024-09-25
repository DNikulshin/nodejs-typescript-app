import { useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from './router/routes.tsx'
import { useStore } from './store/store.ts'
import { ToastContainer } from "react-toastify"
// import { LoginPage } from "./pages/LoginPage.tsx"

// import { PrivateRoutes } from "./router/PivateRoutes.tsx"

function App() {
  const routes = useRoutes()
  const checkAuth = useStore(state => state.checkAuth)
  const isLoading = useStore(state => state.isLoading)
  // const isAuth = useStore(state => state.isAuth)
  // const errors = useStore(state => state.errors)


  useEffect(() => {
    if (localStorage.getItem('accessToken')) checkAuth()
  }, [])

  // useEffect(() => {
  //   console.log(errors, '11111111111111111111');

  // }, [errors])
  // console.log('isAuth :', isAuth);


  if (isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }

  // if (!isAuth) {
  //   return <LoginPage />
  // }

  return (
    <>
      <Router>
        {routes}
      </Router>

      <ToastContainer position="top-center" />
    </>
  )
}

export default App
