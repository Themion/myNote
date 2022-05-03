interface Props {
    content: React.ReactNode
}

export const Center = (props: Props) => {
    return (
        <div className="d-flex justify-content-center">
            {props.content}
        </div>
    )
}
