import { Input } from './Input'

import { send } from '../utils/utils'

export const UserForm = (props) => {
    const id = props.name.replace(' ', '_')

    const onSubmit = (e) => {
        e.preventDefault();
        const inputs = document.querySelectorAll(`form#${id} input.form-control`)
        const data = {};
        
        let is_valid = true

        // document.querySelector("form.needs-validation").classList.add("was-validated")

        inputs.forEach(input => {
            data[input.name] = (input.required && (input.value !== "")) ? input.value : null

            is_valid = is_valid && !input.classList.contains("is-invalid")
        })

        if (is_valid)
            send(props.url, props.method, data, props.callback, props.fallback)
    }

    const input_list = []
    const link = props.link ? <a className="float-end btn btn-outline-primary" href={props.link.to}>{props.link.text}</a> : undefined

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

    // UserForm을 Return
    return (
        <div>
            {props.alert}
            {link}
            <h4 className="card-title mb-4 mt-1">{props.name}</h4>
            <form id={id} onSubmit={onSubmit} className="needs-validation" noValidate>
                {input_list}
                <div className="form-floating mb-3">
                    <button className="btn btn-primary btn-block float-end" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

UserForm.defaultProps = {
    method: 'POST'
}
