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

export const CardList = (props) => {
    const cardList = [];
    props.contents.forEach(content => {
        cardList.push(
            <div className="col">
                <Card key={content.key} content={content} />
            </div>
        )
    });

    return (
        <Center content={
            <div className='row'>
                {cardList}
            </div>
        } />
    )
}