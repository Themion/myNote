import { UserForm } from './UserForm'
import { redirect, getParams } from '../utils/utils'

import { 
    accessTokenStorage, 
    refreshTokenStorage,
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    removeRefreshToken,
    setRefreshToken
} from '../utils/session'

export const Login = () => {
    if (getAccessToken() !== null) redirect("/user")

    const callback = (res) => {
        console.log(res)
        setAccessToken(res.data[accessTokenStorage])
        setRefreshToken(res.data[refreshTokenStorage])
        redirect('/')
    }

    const fallback = (response) => {
        redirect('/login?error')
    }

    const param = getParams().has("error")
    const alert = param ? "아이디 혹은 비밀번호가 잘못되었습니다." : null
    
    return <UserForm
        name="Log in"
        inputs={[{
            for: "username"
        }, {
            for: "password",
            type: "password"
        }]}
        link={{ to: "/signup", text: "Sign up" }}
        url="/login"
        method="POST"
        callback={callback}
        fallback={fallback}
        alert={alert} />
}

export const Logout = () => {
    if (getAccessToken() === null) redirect("/login")
    removeAccessToken()
    removeRefreshToken()

    redirect('/')
}
