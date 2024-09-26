import  { useEffect } from 'react'
import {  RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { router } from './router/routes.tsx'
import { useStore } from './store/store.ts'

function App() {
  const checkAuth = useStore(state => state.checkAuth)
  const isLoading = useStore(state => state.isLoading)
  const isAuth = useStore(state => state.isAuth)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) checkAuth()
  }, [])


  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-2xl">Загрузка...</div>
    )
  }

  console.log('isAuth ', isAuth)

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer position='top-center'/>
    </>



  )
}

export default App
