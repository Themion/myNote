import { UserForm } from './UserForm'
import { setSession, getSession, removeSession } from '../utils/utils'

export const Login = () => {
    const callback = (res) => {
        setSession(res.headers.authorization)
        window.location.href = '/'
    }

    const fallback = (data) => {
        window.location.href = '/login?error'
    }
    
    if (getSession() !== null) window.location.href = "/user"

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
        fallback={fallback} />
}

export const Logout = () => {
    if (window.location.href = "/user") window.location.href = "/login"
    removeSession()

    window.location.href = '/'
}
