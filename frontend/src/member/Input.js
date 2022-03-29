import styles from './Input.module.css'

import utils from '../utils/utils'

export const add_invalid_class = (target, text) => {
    const feedback = target.parentElement.querySelector('.feedback')

    target.classList.add(utils.class_invalid)
    target.classList.remove(utils.class_valid)

    feedback.classList.remove(styles.hidden)
    feedback.innerHTML = text
}

export const add_valid_class = (target) => {
    const feedback = target.parentElement.querySelector('.feedback')

    target.classList.remove(utils.class_invalid)
    target.classList.add(utils.class_valid)

    feedback.classList.add(styles.hidden)
    feedback.innerHTML = ""
}

export const Input = (props) => {
    const onChange = (target) => {
        const div = document.querySelector(`div.form-floating[name=${target.name}]`)
        const invalid = div.querySelector('div.invalid-feedback')

        const isNotAsciiValue = !/^[a-zA-Z0-9_]*$/.test(target.value) ? "알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다. " : ""
        const isRequiredAndEmpty = (props.required === true) && (target.value.length === 0) ? "필수 항목입니다. " : "";
        const isCustomOnChangeFalse = (props.onChange !== undefined) ? props.onChange(target.value) : ""

        // console.log(props.for + ": isNotAsciiValue = " + isNotAsciiValue)
        // console.log(props.for + ": isRequiredAndEmpty = " + isRequiredAndEmpty)
        // console.log(props.for + ": isCustomOnChangeFalse = " + isCustomOnChangeFalse)

        if (isNotAsciiValue !== "" || isRequiredAndEmpty !== "" || isCustomOnChangeFalse !== "") {
            target.classList.add(utils.class_invalid)
            target.classList.remove(utils.class_valid)

            invalid.classList.remove(styles.hidden)
            
            invalid.innerHTML = isNotAsciiValue + isRequiredAndEmpty + isCustomOnChangeFalse
        } else {
            target.classList.add(utils.class_valid)
            target.classList.remove(utils.class_invalid)

            invalid.classList.add(styles.hidden)
            invalid.innerHTML = ""
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
                name={props.for}
                type={props.type !== undefined ? props.type : "text"}
                placeholder=' '
                value={props.value}
                onChange={(e) => {
                    onChange(e.target)

                    if (e.target.name === "password") {
                        const password_check = document.querySelector("form input[name=password_check]")
                        if (password_check !== null && password_check.value !== '') onChange(password_check)
                    }
                }}/>
            <label htmlFor={props.for} className="form-label">
                {props.for.replace('_', ' ')}
            </label>
            <div className="feedback invalid-feedback"></div>
        </div>
    )
}
