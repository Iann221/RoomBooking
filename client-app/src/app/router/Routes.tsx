import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Dashboard from "../../features/room/Dashboard";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import TestErrors from "../../features/errors/TestError";
import Details from "../../features/reservations/Details";
import ReservationForm from "../../features/reservations/ReservationForm";
import RequireAuth from "./RequireAuth";
import PdfPage from "../../features/reservations/PdfPage";
import EditProfileForm from "../../features/users/EditProfileForm";
import RegisterForm from "../../features/users/RegisterForm";
import UserList from "../../features/users/UserList";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />,children:[
                {path: '', element: <HomePage />},
                {path: 'rooms', element: <Dashboard />},
                {path: 'rooms/:id', element: <Details />},
                {path: 'createReservation', element: <ReservationForm key='create'/>},
                {path: 'manage/:id', element: <ReservationForm key='manage'/>},
                {path: 'errors', element: <TestErrors />},
                {path: 'pdf', element: <PdfPage />},
                {path: 'register', element: <RegisterForm />},
                {path: 'editProfile/:id', element: <EditProfileForm />},
                {path: 'users', element: <UserList />},
            ]},
            {path: 'login', element: <LoginForm />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError/>},
            {path: '*', element: <Navigate replace to='/not-found'/>}
        ]
    }
]

export const router = createBrowserRouter(routes);