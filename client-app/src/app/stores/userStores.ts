// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import { router } from "../router/Routes";
// import { UserFormValues } from "../models/user";
// import agent from "../api/agent";
// import { closeModal } from "./modalStores";

// // const dispatch = useDispatch()

// export interface UserState {
//     // user: User | null
//     // value: number
//     value: string | null
// }

// const initialState: UserState = {
//     // user: null
//     // value: 0,
//     value: localStorage.getItem('jwt')
// }

// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         // decrement: (state) => {
//         //     state.value -= 1
//         // },
//         // increment: (state) => {
//         //     state.value += 1
//         // },
//         setToken: (state, action: PayloadAction<string | null>) => {
//             state.value = action.payload
//         }
//     }
// })

// // export class UserFuncs{
// //     login = async (value: UserFormValues) => {
// //         try {
// //             const user = await agent.User.login(value)
// //             dispatch(setToken(user.token))
// //             localStorage.setItem('jwt', user.token) // shared preference
// //             router.navigate('/rooms');
// //             dispatch(closeModal());
// //         } catch (error) {
// //             throw error;
// //         }
// //     }

// //     logout = () => {
// //         dispatch(setToken(null))
// //         router.navigate('/');
// //     }
// // }

// export const {setToken } = userSlice.actions

// export default userSlice.reducer

import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "./store";

export default class UserStore {
    token: string | null = localStorage.getItem('jwt');
    username: string | null = null
    appLoaded = false;

    constructor() {
        makeAutoObservable(this)
        reaction( // dia hanya jalan kalo value token changes, tapi ga pas lagi initiate. cth pas user login/logout
            () => this.token, // we tell it we want to react to the token
            token =>{
                if(token){
                    localStorage.setItem('jwt', token) // shared preference
                } else {
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    get isLoggedIn(){
        return !!this.username
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            this.token = user.token;
            this.username = user.username
            router.navigate('/rooms');
        } catch (error) {
            throw error; // dilempar ke onSubmitnya LoginForm.tsx
        }
    }

    logout = () => {
        this.token = null;
        this.username = null;
        router.navigate('/');
    }

    getUser = async () => {
        try{
            const user = await agent.Account.getUser();
            runInAction(() => this.username = user.username);
        } catch(error) {
            console.log(error);
        }
    }

    setApploaded(){
        this.appLoaded = true;
    }
}