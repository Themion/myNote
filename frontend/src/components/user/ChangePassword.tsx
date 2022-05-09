import { useNavigate } from "react-router-dom"
import { Callback, Fallback } from "../../utils/utils"
import { Form } from "./Form"
import { passwordCheck } from "./Input"


export const ChangePassword = () => {
    const navigate = useNavigate()

    const callback: Callback = (res) => {
        navigate('/user?passwordChange', {replace: true})
    }

    const fallback: Fallback = (response) => {
        navigate('/user?error')
    }

    const inputs = [{
        name: "current_password",
        type: "password"
    }, {
        name: "password",
        type: "password",
        minLength: 6,
        maxLength: 30
    }, {
        name: "password_check",
        type: "password",
        check: passwordCheck
    }]

    return <Form
        name="Change Password" 
        inputs={inputs} 
        to={{ url: "/user/password", method: "PUT" }}
        callback={callback}
        fallback={fallback}
        validate />
}
