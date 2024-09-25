import {Outlet} from 'react-router-dom'
import { Navigation } from '../components/TheNavigation'


export const MainLayout = () => {
    return <>
        
        <Navigation/>
            <main>
                <Outlet/>
            </main>
    </>
}