import { localStorageAuth } from '../utils/utils'

import { UserForm } from './UserForm'

export const Login = () => {
    const callback = (res) => {
        window.localStorage.setItem(localStorageAuth, res.headers.authorization)
        window.onclose = Logout
        
        window.location.href = '/'
    }

    const fallback = (data) => {
        window.location.href = '/login?error'
    }

    return (
        <UserForm 
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
    )
}

export const Logout = () => {
    window.localStorage.removeItem(localStorageAuth)
    window.location.href = '/'
}