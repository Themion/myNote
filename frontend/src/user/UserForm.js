import { Input, add_invalid_class, add_valid_class } from './Input'

import styles from './UserForm.module.css'

import { localStorageAuth, send } from '../utils/utils'

const passwordOnChange = (password) => {
    if (password !== document.querySelector('input[name=password]').value) 
        return "비밀번호와 비밀번호 확인이 같지 않습니다. "
    return (password.length < 6) || (password.length > 30) ? "6자 이상 30자 이하여야 합니다. " : ""
}

export const SignUp = () => {
    const onSubmit = (res) => {
        window.location.href = '/login'
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
            onSubmit={onSubmit} />
    )
}

export const Login = () => {
    const onSubmit = (res) => {
        window.localStorage.setItem(localStorageAuth, res.headers.authorization)
        window.onclose = Logout
        
        window.location.href = '/'
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
            onSubmit={onSubmit} />
    )
}

export const Logout = () => {
    window.localStorage.removeItem(localStorageAuth)
    window.location.href = '/'
}

export const UserForm = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll(".card-body .form-control"), data = {};
        let is_valid = true

        // document.querySelector("form.needs-validation").classList.add("was-validated")

        inputs.forEach(input => {
            data[input.name] = input.value

            is_valid = is_valid && !input.classList.contains("is-invalid")
        })

        const callback = (res) => {
            const data = res.data
        
            if (data.ok !== undefined) inputs.forEach(input => {
                if (data[input.name] === undefined || data[input.name] === '') add_valid_class(input)
                else add_invalid_class(input, data[input.name])
            })
            else props.onSubmit(res)
        }

        if (is_valid) send(props.url, props.method, data, callback)
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

    // UserForm을 Return
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

UserForm.defaultProps = {
    method: 'POST'
}
