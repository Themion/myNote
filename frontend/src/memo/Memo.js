import { Card } from "../utils/Card"
import { send, Center } from "../utils/utils"
import { Modal } from "../utils/Modal"

import styles from './Memo.module.css'

const titleId = (modalId) => modalId + '-title'
const memoId = (modalId) => modalId + '-memo'

const callback = (res) => {
    window.location.reload()
}

const fallback = (data) => {
    console.log(data)
}

const ifCreateOrElse = (memoid, ifCreate, ifElse) => {
    return (memoId === "create") ? ifCreate : ifElse
}

export const Memo = (props) => {
    const bg = props.bg !== undefined ? props.bg : 'light'

    const onClick = () => {
        const url = '/memo' + ifCreateOrElse(props.memoId, '', `/${props.memoId}`)
        const method = ifCreateOrElse(props.memoId, 'POST', 'PUT')

        const title = document.getElementById(titleId(modalId)).value
        const memo = document.getElementById(memoId(modalId)).value

        send(url, method, {title: title, memo: memo}, callback, fallback)
    }

    const modalId = "memo-" + props.memoId
    const modal = <Modal 
        id={modalId} 
        key={modalId} 
        width="lg"
        title={<input id={titleId(modalId)} defaultValue={ifCreateOrElse(props.memoId, "", props.title)}></input>}
        content={<textarea id={memoId(modalId)} defaultValue={ifCreateOrElse(props.memoId, "", props.memo)}></textarea>}
        onClick={onClick}/>

    return (
        <Card 
            style={props.style}
            bg={bg}
            modal={modal}
            title={props.title} 
            body={props.memo} />
    )
}

export const CreateMemo = () => {
    return (
        <Memo
            style={styles['create-memo']}
            bg="secondary"
            memoId="create"
            memo={<Center
                vertical="center"
                style={styles['create-memo']}
                content={
                    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-plus-lg text-white align-middle" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg>
                }
            />} />
    )
}
