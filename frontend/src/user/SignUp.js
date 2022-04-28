import { validate } from './Input'
import { UserForm } from './UserForm'
import { redirect } from '../utils/utils'
import { getAccessToken } from '../utils/session'

const passwordOnChange = (password) => {
    if (password !== document.querySelector('input[name=password]').value) 
        return "비밀번호와 비밀번호 확인이 같지 않습니다."
    return ""
}

export const SignUp = () => {
    const callback = (res) => {
        redirect('/login?signup')
    }

    const fallback = (response) => {
        const data = response.data

        const inputs = document.querySelectorAll(".card-body .form-control")
        const logs = {}

        inputs.forEach(input => logs[input.name] = [])

        data.errors.forEach(err => {
            logs[err.field].push(err.defaultMessage)
        })

        inputs.forEach(input => validate(input, logs[input.name])) 
    }
    
    if (getAccessToken() !== null) redirect("/user")

    return <UserForm
        name="Sign up"
        inputs={[{
            for: "username"
        }, {
            for: "password",
            type: "password",
            minLength: 6,
            maxLength: 30
        }, {
            for: "password_check",
            type: "password",
            onChange: passwordOnChange
        }, {
            for: "nickname",
            required: false
        }]}
        link={{ to: "/login", text: "Log in" }}
        url="/user"
        callback={callback}
        fallback={fallback} />
}
