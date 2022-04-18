import { Input } from './Input'

import styles from './UserForm.module.css'

import { send } from '../utils/utils'

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
    let link = undefined

    // Input을 만들기 위한 값을 모두 넣은 뒤
    props.inputs.forEach(input => input_list.push(
        <Input 
            key={input.for} 
            for={input.for} 
            type={input.type}
            required={input.required} 
            minLength={input.minLength}
            maxLength={input.maxLength}
            onChange={input.onChange}
            classList={input.classList}
            value={input.value} />
    ))

    if (props.link !== undefined) {
        link = <a className="float-end btn btn-outline-primary" href={props.link.to}>{props.link.text}</a>
    }

    // UserForm을 Return
    return (
        <div className="d-flex justify-content-center">
            <div className={`card ` + styles.card}>
                <div className="card-body">
                    {props.alert}
                    {link}
                    <h4 className="card-title mb-4 mt-1">{props.name}</h4>
                    <form onSubmit={onSubmit} className="needs-validation" noValidate>
                        {input_list}
                        <div className="form-floating mb-3">
                            <button className="btn btn-primary btn-block text-white" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

UserForm.defaultProps = {
    method: 'POST'
}
