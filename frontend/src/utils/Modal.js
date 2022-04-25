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
        <div className={`modal-body ${props.style}`}>
            {props.content}
        </div>
    )
}

const Footer = (props) => {
    const btn = `btn-${props.btn ? props.btn : "primary"}`

    return (
        <div className="modal-footer">
            <button 
                type="button" 
                className={`btn ${btn}`}
                onClick={props.onClick}>Submit</button>
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
