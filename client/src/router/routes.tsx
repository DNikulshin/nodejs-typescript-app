import { Route, Routes } from 'react-router-dom'
import { PrivateRoutes } from './PivateRoutes'
import { LoginPage } from '../pages/LoginPage'
import { MainLayout } from '../layouts/MainLayout'
import { HomePage } from '../pages/HomePage'
import { RegisterPage } from '../pages/RegisterPage'
import { EmptyLayout } from '../layouts/EmptyLayout'

export const useRoutes = () => {
    return (
        <Routes>

            <Route element={<PrivateRoutes />}>

                <Route path='/' element={<MainLayout />}>

                    <Route element={<HomePage />} index />


                    {/* <Route path="*"
                        element={<Navigate to="/" replace />}
                    /> */}
                </Route>

            </Route>

            <Route element={<EmptyLayout />} path='/login'>
                <Route index
                    element={<LoginPage />}
                />

                <Route path="registration"
                    element={<RegisterPage />}
                />


                {/* <Route path="*"
                    element={<Navigate to="login" replace />}
                /> */}

            </Route>


        </Routes>
    )
}