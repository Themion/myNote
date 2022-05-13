import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios"
import { getAccessToken, getRefreshToken, isTokenExpired, refreshAccessToken } from "./session"

export const baseURL = "https://localhost:8443"

export interface sendTo {
    url: string,
    method: string
}

export interface Callback {
    (res: AxiosResponse): any
}
export interface Fallback {
    (response: AxiosResponse): any
}

// 지정된 경로로 redirect
export const redirect = (path: string) => { window.location.href = path }
export const reload = () => window.location.reload()

// axios 실행
export const send = async (
    to: sendTo, 
    data: object, 
    callback: Callback, 
    fallback: Fallback
) => {
    // 요청을 보내기 전 미리 accessToken을 갱신
    if (!isTokenExpired(getRefreshToken()) && isTokenExpired(getAccessToken())) await refreshAccessToken()

    // 갱신된 accessToken을 헤더에 담은 뒤
    const accessToken = getAccessToken()
    const headers: AxiosRequestHeaders = { authorization: accessToken ? "Bearer " + accessToken : "" }

    // 백엔드에 요청을 보낸 뒤 callback 혹은 fallback 실행
    const config: AxiosRequestConfig = {
        url: to.url,
        method: to.method,
        headers: headers,
        data: data,
        baseURL: baseURL
    }
    axios(config).then((res: AxiosResponse) => callback(res)).catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
            console.log(err.response)
            if (err.response) fallback(err.response)
        } else console.log(err)
    })
}
