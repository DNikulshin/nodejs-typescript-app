import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout.tsx'
import { useStore } from '../store/store'

export const PrivateRoutes: FC = () => {
  const isAuth = useStore(state => state.isAuth)
  return (
    isAuth ?
        <MainLayout/>
      :
      <Navigate to="/login" replace />
  )
}
