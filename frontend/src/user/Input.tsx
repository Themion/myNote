import React, { ChangeEventHandler } from 'react'
import styles from './Input.module.css'

const is_valid = "is-valid"
const is_invalid = "is-invalid"
const valid_feedback = "valid-feedback"
const invalid_feedback = "invalid-feedback"

export interface Props {
    name: string
    type: string
    minLength: number
    maxLength: number
    pattern: string
    required: boolean
    validate: boolean
    check: Function
}

const defaultProps: Partial<Props> = {
    type: "text",
    minLength: 0,
    maxLength: 255,
    pattern: "^[a-zA-Z_][a-zA-Z0-9_]*$",
    required: true,
    validate: false,
    check: (text: string) => undefined
}

export const validate = (target: HTMLElement, logs: string[]) => {
    const feedback: HTMLElement = target.parentNode!.querySelector('.feedback')!
    feedback.innerHTML = ""

    // 표시할 메세지가 없다면
    if (logs.length === 0) {
        // input의 클래스에 valid함을 추가
        target.classList.add(is_valid)
        target.classList.remove(is_invalid)
        // feedback의 클래스에 valid함을 추가
        feedback.classList.add(valid_feedback)
        feedback.classList.remove(invalid_feedback)
    } else {
        // input의 클래스에 invalid함을 추가
        target.classList.remove(is_valid)
        target.classList.add(is_invalid)
        // feedback의 클래스에 invalid함을 추가
        feedback.classList.remove(valid_feedback)
        feedback.classList.add(invalid_feedback)

        // 각 log를 p 태그에 담아 출력
        logs.forEach(log => {
            if (log !== "") feedback.innerHTML += `<p>${log}</p>`
        })
    }
}

export const Input = (props: Props) => {
    props = { ...defaultProps, ...props }

    // 추후 html의 validation으로 구조 바꿀 것
    const onChange: ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {        
        // validate하지 않아도 되는 input이라면 과정 넘기기
        if (!props.validate) return
        
        // 현재 input에 표시할 log의 리스트
        const logs: string[] = []
        
        // form에서 따로 지정한 check가 있다면 input의 값을 해당 함수로 검증
        let check = props.check(e.target.value)
        
        // 현재 input의 값을 검증
        if ((e.target.value !== "") && ((e.target.value.length < props.minLength) || (e.target.value.length > props.maxLength))) 
            logs.push(`${props.minLength}자 이상 ${props.maxLength}자 이하여야 합니다.`)
        if (!new RegExp(props.pattern).test(e.target.value)) 
            logs.push("알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다.")
        if ((props.required === true) && (e.target.value.length === 0)) 
            logs.push("필수 항목입니다.")
        if (check) 
            logs.push(check)
        
        // 검증해서 얻은 log를 input에 표시
        validate(e.target, logs)
    }

    return (
        <div className="form-floating mb-3">
            <input
                className="form-control"
                placeholder=' '
                onChange={onChange}
                {...props} />
            <label htmlFor={props.name} className="form-label">
                {props.name.replace('_', ' ') + (props.required ? "" : " (Optional)")}
            </label>
            <div className={`feedback ${styles.hidden}`}></div>
        </div>
    )
}
