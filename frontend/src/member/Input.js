import styles from './Input.module.css'

import utils from '../utils/utils'

const Input = (props) => {
    const onChange = (e) => {
        const div = document.querySelector(`div.form-floating[name=${props.for}]`)
        const invalid = div.querySelector('div.invalid-feedback')

        const isNotAsciiValue = !/^[a-zA-Z0-9_]*$/.test(e.target.value) ? "알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다." : ""
        const isRequiredAndEmpty = (props.required === true) && (e.target.value.length === 0) ? "필수 항목입니다." : "";
        const isCustomOnChangeFalse = (props.onChange !== undefined) ? props.onChange(e.target.value) : ""

        if (isNotAsciiValue !== "" || isRequiredAndEmpty !== "" || isCustomOnChangeFalse !== "") {
            e.target.classList.add(utils.class_invalid)
            e.target.classList.remove(utils.class_valid)

            invalid.classList.remove(styles.hidden)
            
            invalid.innerHTML = isNotAsciiValue
            if (invalid.innerHTML !== "") invalid.innerHTML += '\n'
            invalid.innerHTML += isRequiredAndEmpty
            if (invalid.innerHTML !== "") invalid.innerHTML += '\n'
            invalid.innerHTML += isCustomOnChangeFalse
        } else {
            e.target.classList.add(utils.class_valid)
            e.target.classList.remove(utils.class_invalid)

            invalid.classList.add(styles.hidden)
            invalid.innerHTML = ""
        }
    }

    return (
        <div className="form-floating mb-3" name={props.for}>
            <input
                className="form-control"
                required={props.required}
                name={props.for}
                type={props.for.includes("password") ? "password" : "text"}
                placeholder=" " 
                onChange={onChange}/>
            <label htmlFor={props.for} className="form-label">
                {props.for.replace('_', ' ')}
            </label>
            <div className="feedback invalid-feedback"></div>
        </div>
    )
}

export default Input
