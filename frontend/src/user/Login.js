import { UserForm } from './UserForm'
import { localStorageAuth } from '../utils/utils'

export const Login = () => {
    const callback = (res) => {
        window.localStorage.setItem(localStorageAuth, res.headers.authorization)
        window.onclose = Logout
        
        window.location.href = '/'
    }

    const fallback = (data) => {
        window.location.href = '/login?error'
    }
    
    if (window.localStorage.getItem(localStorageAuth) !== null) {
        window.location.href = "/user"
    }

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
    if (window.localStorage.getItem(localStorageAuth) === null) {
        window.location.href = "/login"
    }

    window.localStorage.removeItem(localStorageAuth)
    window.location.href = '/'
}
