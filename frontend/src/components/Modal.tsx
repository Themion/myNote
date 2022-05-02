import { MouseEventHandler } from 'react'
import styles from './Modal.module.css'

type headerProps = {
    title?: string
}

type bodyProps = {
    content: React.ReactNode
}

type clickable = {
    onClick: MouseEventHandler
}

interface buttonProps extends clickable {
    color: string,
    text: string,
}

interface footerProps extends clickable {
    footer: React.ReactNode,
    btn: buttonProps[],
}

export interface modalProps extends headerProps, bodyProps, buttonProps, footerProps {
    width: string,
    style: string,
    id: string
}

// modal의 header에 title과 닫기 버튼을 차례로 render
const Header = (props: headerProps) => {
    return (
        <div className="modal-header">
            <h5 className={`modal-title ${styles['modal-title']}`}>{props.title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    )
}

// modal의 body를 render
const Body = (props: bodyProps) => {
    return (
        <div className="modal-body">
            {props.content}
        </div>
    )
}

// modal에 사용될 각 버튼
const Button = (props: buttonProps) => {
    const color = `btn-${props.color}`
    return (
        <button
            type="button"
            className={`btn ${color}`}
            onClick={props.onClick}>{props.text}</button>
    )
}

Button.defaultProps = {
    color: "primary",
    text: "Submit"
}

// modal의 footer
const Footer = (props: footerProps) => {
    // 각 버튼의 key
    let key = 1

    // modal의 각 버튼을 list에 담아 render
    const btn: React.ReactElement[] = []
    props.btn.forEach((item: buttonProps) => {
        btn.push(<Button key={key++} color={item.color} text={item.text} onClick={item.onClick}/>)
    })

    return (
        <div className="modal-footer">
            {props.footer}
            {btn}
        </div>
    )
}

export const Modal = (props: modalProps) => {
    const width = `modal-${props.width}`

    return (
        <div className={`modal fade ${props.style}`} id={props.id} tabIndex={-1} aria-hidden="true">
            <div className={`modal-dialog ${width} ${props.style}`}>
                <div className={`modal-content ${props.style}`}>
                    <Header title={props.title} />
                    <Body content={props.content}/>
                    <Footer btn={props.btn} onClick={props.onClick} footer={props.footer} />
                </div>
            </div>
        </div>
    )
}

Modal.defaultProps = {
    width: "md",
    style: ""
}
