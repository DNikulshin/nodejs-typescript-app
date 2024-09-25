import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes.tsx'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { RegisterPage } from '../pages/RegisterPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes/>,
    children: [
      {
        path: '/',
        element: <HomePage/>
      }
    ],
  },
      {
        path: '/login',
        element: <LoginPage/>

      },
      {
        path: '/registration',
        element: <RegisterPage/>
      },
  {
    path: '*',
    element: <Navigate to='/' replace />
  }
])
