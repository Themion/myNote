import axios from "axios"
import { header, getAccessToken, getRefreshToken, requestAccessToken } from "./session"

export const baseURL = "https://localhost:8443"

export interface sendTo {
    url: string,
    method: string
}

// 지정된 경로로 redirect
export const redirect = (path: string) => { window.location.href = path }
// 현재 경로의 params를 객체 형태로 반환
export const getParams = () => new URLSearchParams(window.location.search)

// axios 실행
export const send = async (
    to: sendTo, 
    data: object, 
    callback: Function, 
    fallback: Function
) => {
    // 요청을 보내기 전 미리 accessToken을 갱신
    if (!getRefreshToken()) await requestAccessToken()

    // 갱신된 accessToken을 헤더에 담은 뒤
    const accessToken = getAccessToken()
    const headers: header = { authorization: accessToken ? "Bearer " + accessToken : "" }

    // 백엔드에 요청을 보낸 뒤 callback 혹은 fallback 실행
    const config = {
        url: to.url,
        method: to.method,
        headers: headers,
        data: data,
        baseURL: baseURL
    }
    axios(config).then((res: any) => callback(res)).catch((err: any) => {
        console.log(err.response)
        fallback(err.response)
    })
}
