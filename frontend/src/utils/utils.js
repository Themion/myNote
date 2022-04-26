import axios from "axios"

const baseURL = "https://localhost:8443"
const localStorageAuth = "authorization"

export const send = (url, method, data, callback, fallback) => {
    const headers = {}

    headers[localStorageAuth] = window.localStorage.getItem(localStorageAuth)

    const config = {
        url: url,
        method: method,
        headers: headers,
        data: data,
        baseURL: baseURL
    }
    
    axios(config).then(res => callback(res)).catch(err => fallback(err.response.data))
}

export const getSession = () => window.localStorage.getItem(localStorageAuth)
export const setSession = (session) => window.localStorage.setItem(localStorageAuth, session)
export const removeSession = () => window.localStorage.removeItem(localStorageAuth)

export const getNickname = () => {
    const JWT = window.localStorage.getItem(localStorageAuth)
    if (JWT === null) return "User"
    
    const payload = JSON.parse(atob(JWT.split(".")[1]))
    
    return payload.nickname
}

export const getExpiration = () => {
    const JWT = window.localStorage.getItem(localStorageAuth)
    if (JWT === null) return new Date().getTime()

    const payload = JSON.parse(atob(JWT.split(".")[1]))

    return payload.exp * 1000
}

export const sessionTimeOut = () => {
    if (getExpiration() <= new Date().getTime()) removeSession()
}