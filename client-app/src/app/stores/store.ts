// import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './userStores'
// import modalReducer from './modalStores'

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     modal: modalReducer
//   },
// })

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

import { createContext, useContext } from "react";
import UserStore from "./userStores";
import RoomStore from "./roomStores";
// tempat nyimpen semua stores kita

// ini cm bikin tipe
interface Store {
    userStore: UserStore;
    roomStore: RoomStore;
}

export const store: Store = {

    userStore: new UserStore(),
    roomStore: new RoomStore()
}
// context digunakan utk bisa akses store dari mana aja
export const StoreContext = createContext(store);

// buat hook sendiri
export function useStore() {
    return useContext(StoreContext);
}