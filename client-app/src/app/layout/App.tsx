import { Outlet, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import ModalContainer from "../common/ModalContainer"
import HomePage from "../../features/home/HomePage"
import NavBar from "./NavBar"

export default function App(){
    const location = useLocation()

    return (
        <div>
            {/* <ModalContainer /> */}
            <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
            {location.pathname === '/' ? <HomePage /> : (
                <>
                    {location.pathname === '/login' ? <></> : (<NavBar/>)}
                    <div style={{marginTop: '7em'}}>
                    <Outlet />
                    </div> 
                </>
            )}
        </div>
    )
}