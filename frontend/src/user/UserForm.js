import { Input } from './Input'
import { send } from '../utils/utils'
import { Card } from '../components/Card'
import { Center } from '../components/Center'

export const UserForm = (props) => {
    const id = props.name.replace(' ', '_')

    const onSubmit = (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll(`form#${id} input.form-control`)
        const data = {};
        const form = document.querySelector(`form#${id}`)

        inputs.forEach(input => {
            data[input.name] = (input.required && (input.value !== "")) ? input.value : null
            console.log(input.onchange)
        })

        if (!props.validate || form.checkValidity())
            send(props.url, props.method, data, props.callback, props.fallback)
        else form.classList.add("was-validated")
    }

    const input_list = []

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
            value={input.value}
            validate={props.validate} />
    ))

    // UserForm을 Return
    return (
        <Center content={
            <Card
            title={props.name}
            link={props.link}
            body={
                <form id={id} onSubmit={onSubmit} className="needs-validation" noValidate>
                    {input_list}
                    <div className="form-floating mb-3">
                        <button className="btn btn-primary btn-block float-end" type="submit">Submit</button>
                    </div>
                </form>
            } />
        } />
    )
}

UserForm.defaultProps = {
    validate: false
}
