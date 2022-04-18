import styles from './Input.module.css'

import { class_invalid, class_valid } from '../utils/utils'

export const validate = (target, logs) => {
    const feedback = target.parentElement.querySelector('.feedback')
    feedback.innerHTML = ""

    if (logs.length === 0) {
        target.classList.remove(class_invalid)
        target.classList.add(class_valid)

        feedback.classList.add(styles.hidden)
    } else {
        target.classList.add(class_invalid)
        target.classList.remove(class_valid)

        feedback.classList.remove(styles.hidden)

        logs.forEach(log => {
            if (log !== "") feedback.innerHTML += `<p>${log}</p>`
        })
    }
}

export const Input = (props) => {
    // 추후 html의 validation으로 구조 바꿀 것
    const onChange = (target) => {
        const logs = []
        let customOnChange = props.onChange(target.value)

        if ((target.value !== "") && ((target.value.length < props.minLength) || (target.value.length > props.maxLength))) 
            logs.push(props.minLength + "자 이상 " + props.maxLength + "자 이하여야 합니다.")
        if (!props.pattern.test(target.value)) 
            logs.push("알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다.")
        if ((props.required === true) && (target.value.length === 0)) 
            logs.push("필수 항목입니다.")
        if (customOnChange !== "") 
            logs.push(customOnChange)

        validate(target, logs)
    }
    
    let classList = ""
    if (props.classList !== undefined)
        props.classList.forEach(className => classList += ' ' + className)

    return (
        <div className="form-floating mb-3" name={props.for}>
            <input
                className={"form-control" + classList}
                name={props.for}
                type={props.type}
                required={props.required}
                minLength={props.minLength}
                maxLength={props.maxLength}
                pattern={props.pattern}
                placeholder=' '
                value={props.value}
                onChange={(e) => {
                    onChange(e.target)

                    if (e.target.name === "password") {
                        const password_check = document.querySelector("form input[name=password_check]")
                        if (password_check !== null && password_check.value !== '') onChange(password_check)
                    }
                }} />
            <label htmlFor={props.for} className="form-label">
                {props.for.replace('_', ' ') + (props.required ? "" : " (Optional)")}
            </label>
            <div className="feedback invalid-feedback"></div>
        </div>
    )
}

Input.defaultProps = {
    type: "text",
    pattern: /^[a-zA-Z0-9_]*$/,
    required: true,
    onChange: (text) => ""
}
