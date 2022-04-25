import { send } from "../utils/utils"
import { Modal } from "../utils/Modal"

import styles from './MemoModal.module.css'

const titleId = (id) => id + '-title'
const memoId = (id) => id + '-memo'
const ifCreateOrElse = (id, ifCreate, ifElse) => {
    return (id === "create") ? ifCreate : ifElse
}

const MemoModalInput = (props) => {
    const defaultValue = ifCreateOrElse(props.id, "", props.title)
    return (
        <input className={styles['input']} id={titleId(props.id)} defaultValue={defaultValue}></input>
    )
}

const MemoModalTextArea = (props) => {
    const defaultValue = ifCreateOrElse(props.id, "", props.memo)
    console.log(defaultValue)
    return (
        <textarea className={styles['textarea']} id={memoId(props.id)} defaultValue={defaultValue}></textarea>
    )
}

export const MemoModal = (props) => {
    const modalId = "memo-" + props.id

    const callback = (res) => {
        window.location.reload()
    }
    
    const fallback = (data) => {
        console.log(data)
    }

    const onClick = () => {
        const url = '/memo' + ifCreateOrElse(props.id, '', `/${props.id}`)
        const method = ifCreateOrElse(props.id, 'POST', 'PUT')

        const title = document.getElementById(titleId(modalId)).value
        const memo = document.getElementById(memoId(modalId)).value

        send(url, method, { title: title, memo: memo }, callback, fallback)
    }

    return (
        <Modal
            id={modalId}
            key={modalId}
            width="lg"
            style={styles['memo-modal']}
            title={<MemoModalInput id={modalId} title={props.title}/>}
            content={<MemoModalTextArea id={modalId} memo={props.memo}/>}
            onClick={onClick} />
    )
}
