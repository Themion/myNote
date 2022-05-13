import { Dispatch } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Form } from '../components/user/Form'
import { alertObj, alertSlice, AlertType, DispatcherProps } from '../store/alertStore'

import { 
    accessTokenStorage, 
    refreshTokenStorage,
    setAccessToken,
    setRefreshToken
} from '../utils/session'
import { Callback, Fallback } from '../utils/utils'

const Login = (props: DispatcherProps) => {
    const navigate = useNavigate()

    const callback: Callback = (res) => {
        props.setAlert(alertObj())
        setAccessToken(res.data[accessTokenStorage])
        setRefreshToken(res.data[refreshTokenStorage])
        navigate('/')
    }

    const fallback: Fallback = (response) => {
        props.setAlert(alertObj("아이디 혹은 비밀번호가 잘못되었습니다.", "warning"))
        navigate('/login')
    }

    const inputs=[{
        name: "username"
    }, {
        name: "password",
        type: "password"
    }]
    
    return <Form
        name="Log in"
        to={{url:"/login", method:"POST"}}
        link={{ to: "/signup", text: "Sign up" }}
        inputs={inputs}
        callback={callback}
        fallback={fallback} />
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
    return {
        setAlert: (alert: AlertType) => 
            dispatch(alertSlice.actions.setAlert(alert))
    }
}

export default connect(null, mapDispatchToProps)(Login)
