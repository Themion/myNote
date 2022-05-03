import { MouseEventHandler } from 'react'
import styles from './Modal.module.css'

interface HeaderProps {
    title?: React.ReactNode
}

interface BodyProps {
    content: React.ReactNode
}

interface clickable {
    onClick: MouseEventHandler
}

interface ButtonProps extends clickable {
    color: string,
    text: string,
}

interface FooterProps extends clickable {
    footer: React.ReactNode,
    btn: Partial<ButtonProps>[],
}

export interface ModalProps extends HeaderProps, BodyProps, ButtonProps, FooterProps {
    width: string,
    style: string,
    id: string
}

const buttonProps: Partial<ButtonProps> = {
    color: "primary",
    text: "Submit"
}

const modalProps: Partial<ModalProps> = {
    width: "md",
    style: ""
}

// modal의 header에 title과 닫기 버튼을 차례로 render
const Header = (props: HeaderProps) => {
    return (
        <div className="modal-header">
            <h5 className={`modal-title ${styles['modal-title']}`}>{props.title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    )
}

// modal의 body를 render
const Body = (props: BodyProps) => {
    return (
        <div className="modal-body">
            {props.content}
        </div>
    )
}

// modal에 사용될 각 버튼
const Button = (props: ButtonProps) => {
    props = { ...buttonProps as ButtonProps, ...props }
    
    return (
        <button
            type="button"
            className={`btn btn-${props.color}`}
            onClick={props.onClick}>{props.text}</button>
    )
}

// modal의 footer
const Footer = (props_: Partial<FooterProps>) => {
    const props = props_ as FooterProps
    // 각 버튼의 key
    let key = 1

    // modal의 각 버튼을 list에 담아 render
    const btn: React.ReactElement[] = []
    props.btn.forEach((item: Partial<ButtonProps>) => {
        const btn_item = { ...buttonProps as ButtonProps, ...item as ButtonProps}
        btn.push(
            <Button 
                key={key++} 
                {...btn_item} />
        )
    })

    return (
        <div className="modal-footer">
            {props.footer}
            {btn}
        </div>
    )
}

export const Modal = (props_: Partial<ModalProps>) => {
    const props = { ...modalProps, ...props_ } as ModalProps

    const width = `modal-${props.width}`

    return (
        <div className={`modal fade ${props.style}`} id={props.id} tabIndex={-1} aria-hidden="true">
            <div className={`modal-dialog ${width} ${props.style}`}>
                <div className={`modal-content ${props.style}`}>
                    <Header {...props} />
                    <Body {...props} />
                    <Footer {...props} />
                </div>
            </div>
        </div>
    )
}