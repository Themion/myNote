import { useNavigate, useSearchParams } from 'react-router-dom'

import { UserForm } from '../components/user/Form'

import { 
    accessTokenStorage, 
    refreshTokenStorage,
    setAccessToken,
    setRefreshToken,
    removeAccessToken,
    removeRefreshToken
} from '../utils/session'
import { Callback, Fallback } from '../utils/utils'

export const Login = () => {
    const navigate = useNavigate()
    const [search] = useSearchParams()

    const callback: Callback = (res) => {
        setAccessToken(res.data[accessTokenStorage])
        setRefreshToken(res.data[refreshTokenStorage])
        navigate('/')
    }

    const fallback: Fallback = (response) => {
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

    removeAccessToken()
    removeRefreshToken()

    navigate('/')

    return (<div></div>)
}
