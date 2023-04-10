import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
    open: boolean
    body: JSX.Element | null
}

const initialState: UserState = {
    open: false,
    body: null
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, content: PayloadAction<JSX.Element>) => {
            state.open = true
            state.body = content.payload
        },
        closeModal: (state) => {
            state.open = false
            state.body = null
        },
    }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer