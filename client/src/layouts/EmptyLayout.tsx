import { Outlet } from "react-router-dom"


export const EmptyLayout = () => {

    return <>
    <div> Empty</div>
        <Outlet/>
    </>
}