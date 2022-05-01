export const Center = (props) => {
    const classList = ["align-items-" + props.vertical, "justify-content-" + props.horizontal, props.style]
    let className = "d-flex"

    classList.forEach(classItem => {className += ' ' + classItem})
    
    return (
        <div className={className}>
            {props.content}
        </div>
    )
}

Center.defaultProps = {
    horizontal: "center",
    vertical: "start",
    style: ""
}
