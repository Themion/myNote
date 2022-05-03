interface Props {
    alert: string
}

export const Alert = (props: Props) => {
    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {props.alert}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
