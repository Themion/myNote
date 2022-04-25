import { send } from "../utils/utils"
import { Modal } from "../components/Modal"

import styles from './MemoModal.module.css'

const titleId = (id) => id + '-title'
const memoId = (id) => id + '-memo'
const ifCreateOrElse = (id, ifCreate, ifElse) => {
    return (id === "create") ? ifCreate : ifElse
}

const MemoModalInput = (props) => {
    return (
        <input className={styles['input']} id={titleId(props.id)} placeholder="title" defaultValue={props.title}></input>
    )
}

const MemoModalTextArea = (props) => {
    return (
        <textarea className={styles['textarea']} id={memoId(props.id)} placeholder="memo" defaultValue={props.memo}></textarea>
    )
}

export const MemoModal = (props) => {
    const modalId = "memo-" + props.id

    const onSubmitClick = () => {
        const callback = (res) => {
            window.location.href = "/"
        }

        const fallback = (data) => {
            console.log(data)
        }

        const url = '/memo' + ifCreateOrElse(props.id, '', `/${props.id}`)
        const method = ifCreateOrElse(props.id, 'POST', 'PUT')

        const title = document.getElementById(titleId(modalId)).value
        const memo = document.getElementById(memoId(modalId)).value

        console.log(url)
        console.log(method)

        send(url, method, { title: title, memo: memo }, callback, fallback)
    }

    const onDeleteClick = () => {
        const callback = (res) => {
            window.location.reload()
        }

        const fallback = (data) => {
            console.log(data)
        }

        if (window.confirm("정말로 메모를 삭제하시겠습니까?"))
            send(`/memo/${props.id}`, "DELETE", {}, callback, fallback)
    }

    const deleteBtn = {
        text: "Delete",
        color: "warning",
        onClick: onDeleteClick
    }
    const submitBtn = { onClick: onSubmitClick }

    const btn = ifCreateOrElse(props.id, [submitBtn], [deleteBtn, submitBtn])
    const memo = ifCreateOrElse(props.id, "", props.memo)

    return (
        <Modal
            id={modalId}
            key={modalId}
            width="lg"
            style={styles['memo-modal']}
            title={<MemoModalInput id={modalId} title={props.title} />}
            content={<MemoModalTextArea id={modalId} memo={memo} />}
            btn={btn} />
    )
}

MemoModal.defaultProps = {
    id: "create",
    title: "",
    memo: ""
}
