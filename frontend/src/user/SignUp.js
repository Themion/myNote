import { validate } from './Input'
import { UserForm } from './UserForm'
import { getSession } from '../utils/utils'

const passwordOnChange = (password) => {
    if (password !== document.querySelector('input[name=password]').value) 
        return "비밀번호와 비밀번호 확인이 같지 않습니다."
    return ""
}

export const SignUp = () => {
    const callback = (res) => {
        window.location.href = '/login?signup'
    }

    const fallback = (data) => {
        const inputs = document.querySelectorAll(".card-body .form-control")
        const logs = {}

        inputs.forEach(input => logs[input.name] = [])

        data.errors.forEach(err => {
            logs[err.field].push(err.defaultMessage)
        })

        inputs.forEach(input => validate(input, logs[input.name])) 
    }
    
    if (getSession() !== null) window.location.href = "/user"

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
