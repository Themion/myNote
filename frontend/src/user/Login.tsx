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
    if (getAccessToken() !== null) redirect("/")

    const callback = (res: any) => {
        setAccessToken(res.data[accessTokenStorage])
        setRefreshToken(res.data[refreshTokenStorage])
        redirect('/')
    }

    const fallback = (response: any) => {
        redirect('/login?error')
    }

    const param = getParams().has("error")
    const alert = param ? "아이디 혹은 비밀번호가 잘못되었습니다." : undefined

    const inputs=[{
        name: "username"
    }, {
        name: "password",
        type: "password"
    }]
    
    return <UserForm
        name="Log in"
        to={{url:"/login", method:"POST"}}
        link={{ to: "/signup", text: "Sign up" }}
        inputs={inputs}
        callback={callback}
        fallback={fallback}
        alert={alert} />
}

export const Logout = () => {
    if (getAccessToken() === null) redirect("/login")
    removeAccessToken()
    removeRefreshToken()

    redirect('/')

    return (<div></div>)
}
