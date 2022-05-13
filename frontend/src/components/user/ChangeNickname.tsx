import { Dispatch } from "@reduxjs/toolkit"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { alertObj, alertSlice, AlertType, DispatcherProps } from "../../store/alertStore"
import { refreshAccessToken } from "../../utils/session"
import { Callback, Fallback, reload } from "../../utils/utils"
import { Form } from "./Form"
import { validate } from "./Input"

const ChangeNickname = (props: DispatcherProps) => {
    const navigate = useNavigate()

    const name = "Change Nickname"
    const wrong_pw = "비밀번호가 잘못되었습니다."

    const callback: Callback = (res) => {
        props.setAlert(alertObj())
        refreshAccessToken()
        reload()
    }

    const fallback: Fallback = (response) => {
        props.setAlert(alertObj(wrong_pw, "warning"))
        validate(document.querySelector(`#${name.replace(' ', '_')} input[name=password]`)!, [wrong_pw])
        navigate('/user')
    }

    const inputs = [{
        name: "password",
        type: "password"
    }, {
        name: "nickname"
    }]

    return <Form
        name={name}
        inputs={inputs} 
        to={{ url: "/user/nickname", method: "PUT" }}
        callback={callback}
        fallback={fallback}
        validate />
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
    return {
        setAlert: (alert: AlertType) => 
            dispatch(alertSlice.actions.setAlert(alert))
    }
}

export default connect(null, mapDispatchToProps)(ChangeNickname)
