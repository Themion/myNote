export type props = {
    alert: string
}

export const Alert = (props: props) => {
    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {props.alert}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
