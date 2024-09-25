import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation } from '../components/TheNavigation'



export const MainLayout: FC = () => {
    return <>

        <Navigation/>
        MainLayout
            <main>
               <Outlet/>
            </main>
    </>
}
