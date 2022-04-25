import styles from './Modal.module.css'

const Header = (props) => {
    return (
        <div className="modal-header">
            <h5 className={`modal-title ${styles['modal-title']}`}>{props.title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    )
}

const Body = (props) => {
    return (
        <div className="modal-body">
            {props.content}
        </div>
    )
}

const Button = (props) => {
    const color = `btn-${props.color ? props.color : "primary"}`
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

const Footer = (props) => {
    // const btn = `btn-${props.btn ? props.btn : "primary"}`

    const btn = []
    let key=1
    props.btn.forEach(item => {
        btn.push(<Button key={key++} color={item.color} text={item.text} onClick={item.onClick}/>)
    })

    return (
        <div className="modal-footer">
            {btn}
        </div>
    )
}

export const Modal = (props) => {
    const width = "modal-" + props.width

    return (
        <div className={`modal fade ${props.style}`} id={props.id} tabIndex="-1" aria-hidden="true">
            <div className={`modal-dialog ${width} ${props.style}`}>
                <div className={`modal-content ${props.style}`}>
                    <Header title={props.title} />
                    <Body content={props.content}/>
                    <Footer btn={props.btn} onClick={props.onClick} />
                </div>
            </div>
        </div>
    )
}

Modal.defaultProps = {
    width: "md",
    style: ""
}
