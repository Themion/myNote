import axios from "axios"

export const class_valid = "is-valid"
export const class_invalid = "is-invalid"

export const baseURL = "https://localhost:8443"
export const localStorageAuth = "authorization"

export const send = (url, method, data, callback) => {
    const header = {}

    header[localStorageAuth] = window.localStorage.getItem(localStorageAuth)

    const config = {
        url: url,
        method: method,
        header: header,
        data: data,
        baseURL: baseURL
    }
    
    axios(config).then(res => callback(res))
}

export const getNickname = () => {
    const JWT = window.localStorage.getItem(localStorageAuth)
    if (JWT === null) return "User"
    
    const payload = JSON.parse(atob(JWT.split(".")[1]))
    
    return payload.nickname
}
