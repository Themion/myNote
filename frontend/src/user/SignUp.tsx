import { useNavigate } from 'react-router-dom'

import { validate } from '../components/user/Input'
import { UserForm } from '../components/user/Form'

// 비밀번호와 비밀번호 확인의 값을 서로 비교
const passwordCheck = (password: string) => {
    const input_password = document.querySelector('input[name=password]') as HTMLInputElement
    if (password !== input_password.value) 
        return "비밀번호와 비밀번호 확인이 같지 않습니다."
}

export const SignUp = () => {
    const navigate = useNavigate()

    const callback = (res: any) => {
        navigate('/login?signup')
    }

    const fallback = (response: any) => {
        const data = response.data

        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".card-body .form-control")
        const logs: any = {}

        inputs.forEach((input: HTMLInputElement) => logs[input.name] = [])

        data.errors.forEach((err: any) => { logs[err.field].push(err.defaultMessage) })

        inputs.forEach(input => validate(input, logs[input.name])) 
    }
    
    const inputs = [{
        name: "username" 
    }, {
        name: "password",
        type: "password",
        minLength: 6,
        maxLength: 30
    }, {
        name: "password_check",
        type: "password",
        check: passwordCheck
    }, {
        name: "nickname",
        required: false
    }]

    return <UserForm
        name="Sign up"
        to={{ url: '/user', method: 'POST' }}
        link={{ to: "/login", text: "Log in" }}
        inputs={inputs}
        validate
        callback={callback}
        fallback={fallback} />
}
