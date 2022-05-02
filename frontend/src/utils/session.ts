import axios from "axios"
import { baseURL, redirect } from "./utils"

export type header = { authorization: string }
export const accessTokenStorage: string = "access-token"
export const refreshTokenStorage: string = "refresh-token"

// accessToken getter / setter
export const getAccessToken = () => window.localStorage.getItem(accessTokenStorage)
export const setAccessToken = (accessToken: string) => window.localStorage.setItem(accessTokenStorage, accessToken)
export const removeAccessToken = () => window.localStorage.removeItem(accessTokenStorage)

// refreshToken getter / setter
export const getRefreshToken = () => window.localStorage.getItem(refreshTokenStorage)
export const setRefreshToken = (refreshToken: string) => window.localStorage.setItem(refreshTokenStorage, refreshToken)
export const removeRefreshToken = () => window.localStorage.removeItem(refreshTokenStorage)

// token에서 payload를 읽을 수 있는 json 객체로 parsing
export const getTokenPayload = (token: string) => {
    // Buffer.from(token.split(".")[1], 'base64').toString('binary')
    return JSON.parse(atob(token.split(".")[1]))
}

// accessToken에서 사용자의 nickname을 반환 / 사용자가 없다면 기본값 User를 반환
export const getNickname = (): string => {
    const accessToken = getAccessToken()
    return accessToken ? getTokenPayload(accessToken).nickname : "User"
}

// 인자로 주어진 token이 만료되었는지 여부를 반환
export const isTokenExpired = (token: string): boolean => {
    return ( getTokenPayload(token).exp * 1000) <= new Date().getTime()
}

// 가지고 있는 refreshToken을 이용해 accessToken을 재발급
export const requestAccessToken = () => {
    // 기존에 존재하던 accessToken을 제거
    removeAccessToken()

    // refreshToken이 없거나 만료되었다면 로그인 페이지로 이동
    const refreshToken = getRefreshToken()
    if (!refreshToken || isTokenExpired(refreshToken)) {
        redirect('/login')
        return
    }

    // 헤더에 refreshToken을 저장한 뒤
    const headers: header = { authorization: "Bearer " + refreshToken }

    // 백엔드에 보낼 요청
    const config = {
        url: '/session',
        method: 'GET',
        headers: headers,
        data: {},
        baseURL: baseURL
    }
    // 백엔드에 요청을 보낸 뒤 accessToken을 받아와 저장
    axios(config).then((res: any) => setAccessToken(res.data[accessTokenStorage]))
}

// refreshToken과 accessToken이 만료되었는지 확인
export const manageTokens = () => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()

    if (refreshToken && isTokenExpired(refreshToken)) {
        removeRefreshToken()
    } else if (accessToken && isTokenExpired(accessToken)) {
        requestAccessToken()
    }
}
