import { useNavigate, useSearchParams } from 'react-router-dom'

import { UserForm } from './UserForm'

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
    const navigate = useNavigate()
    const [search] = useSearchParams()

    if (getAccessToken() !== null) navigate("/")

    const callback = (res: any) => {
        setAccessToken(res.data[accessTokenStorage])
        setRefreshToken(res.data[refreshTokenStorage])
        navigate('/')
    }

    const fallback = (response: any) => {
        navigate('/login?error')
    }

    const alert = search.has("error") ? "아이디 혹은 비밀번호가 잘못되었습니다." : undefined

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
    const navigate = useNavigate()

    if (getAccessToken() === null) navigate("/login")
    removeAccessToken()
    removeRefreshToken()

    navigate('/')

    return (<div></div>)
}
