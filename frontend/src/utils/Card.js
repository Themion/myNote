import styles from './Card.module.css'

const CardHeader = (props) => {
    return (props.header ? <div className='card-header'>{props.header}</div> : null)
}

const CardBody = (props) => {
    const link = props.link ? <a className="float-end btn btn-outline-primary" href={props.link.to}>{props.link.text}</a> : null
    const title = props.title ? <h5 className='card-title mb-4 mt-1'>{props.title}</h5> : null

    const modal = props.modal !== undefined ? props.modal : null
    const dataBsToggle = modal !== null ? "modal" : undefined
    const dataBsTarget = modal !== null ? ('#' + modal.key) : undefined

    return (
        <div 
            className="card-body"
            data-bs-toggle={dataBsToggle}
            data-bs-target={dataBsTarget}>
            {link}
            {title}
            {props.body}
        </div>
    )
}

export const Card = (props) => {

    const modal = props.modal !== undefined ? props.modal : null

    const classList = ["bg-" + props.bg, styles.card, props.style]
    let className = "card"

    classList.forEach(classItem => {className += ' ' + classItem})

    return (
        <div className={className} >
            <CardHeader header={props.header} />
            <CardBody 
                title={props.title} 
                link={props.link} 
                body={props.body}
                modal={modal} />
            {modal}
        </div>
    )
}

Card.defaultProps = {
    bg: 'light',
}
