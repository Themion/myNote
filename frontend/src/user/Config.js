import { localStorageAuth, getNickname } from "../utils/utils"

import { Input, validate } from "./Input"
import { UserForm } from "./UserForm"
import { send } from "../utils/utils"
import { CardList } from "../utils/Card"
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

    const callback = (res) => {
        window.location.href = '/logout'
    }

    const fallback = (data) => {
        const input = document.querySelector(`#${modalId} input`)
        const logs =  []


        data.errors.forEach(err => {
            logs.push(err.defaultMessage)
        })

        validate(input, logs)
    }

    const onClick = () => {
        const input = document.querySelector(`#${modalId} input`)
        send('/user', 'DELETE', {password: input.value}, callback, fallback)
    }

    return (
        <div>
            <h4 className="card-title mb-4 mt-1">회원 탈퇴</h4>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={'#' + modalId}>회원탈퇴</button>
            <Modal 
                id={modalId} 
                title="Delete User" 
                content={<div>
                    <p>회원 탈퇴를 위해선 비밀번호를 입력해주세요.</p>
                    <Input
                        for="password"
                        type="password" />
                </div>}
                btn="danger"
                onClick={onClick} />
        </div>
    )
}

export const Config = () => {
    if (window.localStorage.getItem(localStorageAuth) === null) {
        window.location.href = "/login"
    }

    else return (
        <div>
            <h2>{getNickname()}</h2>
            <hr />
            <CardList contents={[<ChangePassword />, <ChangeNickname />, <DeleteUser />]} />
        </div>
    )
}
