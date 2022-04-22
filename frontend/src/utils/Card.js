import styles from './Card.module.css'

import { Center } from './utils'

export const Card = (props) => {
    return (
        <div className={`mt-4 mx-1 card ` + styles.card}>
            <div className="card-body">
                {props.content}
            </div>
        </div>
    )
}

export const SingleCard = (props) => {
    return (
        <Center content={
            <Card content={
                props.content
            } />
        } />
    )
}
