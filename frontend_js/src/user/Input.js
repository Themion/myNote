import styles from './Input.module.css'

const is_valid = "is-valid"
const is_invalid = "is-invalid"
const valid_feedback = "valid-feedback"
const invalid_feedback = "invalid-feedback"

export const validate = (target, logs) => {
    const feedback = target.parentElement.querySelector('.feedback')
    feedback.innerHTML = ""

    if (logs.length === 0) {
        target.classList.add(is_valid)
        target.classList.remove(is_invalid)

        feedback.classList.remove(invalid_feedback)
        feedback.classList.add(valid_feedback)
    } else {
        target.classList.add(is_invalid)
        target.classList.remove(is_valid)

        feedback.classList.add(invalid_feedback)
        feedback.classList.remove(valid_feedback)

        logs.forEach(log => {
            if (log !== "") feedback.innerHTML += `<p>${log}</p>`
        })
    }
}

export const Input = (props) => {
    // 추후 html의 validation으로 구조 바꿀 것
    const onChange = (e) => {
        if (!props.validate) return

        const logs = []

        let customOnChange = props.onChange(e.target.value)

        if ((e.target.value !== "") && ((e.target.value.length < props.minLength) || (e.target.value.length > props.maxLength))) 
            logs.push(props.minLength + "자 이상 " + props.maxLength + "자 이하여야 합니다.")
        if (!new RegExp(props.pattern).test(e.target.value)) 
            logs.push("알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다.")
        if ((props.required === true) && (e.target.value.length === 0)) 
            logs.push("필수 항목입니다.")
        if (customOnChange !== "") 
            logs.push(customOnChange)

        validate(e.target, logs)
    }
    
    let classList = "form-control "
    if (props.classList !== undefined)
        props.classList.forEach(className => classList += ' ' + className)

    return (
        <div className="form-floating mb-3" name={props.for}>
            <input
                className={classList}
                name={props.for}
                type={props.type}
                required={props.required}
                minLength={props.minLength}
                maxLength={props.maxLength}
                pattern={props.pattern}
                placeholder=' '
                value={props.value}
                onChange={onChange} />
            <label htmlFor={props.for} className="form-label">
                {props.for.replace('_', ' ') + (props.required ? "" : " (Optional)")}
            </label>
            <div className={`feedback ${styles.hidden}`}></div>
        </div>
    )
}

Input.defaultProps = {
    type: "text",
    minLength: 0,
    maxLength: 255,
    pattern: "^[a-zA-Z_][a-zA-Z0-9_]*$",
    required: true,
    validate: false, 
    onChange: (text) => ""
}
