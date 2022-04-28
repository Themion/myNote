import axios from "axios"
import { Auth, getAccessToken } from "./session"

export const baseURL = "https://localhost:8443"

export const redirect = (path) => window.location.href = path

export const send = (url, method, data, callback, fallback) => {
    const headers = {}

    headers[Auth] = "Bearer " + getAccessToken()

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
