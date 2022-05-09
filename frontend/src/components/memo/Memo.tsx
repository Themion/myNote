import { Card, CardProps } from "../Card"
import { Center } from "../Center"
import { MemoModal, Id } from "./MemoModal"

export interface Props extends CardProps {
    id: Id
    memo: React.ReactNode
}

const defaultProps: Partial<Props> = {
    id: "create",
    bg: "light",
    memo: (
        <Center content={
            <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-plus-lg text-white align-middle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
            </svg>
        } />
    )
}

export const Memo = (props_: Partial<Props>) => {
    const props = { ...defaultProps, ...props_ } as Props
    const modal = <MemoModal id={props.id} key={"memo-" + props.id} title={props.title} memo={props.memo} />

    props.modalId = modal.key as string
    props.body = props.memo

    return (
        <div>
            <Card { ...props} />
            {modal}
        </div>
    )
}

export const CreateMemo = () => {
    return <Memo bg="secondary" />
}
