import { useNavigate } from 'react-router-dom'

import { passwordCheck, validate } from '../components/user/Input'
import { Form } from '../components/user/Form'
import { Callback, Fallback } from '../utils/utils'
import { Dispatch } from '@reduxjs/toolkit'
import { alertObj, alertSlice, AlertType, DispatcherProps } from '../store/alertStore'
import { connect } from 'react-redux'

const SignUp = (props: DispatcherProps) => {
    const navigate = useNavigate()

    const callback: Callback = (res) => {
        props.setAlert(alertObj("회원가입에 성공하였습니다.", "success"))
        navigate('/login')
    }

    const fallback: Fallback = (response) => {
        const data = response.data

        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".card-body .form-control")
        const logs: any = {}

        inputs.forEach((input: HTMLInputElement) => logs[input.name] = [])

        data.errors.forEach((err: any) => { logs[err.field].push(err.defaultMessage) })

        inputs.forEach(input => validate(input, logs[input.name])) 

        console.log(data)
        setTimeout(() => {}, 10000)
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

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
    return {
        setAlert: (alert: AlertType) => 
            dispatch(alertSlice.actions.setAlert(alert))
    }
}

export default connect(null, mapDispatchToProps)(SignUp)

