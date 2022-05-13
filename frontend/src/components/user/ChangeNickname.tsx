import { Dispatch } from "@reduxjs/toolkit"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { alertObj, alertSlice, AlertType, DispatcherProps } from "../../store/alertStore"
import { refreshAccessToken } from "../../utils/session"
import { Callback, Fallback, reload } from "../../utils/utils"
import { Form } from "./Form"

const ChangeNickname = (props: DispatcherProps) => {
    const navigate = useNavigate()

    const callback: Callback = (res) => {
        props.setAlert(alertObj())
        refreshAccessToken()
        reload()
    }

    const inputs = [{
        name: "password",
        type: "password"
    }, {
        name: "nickname"
    }]

    const fallback: Fallback = (response) => {
        props.setAlert(alertObj("비밀번호가 잘못되었습니다.", "warning"))
        navigate('/user')
    }

    return <Form
        name="Change Nickname" 
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
