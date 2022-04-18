import { Input, validate } from './Input'

import styles from './UserForm.module.css'

import { localStorageAuth, send } from '../utils/utils'

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

    return (
        <UserForm 
            name="Sign up" 
            inputs={[{
                for: "username"
            }, {
                for: "password",
                type: "password",
                onChange: passwordOnChange
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
    )
}

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
                type: "password",
                onChange: passwordOnChange
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

export const UserForm = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll("form .form-control")
        const data = {};
        
        let is_valid = true

        // document.querySelector("form.needs-validation").classList.add("was-validated")

        inputs.forEach(input => {
            data[input.name] = input.value

            is_valid = is_valid && !input.classList.contains("is-invalid")
        })

        if (is_valid)
            send(props.url, props.method, data, props.callback, props.fallback)
    }

    const input_list = []

    // Input을 만들기 위한 값을 모두 넣은 뒤
    props.inputs.forEach(input => input_list.push(
        <Input 
            key={input.for} 
            for={input.for} 
            type={input.type}
            required={input.required} 
            onChange={input.onChange}
            classList={input.classList}
            value={input.value} />
    ))

    // UserForm을 Return
    return (
        <div className={`card ` + styles.card}>
            <div className="card-body">
                {props.alert}
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

UserForm.defaultProps = {
    method: 'POST'
}
