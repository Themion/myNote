import React from "react"

type props = {
    alignSelf: string
    contents: React.ReactElement[]
}

export const List = (props: props) => {
    // List의 각 요소의 align-self 요소
    const alignSelf = "align-self-" + props.alignSelf
    
    const list: React.ReactElement[] = []
    // props.contents를 list에 각각 push
    props.contents.forEach((content: React.ReactElement) => {
        list.push(
            <div key={content.key} className={`mt-4 mx-2 ${alignSelf}`}>{content}</div>
        )
    });
    
    return <div className="d-flex flex-wrap">{list}</div>
}

List.defaultProps = {
    alignSelf: "start"
}
