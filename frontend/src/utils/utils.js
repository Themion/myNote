import axios from "axios"
import { Auth, getAccessToken, getRefreshToken, requestAccessToken } from "./session"

export const baseURL = "https://localhost:8443"

export const redirect = (path) => window.location.href = path

export const send = async (url, method, data, callback, fallback) => {
    if (getRefreshToken()) await requestAccessToken()
    
    const headers = {}
    const accessToken = getAccessToken()
    if (accessToken) headers[Auth] = "Bearer " + accessToken

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
