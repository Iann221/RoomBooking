import axios, { AxiosError, AxiosResponse } from "axios"
import { store } from "../stores/store";
import { useSelector } from "react-redux";
import { router } from "../router/Routes";
import { toast } from "react-toastify";
import { UserFormValues, User } from "../models/user";
import { Room } from "../models/room";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => { //apa yang dilakukan saat api request
    // const token = useSelector((state: RootState) => state.user.value);
    // if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    const token = store.userStore.token;
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    console.log(token);
    console.log("sebelum")
    return config;
}) 

axios.interceptors.response.use(async response => { // interceptor: apa yg dilakukan klo api selesai
    await sleep(1000)
    console.log(response.data)
    return response;
}, (error: AxiosError) => { // setelah koma, itu deals when a request is rejected
    console.log("sesudah error")
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
                console.log(modalStateErrors.flat())
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
    login: (user: UserFormValues) => request.post<User>('/account/login',user)
}

const Rooms = {
    getRooms: (params: URLSearchParams) => axios.get<Room[]>('/rooms',{params}).then(responseBody)
}

const agent = {
    Account,
    Rooms
}

export default agent;