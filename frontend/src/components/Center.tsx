export type props = {
    horizontal: string,
    vertical: string,
    style: string,
    content: React.ReactNode
}

export const Center = (props: props) => {
    // align-items: 세로로 정렬할 위치, justify-content: 가로로 정렬할 위치
    const classList = ["align-items-" + props.vertical, "justify-content-" + props.horizontal, props.style]
    // 정렬을 위해선 d-flex 클래스가 className에 포함되어 있어야 한다
    let className = "d-flex"
    // classList를 className 꼴로 변경
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
