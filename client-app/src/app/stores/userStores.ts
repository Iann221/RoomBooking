import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { router } from "../router/Routes";
import { UserFormValues } from "../models/user";
import agent from "../api/agent";
import { closeModal } from "./modalStores";

// const dispatch = useDispatch()

export interface UserState {
    // user: User | null
    // value: number
    value: string | null
}

const initialState: UserState = {
    // user: null
    // value: 0,
    value: localStorage.getItem('jwt')
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // increment: (state) => {
        //     state.value += 1
        // },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.value = action.payload
        }
    }
})

// export class UserFuncs{
//     login = async (value: UserFormValues) => {
//         try {
//             const user = await agent.User.login(value)
//             dispatch(setToken(user.token))
//             localStorage.setItem('jwt', user.token) // shared preference
//             router.navigate('/rooms');
//             dispatch(closeModal());
//         } catch (error) {
//             throw error;
//         }
//     }

//     logout = () => {
//         dispatch(setToken(null))
//         router.navigate('/');
//     }
// }

export const {setToken } = userSlice.actions

export default userSlice.reducer