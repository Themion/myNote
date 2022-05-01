import axios from "axios"
import { baseURL, redirect } from "./utils"

export const Auth = "authorization"
export const accessTokenStorage = "access-token"
export const refreshTokenStorage = "refresh-token"

export const getAccessToken = () => window.localStorage.getItem(accessTokenStorage)
export const setAccessToken = (accessToken) => window.localStorage.setItem(accessTokenStorage, accessToken)
export const removeAccessToken = () => window.localStorage.removeItem(accessTokenStorage)

export const getRefreshToken = () => window.localStorage.getItem(refreshTokenStorage)
export const setRefreshToken = (refreshToken) => window.localStorage.setItem(refreshTokenStorage, refreshToken)
export const removeRefreshToken = () => window.localStorage.removeItem(refreshTokenStorage)

export const getTokenPayload = (token) => {
    return JSON.parse(atob(token.split(".")[1]))
}

export const getNickname = () => {
    const accessToken = getAccessToken()
    return accessToken ? getTokenPayload(accessToken).nickname : "User"
}

export const isTokenExpired = (token) => {
    return ( getTokenPayload(token).exp * 1000) <= new Date().getTime()
}

export const requestAccessToken = async () => {
    removeAccessToken()

    const refreshToken = getRefreshToken()
    if (!refreshToken || isTokenExpired(refreshToken)) {
        redirect('/login')
        return
    }

    const headers = {}
    headers[Auth] = "Bearer " + refreshToken

    const config = {
        url: '/session',
        method: 'GET',
        headers: headers,
        data: {},
        baseURL: baseURL
    }

    const res = await axios(config)
    setAccessToken(res.data[accessTokenStorage])
}

export const manageTokens = async () => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()

    if (refreshToken && isTokenExpired(refreshToken)) {
        removeRefreshToken()
    } else if (accessToken && isTokenExpired(accessToken)) {
        await requestAccessToken()
    }
}
