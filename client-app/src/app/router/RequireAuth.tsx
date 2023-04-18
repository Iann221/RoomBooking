import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequireAuth() {
    const {userStore: {isLoggedIn}} = useStore();
    const location = useLocation(); // get location where we're currently at

    if(!isLoggedIn) {
        return <Navigate to='/' state={{from: location}} /> // state agar tahu dia dateng dari mana
    }

    return <Outlet />
}