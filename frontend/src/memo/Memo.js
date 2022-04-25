import { Card } from "../components/Card"
import { Center } from "../components/Center"
import { MemoModal } from "./MemoModal"

import styles from './Memo.module.css'

export const Memo = (props) => {
    return (
        <Card 
            style={props.style}
            bg={props.bg}
            modal={<MemoModal id={props.memoId} key={"memo-" + props.memoId} title={props.title} memo={props.memo} />}
            title={props.title} 
            body={props.memo} />
    )
}

export const CreateMemo = () => {
    return <Memo style={styles['create-memo']} bg="secondary" />
}

Memo.defaultProps = {
    memoId: "create",
    bg: "light",
    memo: <Center
        vertical="center"
        style={styles['max-height']}
        content={
            <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-plus-lg text-white align-middle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
            </svg>
        }
    />
}
