import { useNavigate } from 'react-router-dom'

import { passwordCheck, validate } from '../components/user/Input'
import { Form } from '../components/user/Form'
import { Callback, Fallback } from '../utils/utils'

export const SignUp = () => {
    const navigate = useNavigate()

    const callback: Callback = (res) => {
        navigate('/login?signup')
    }

    const fallback: Fallback = (response) => {
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

    return <Form
        name="Sign up"
        to={{ url: '/user', method: 'POST' }}
        link={{ to: "/login", text: "Log in" }}
        inputs={inputs}
        validate
        callback={callback}
        fallback={fallback} />
}
