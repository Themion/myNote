import styles from './Input.module.css'

import { class_invalid, class_valid } from '../utils/utils'

export const add_invalid_class = (target, logs) => {
    const feedback = target.parentElement.querySelector('.feedback')

    target.classList.add(class_invalid)
    target.classList.remove(class_valid)

    feedback.classList.remove(styles.hidden)
    feedback.innerHTML = ""
    logs.forEach(log => {
        if (log !== "") feedback.innerHTML += `<p>${log}</p>`
    })
}

export const add_valid_class = (target) => {
    const feedback = target.parentElement.querySelector('.feedback')

    target.classList.remove(class_invalid)
    target.classList.add(class_valid)

    feedback.classList.add(styles.hidden)
    feedback.innerHTML = ""
}

export const Input = (props) => {
    // 추후 html의 validation으로 구조 바꿀 것
    const onChange = (target) => {
        const isNotAsciiValue = !/^[a-zA-Z0-9_]*$/.test(target.value) ? "알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다." : ""
        const isRequiredAndEmpty = (props.required === true) && (target.value.length === 0) ? "필수 항목입니다." : "";
        const isCustomOnChangeFalse = props.onChange(target.value)

        // console.log(props.for + ": isNotAsciiValue = " + isNotAsciiValue)
        // console.log(props.for + ": isRequiredAndEmpty = " + isRequiredAndEmpty)
        // console.log(props.for + ": isCustomOnChangeFalse = " + isCustomOnChangeFalse)

        if (isNotAsciiValue !== "" || isRequiredAndEmpty !== "" || isCustomOnChangeFalse !== "") {
            add_invalid_class(target, [isNotAsciiValue, isRequiredAndEmpty, isCustomOnChangeFalse])
        } else {
            add_valid_class(target)
        }
    }
    
    let classList = ""
    if (props.classList !== undefined)
        props.classList.forEach(className => classList += ' ' + className)

    return (
        <div className="form-floating mb-3" name={props.for}>
            <input
                className={"form-control" + classList}
                required={props.required}
                minLength={props.minLength}
                maxLength={props.maxLength}
                name={props.for}
                type={props.type}
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
                {props.for.replace('_', ' ')}
            </label>
            <div className="feedback invalid-feedback"></div>
        </div>
    )
}

Input.defaultProps = {
    type: "text",
    pattern: "^[a-zA-Z0-9_]*$",
    required: true,
    minLength: 6,
    maxLength: 30,
    onChange: (text) => ""
}
