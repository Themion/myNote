import { localStorageAuth, getNickname } from "../utils/utils"

import { UserForm } from "./UserForm"
import { Center } from "../utils/utils"
import { Card } from "../utils/Card"
import { Modal } from "../utils/Modal"

const passwordOnChange = (password) => {
    if (password !== document.querySelector('input[name=password]').value) 
        return "비밀번호와 비밀번호 확인이 같지 않습니다."
    return ""
}

const ChangePassword = () => {
    const callback = (res) => {
        window.location.href = '/user?passwordChange'
    }

    const fallback = (data) => {
        window.location.href = '/user?passwordChangeError'
    }

    return (
        <UserForm 
            name="Change Password" 
            inputs={[{
                for: "current_password",
                type: "password"
            }, {
                for: "password",
                type: "password",
                minLength: 6,
                maxLength: 30
            }, {
                for: "password_check",
                type: "password",
                onChange: passwordOnChange
            }]} 
            url="/user/password" 
            method="PUT"
            callback={callback}
            fallback={fallback} />
    )
}

const ChangeNickname = () => {
    const callback = (res) => {
        window.location.href = '/user?nicknameChange'
    }

    const fallback = (data) => {
        window.location.href = '/user?nicknameChangeError'
    }

    return (
        <UserForm 
            name="Change Nickname" 
            inputs={[{
                for: "password",
                type: "password"
            }, {
                for: "nickname"
            }]} 
            url="/user/nickname" 
            method="PUT"
            callback={callback}
            fallback={fallback} />
    )
}

const DeleteUser = () => {
    const modalId = "deleteUser"

    return (
        <div>
            <h4 className="card-title mb-4 mt-1">회원 탈퇴</h4>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={'#' + modalId}>회원탈퇴</button>
            <Modal id={modalId}/>
        </div>
    )
}

export const Config = () => {
    if (window.localStorage.getItem(localStorageAuth) === null) {
        window.location.href = "/login"
    }

    return (
        <div>
            <h2>{getNickname()}</h2>
            <hr />
            <Center content={
                <div className="row">
                    <div className="col-sm-4"><Card content={<ChangePassword />} /></div>
                    <div className="col-sm-4"><Card content={<ChangeNickname />} /></div>
                    <div className="col-sm-4"><Card content={<DeleteUser />} /></div>
                </div>
            } />
        </div>
    )
}
