import { Dispatch } from "@reduxjs/toolkit"
import { connect } from "react-redux"
import { alertObj, alertSlice, AlertType, DispatcherProps } from "../store/alertStore"

interface Props extends DispatcherProps {
    alert: AlertType
}

const Alert = (props: Props) => {
    const alert = props.alert

    const onClick = () => { props.setAlert(alertObj()) }

    return alert.msg === "" ? <div></div> : (
        <div 
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert">
            {alert.msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClick}></button>
        </div>
    )
}

const mapStateToProps = (state: AlertType, props: any) => {
    return { alert: state }
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
    return {
        setAlert: (alert: AlertType) => 
            dispatch(alertSlice.actions.setAlert(alert))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)
