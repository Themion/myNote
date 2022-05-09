import React, { ChangeEventHandler } from "react"
import { useNavigate } from "react-router-dom"

import { send } from "../utils/utils"
import { Modal } from "../components/Modal"

import styles from './MemoModal.module.css'

export type Id = string | number

const titleId = (id: Id) => id + '-title'
const memoId = (id: Id) => id + '-memo'
const footerId = (id: Id) => id + '-footer'
const ifCreateOrElse = (id: Id, ifCreate: any, ifElse: any) => {
    return (id === "create") ? ifCreate : ifElse
}
const memoToString = (memo: React.ReactNode) => typeof(memo) === "string" ? memo : ""

interface IdProps {
    id: Id
}

interface MemoModalInputProps extends IdProps {
    title: string
}

interface MemoModalTextareaProps extends IdProps {
    memo: React.ReactNode
}

interface MemoModalProps extends MemoModalInputProps, MemoModalTextareaProps { }

const MemoModalInput = (props: MemoModalInputProps) => {
    return (
        <input 
            className={styles['input']} 
            id={titleId(props.id)} 
            maxLength={255}
            placeholder="title" 
            defaultValue={props.title}></input>
    )
}

const MemoModalTextArea = (props: MemoModalTextareaProps) => {
    const onChange: ChangeEventHandler = (e) => {
        const target = e.target as HTMLTextAreaElement
        const footer = document.getElementById(footerId(props.id)) as HTMLDivElement
        footer.innerHTML = target.value.length + '/1000'
    }

    const defaultValue = memoToString(props.memo)

    return (
        <textarea 
            className={styles['textarea']} 
            id={memoId(props.id)} 
            maxLength={1000}
            placeholder="memo" 
            onChange={onChange}
            defaultValue={defaultValue}></textarea>
    )
}

const MemoModalFooter = (props: MemoModalTextareaProps) => {
    const memo = memoToString(props.memo)
    return (
        <div id={footerId(props.id)} className="me-auto">
            {memo.length}/1000
        </div>
    )
}

export const MemoModal = (props: MemoModalProps) => {
    const modalId = "memo-" + props.id

    const navigate = useNavigate()

    const onSubmitClick = () => {
        const callback = (res: any) => {
            navigate("/")
        }

        const fallback = (response: any) => {
            console.log(response)
        }

        const to = {
            url: '/memo' + ifCreateOrElse(props.id, '', `/${props.id}`),
            method: ifCreateOrElse(props.id, 'POST', 'PUT')
        }

        const title = document.getElementById(titleId(modalId)) as HTMLInputElement
        const memo = document.getElementById(memoId(modalId)) as HTMLTextAreaElement

        send(to, { title: title.value, memo: memo.value }, callback, fallback)
    }

    const onDeleteClick = () => {
        const callback = (res: any) => {
            window.location.reload()
        }

        const fallback = (response: any) => {
            console.log(response)
        }

        const to = {
            url: `/memo/${props.id}`,
            method: "DELETE"
        }

        if (window.confirm("정말로 메모를 삭제하시겠습니까?"))
            send(to, {}, callback, fallback)
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
            btn={btn}
            footer={<MemoModalFooter id={modalId} memo={memo} />} />
    )
}

MemoModal.defaultProps = {
    id: "create",
    title: "",
    memo: ""
}
