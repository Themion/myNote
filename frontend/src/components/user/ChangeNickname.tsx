import { useNavigate } from "react-router-dom"
import { refreshAccessToken } from "../../utils/session"
import { Callback, Fallback, reload } from "../../utils/utils"
import { Form } from "./Form"

export const ChangeNickname = () => {
    const navigate = useNavigate()

    const callback: Callback = (res) => {
        refreshAccessToken()
        reload()
    }

    const fallback: Fallback = (response) => {
        console.log(response)
        navigate('/user?error')
    }

    const inputs = [{
        name: "password",
        type: "password"
    }, {
        name: "nickname"
    }]

    return <Form
        name="Change Nickname" 
        inputs={inputs} 
        to={{ url: "/user/nickname", method: "PUT" }}
        callback={callback}
        fallback={fallback}
        validate />
}
