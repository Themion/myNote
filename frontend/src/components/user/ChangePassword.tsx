import { Dispatch } from "@reduxjs/toolkit"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { alertObj, alertSlice, AlertType, DispatcherProps } from "../../store/alertStore"
import { Callback, Fallback } from "../../utils/utils"
import { Form } from "./Form"
import { passwordCheck, validate } from "./Input"

const ChangePassword = (props: DispatcherProps) => {
    const navigate = useNavigate()

    const name = "Change Password"
    const wrong_pw = "비밀번호가 잘못되었습니다."

    const callback: Callback = (res) => {
        props.setAlert(alertObj())
        navigate('/user', {replace: true})
    }

    const fallback: Fallback = (response) => {
        props.setAlert(alertObj("비밀번호가 잘못되었습니다.", "warning"))
        validate(document.querySelector(`#${name.replace(' ', '_')} input[name=current_password]`)!, [wrong_pw])
        navigate('/user')
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
        name={name}
        inputs={inputs} 
        to={{ url: "/user/password", method: "PUT" }}
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

export default connect(null, mapDispatchToProps)(ChangePassword)
