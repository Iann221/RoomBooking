import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import ModalContainer from "../common/ModalContainer"
import HomePage from "../../features/home/HomePage"

export default function App(){

    return (
        <div>
            {/* <ModalContainer /> */}
            <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
            <Outlet />
            {/* <HomePage /> */}
        </div>
    )
}