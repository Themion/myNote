import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface AlertType {
    msg: string
    type: string
}

interface AlertAction { type: string, payload: AlertType }

export interface DispatcherProps {
    setAlert: (alert: AlertType) => void
}

export const alertObj = (msg = "", type = "") => {
    return { msg, type } as AlertType
}

export const alertSlice = createSlice({
    name: "alertReducer",
    initialState: {type: "", msg: ""} as AlertType,
    reducers: {
        setAlert: (state: AlertType, action: AlertAction) => {
            window.localStorage.setItem('payload', action.payload.type + ' ' + action.payload.msg)
            return action.payload
        }
    }
})

export const alertStore = configureStore({ reducer: alertSlice.reducer })
