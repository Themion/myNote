import styles from './Card.module.css'

const CardHeader = (props) => {
    return (props.header ? <div className='card-header'>{props.header}</div> : null)
}

const CardBody = (props) => {
    const link = props.link ? <a className="float-end btn btn-outline-primary" href={props.link.to}>{props.link.text}</a> : null
    return (
        <div className="card-body">
            {link}
            <h5 className='card-title mb-4 mt-1'>{props.title}</h5>
            <p className='card-paragraph'>{props.body}</p>
        </div>
    )
}

export const Card = (props) => {
    const bg = " bg-" + props.bg
    return (
        <div className={`card` + bg + ' ' + styles.card}>
            <CardHeader header={props.header} />
            <CardBody title={props.title} link={props.link} body={props.body} />
        </div>
    )
}

Card.defaultProps = {
    bg: 'light'
}
