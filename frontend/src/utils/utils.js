import axios from "axios"

export const class_valid = "is-valid"
export const class_invalid = "is-invalid"

export const baseURL = "https://localhost:8443"
export const localStorageAuth = "authorization"

export const send = (url, method, data, callback, fallback) => {
    const headers = {}

    headers[localStorageAuth] = window.localStorage.getItem(localStorageAuth)

    const config = {
        url: url,
        method: method,
        headers: headers,
        data: data,
        baseURL: baseURL
    }
    
    axios(config).then(res => callback(res)).catch(err => fallback(err.response.data))
}

export const getNickname = () => {
    const JWT = window.localStorage.getItem(localStorageAuth)
    if (JWT === null) return "User"
    
    const payload = JSON.parse(atob(JWT.split(".")[1]))
    
    return payload.nickname
}

export const Center = (props) => {
    return (
        <div className="d-flex justify-content-center mt-4">
            {props.content}
        </div>
    )
}

export const List = (props) => {
    const list = []

    props.contents.forEach(content => {
        list.push(<div key={content.key} className="align-self-start">{content}</div>)
    });
    
    return <div className="d-flex flex-wrap">{list}</div>
}

List.defaultProps = {
    type: "list"
}
