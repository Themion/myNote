import { UserForm } from './UserForm'
import { setSession, getSession, removeSession, redirect } from '../utils/utils'

export const Login = () => {
    const callback = (res) => {
        setSession(res.headers.authorization)
        redirect('/')
    }

    const fallback = (response) => {
        redirect('/login?error')
    }
    
    if (getSession() !== null) redirect("/user")

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
    if (getSession() === null) redirect("/login")
    removeSession()

    redirect('/')
}
