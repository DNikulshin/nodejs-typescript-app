import { Outlet } from 'react-router-dom'
import { useStore } from '../store/store'
import { LoginPage } from '../pages/LoginPage'

export const PrivateRoutes = () => {
    const isAuth = useStore(state => state.isAuth)

    return (
        isAuth ? <Outlet/> : <LoginPage/>
    )
}