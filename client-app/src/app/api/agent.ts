import axios, { AxiosError, AxiosResponse } from "axios"
import { store } from "../stores/store";
import { useSelector } from "react-redux";
import { router } from "../router/Routes";
import { toast } from "react-toastify";
import { UserFormValues, User } from "../models/user";
import { Room } from "../models/room";
import { Reservation } from "../models/reservation";
import { ReservationFormValuesAxios } from "../models/reservationFormValues";
import { UserInfo } from "../models/userInfo";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => { //apa yang dilakukan saat api request
    // const token = useSelector((state: RootState) => state.user.value);
    // if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    const token = store.userStore.token;
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
}) 

axios.interceptors.response.use(async response => { // interceptor: apa yg dilakukan klo api selesai
    await sleep(1000)
    return response;
}, (error: AxiosError) => { // setelah koma, itu deals when a request is rejected
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')){
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors){
                    if (data.errors[key]){
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat(); // ngirim jadi satu array. throw
            } else {
                toast.error(data); // kalo 400 doang tanpa data2 errors
            }
            break;
        case 401:
            toast.error('unauthorized')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found')
            break;
        case 500:
            router.navigate('/server-error')
            break;
        default:
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Account = {
    login: (user: UserFormValues) => request.post<User>('/account/login',user),
    register: (user: UserFormValues) => request.post('/account/register',user),
    getUser: () => request.get<User>('/account'),
    getAllUsers: () => request.get<UserInfo[]>('/account/all'),
    edit: (user: UserFormValues, id: string) => request.put(`/account/${id}`,user),
    delete: (id: string) => request.del(`/account/${id}`)
}

const Rooms = {
    getRooms: (params: URLSearchParams) => axios.get<Room[]>('/rooms',{params}).then(responseBody)
}

const Reservations = {
    getAllReservations: () => request.get<Reservation[]>('/reservation/all'),
    getRoomReservations: (params: URLSearchParams) => axios.get<Reservation[]>('/reservation',{params}).then(responseBody),
    reserve: (reserve: ReservationFormValuesAxios) => request.post<Reservation>('/reservation',reserve),
    update: (reserve: ReservationFormValuesAxios) => request.put(`/reservation/${reserve.id}`, reserve),
    delete: (id: string) => request.del(`/reservation/${id}`)
}

const agent = {
    Account,
    Rooms,
    Reservations
}

export default agent;