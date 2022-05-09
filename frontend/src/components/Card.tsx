import { Link } from 'react-router-dom'
import styles from './Card.module.css'

// 링크 버튼을 만들기 위한 object
export interface LinkButton {
    to: string,
    text: string
}

interface BodyProps {
    link?: LinkButton,
    title: string,
    body: React.ReactNode,
    style?: string
}

export interface CardProps extends BodyProps {
    header?: string,
    modalId?: string,
    bg: string
}

/* // Card 컴포넌트의 header
const CardHeader = (props) => {
    return (props.header ? <div className='card-header'>{props.header}</div> : null)
} */

// Card 컴포넌트의 body
const CardBody = (props: BodyProps) => {
    // 다른 페이지로의 링크 버튼
    const link = props.link ? <Link to={props.link.to}><button className="float-end btn btn-outline-primary">{props.link.text}</button></Link> : null
    // const link = props.link ? <a className="float-end btn btn-outline-primary" href={props.link.to}>{props.link.text}</a> : null
    // Card의 타이틀
    const title = props.title ? <h5 className='card-title mb-4 mt-1'>{props.title}</h5> : null
    // body에 표시할 내용이 object라면 그대로 출력하고 아니라면 text-truncate 적용
    const body = typeof(props.body) === 'object' ? props.body : <p className="mb-0 text-truncate">{props.body}</p>

    return (
        <div className="card-body">
            {link}
            {title}
            {body}
        </div>
    )
}

export const Card = (props: CardProps) => {
    // card에 지정할 클래스의 배열
    const classList = ["bg-" + props.bg, styles.card]
    // card에 실제로 들어갈 클래스
    let className = "card"
    // 클래스의 배열을 className 형식으로 변경
    classList.forEach(classItem => { className += ' ' + classItem })

    // modal이 존재한다면 card를 눌렀을 때 열 modal을 지정
    const dataBsToggle = props.modalId ? "modal" : undefined
    const dataBsTarget = props.modalId ? ('#' + props.modalId) : undefined

    return (
        <div 
            className={className}
            data-bs-toggle={dataBsToggle}
            data-bs-target={dataBsTarget} >
            <CardBody {...props} />
        </div>
    )
}

Card.defaultProps = {
    bg: 'light',
}
