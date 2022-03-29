import axios from 'axios'

import { Input, add_invalid_class, add_valid_class } from './Input'

import styles from './MemberForm.module.css'

import utils from '../utils/utils'

const bcrypt = require('bcryptjs')

const passwordOnChange = (password) => {
    if (password !== document.querySelector('input[name=password]').value) 
        return "비밀번호와 비밀번호 확인이 같지 않습니다. "
    return (password.length < 6) || (password.length > 30) ? "6자 이상 30자 이하여야 합니다. " : ""
}

export const SignUp = () => {
    return (
        <MemberForm name="Sign up" inputs={[{
            for: "username"
        }, {
            for: "password",
            type: "password",
            onChange: passwordOnChange
        }, {
            for: "password_check",
            type: "password",
            classList: ["no_send"],
            onChange: passwordOnChange
        }, {
            for: "nickname",
            required: false
        }, {
            for: "role",
            value: "USER",
            classList: [styles.hidden]
        }]} link={{ to: "/login", text: "Log in" }} 
        url="/member" redirect="/login" />
    )
}

export const LogIn = () => {
    return (
        <MemberForm name="Log in" inputs={[{
            for: "username"
        }, {
            for: "password",
            type: "password",
            onChange: passwordOnChange
        }]} link={{ to: "/signup", text: "Sign up" }} 
        url="/member" />
    )
}

export const MemberForm = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll(".card-body .form-control"), params = {};
        let is_valid = true

        document.querySelector("form.needs-validation").classList.add("was-validated")

        inputs.forEach(input => {
            if (!input.classList.contains("no_send"))
                params[input.name] = (input.name === "password") ? bcrypt.hashSync(input.value, 10) : input.value

            is_valid = is_valid && !input.classList.contains("is-invalid")
        })

        if (is_valid) axios({
            url: props.url,
            method: 'POST',
            params: params,
            baseURL: utils.baseURL
        }, {withCredentials: true})
            .then(res => {
                const data = res.data

                if (data.ok !== undefined) inputs.forEach(input => {
                    if (data[input.name] === undefined || data[input.name] === '') add_valid_class(input)
                    else add_invalid_class(input, data[input.name])
                }) 
                else window.location=props.redirect
            })
    }

    const input_list = []

    // Input을 만들기 위한 값을 모두 넣은 뒤
    props.inputs.forEach(input => {
        input_list.push(<Input 
            key={input.for} 
            for={input.for} 
            type={input.type}
            required={input.required} 
            onChange={input.onChange}
            classList={input.classList}
            value={input.value} />)
    })

    // MemberForm을 Return
    return (
        <div className={`card ` + styles.card}>
            <div className="card-body">
                <a className="float-end btn btn-outline-primary" href={props.link.to}>{props.link.text}</a>
                <h4 className="card-title mb-4 mt-1">{props.name}</h4>
                <form onSubmit={onSubmit} className="needs-validation" noValidate>
                    {input_list}
                    <div className="form-floating mb-3">
                        <button className="btn btn-primary btn-block text-white" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

MemberForm.defaultProps = {
    redirect: '/'
}
