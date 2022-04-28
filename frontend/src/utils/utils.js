import axios from "axios"

const baseURL = "https://localhost:8443"
const localStorageAuth = "authorization"

export const getSession = () => window.localStorage.getItem(localStorageAuth)
export const setSession = (session) => window.localStorage.setItem(localStorageAuth, session)
export const removeSession = () => window.localStorage.removeItem(localStorageAuth)
export const redirect = (path) => window.location.href = path

export const send = (url, method, data, callback, fallback) => {
    const headers = {}

    headers[localStorageAuth] = getSession()

    const config = {
        url: url,
        method: method,
        headers: headers,
        data: data,
        baseURL: baseURL
    }
    
    axios(config).then(res => callback(res)).catch(err => {
        console.log(err.response)
        fallback(err.response)
    })
}

export const getNickname = () => {
    const JWT = getSession()
    if (JWT === null) return "User"
    
    const payload = JSON.parse(atob(JWT.split(".")[1]))
    
    return payload.nickname
}

export const getExpiration = () => {
    const JWT = getSession()
    if (JWT === null) return new Date().getTime() + 10

    const payload = JSON.parse(atob(JWT.split(".")[1]))

    return payload.exp * 1000
}

export const sessionTimeOut = () => {
    if (getExpiration() <= new Date().getTime()) {
        removeSession()
    }
}
