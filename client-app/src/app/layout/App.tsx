import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import ModalContainer from "../common/ModalContainer"
import HomePage from "../../features/home/HomePage"
import NavBar from "./NavBar"
import { useStore } from "../stores/store"
import { useEffect } from "react"
import LoadingComponent from "./LoadingComponent"
import { observer } from "mobx-react-lite"

export default observer(function App(){
    const location = useLocation()
    const {userStore, reserveStore} = useStore();

    useEffect(() => {
        if (userStore.token){
          userStore.getUser().finally(() =>
            reserveStore.loadAllReservations().finally(() => 
              userStore.setApploaded())
          )
        } else {
          userStore.setApploaded()
        }
      }, [userStore])

    if(!userStore.appLoaded) return <LoadingComponent content='Loading app...' />

    return (
        <div>
            <ScrollRestoration />
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
})