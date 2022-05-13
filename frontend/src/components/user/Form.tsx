import { FormEventHandler } from 'react'

import { Input, Props as inputProps } from './Input'
import { Callback, Fallback, send, sendTo } from '../../utils/utils'
import { Card, LinkButton } from '../Card'
import { Center } from '../Center'

export interface Props {
    name: string,
    to: sendTo
    link: LinkButton,
    inputs: Partial<inputProps>[],
    callback: Callback,
    fallback: Fallback,
    alert?: string,
    validate: boolean,
}

const defaultProps: Partial<Props> = {
    validate: false
}

export const Form = (props_: Partial<Props>) => {
    // props에 defaultProps 적용
    const props = { ...defaultProps as Props, ...props_ } as Props

    // form의 이름을 id로 변환
    const id = props.name.replace(' ', '_')
    // 표시할 메세지가 있다면 Alert 컴포넌트를 render해 표시

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        // e.target을 HTMLFormElement로 타입캐스팅
        const form: HTMLFormElement = e.target as HTMLFormElement
        // form에 있는 모든 input을 list 형태로 저장
        const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll("input.form-control")
        const data: any = {};

        // 각 input의 값을 data에 저장한 뒤
        inputs.forEach((input: HTMLInputElement) => {
            data[input.name] = (input.required && (input.value !== "")) ? input.value : null
        })

        // form을 검증할 필요가 없거나 검증한 결과 문제가 없다면 백엔드에 요청을 전송
        if (!props.validate || form.checkValidity())
            send(props.to, data, props.callback, props.fallback)
        // 그렇지 않다면 검증 결과를 표시
        else form.classList.add("was-validated")
    }

    const inputs: React.ReactElement[] = []

    // Input을 만들기 위한 값을 모두 넣은 뒤
    props.inputs.forEach((input: Partial<inputProps>) => {
        input.validate = props.validate
        inputs.push(<Input key={input.name} {...input as inputProps} />)
    })

    // UserForm을 render해 return
    return (
        <Center content={
            <Card
                title={props.name}
                link={props.link}
                body={
                    <form id={id} onSubmit={onSubmit} className="needs-validation" noValidate>
                        {inputs}
                        <div className="form-floating mb-3">
                            <button className="btn btn-primary btn-block float-end" type="submit">Submit</button>
                        </div>
                    </form>
                } />
        } />
    )
}

