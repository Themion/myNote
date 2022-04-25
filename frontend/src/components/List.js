export const List = (props) => {
    const list = []

    const alignSelf = "align-self-" + props.alignSelf

    props.contents.forEach(content => {
        list.push(
            <div key={content.key} className={"mt-4 mx-2 " + alignSelf}>{content}</div>
        )
    });
    
    return <div className="d-flex flex-wrap">{list}</div>
}

List.defaultProps = {
    type: "list",
    alignSelf: "start"
}
