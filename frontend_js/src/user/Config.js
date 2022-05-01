import { send, redirect, getParams } from "../utils/utils"
import { getAccessToken, getNickname, requestAccessToken } from "../utils/session"

import { Input } from "./Input"
import { UserForm } from "./UserForm"
import { Alert } from "../components/Alert"
import { Card } from "../components/Card"
import { Center } from "../components/Center"
import { List } from "../components/List"
import { Modal } from "../components/Modal"

const passwordOnChange = (password) => {
    if (password !== document.querySelector('input[name=password]').value) 
        return "비밀번호와 비밀번호 확인이 같지 않습니다."
    return ""
}

const ChangePassword = () => {
    const callback = (res) => {
        redirect('/user?passwordChange')
    }

    const fallback = (response) => {
        redirect('/user?error')
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
            fallback={fallback}
            validate />
    )
}

const ChangeNickname = () => {
    const callback = (res) => {
        requestAccessToken()
        redirect('/user?nicknameChange')
    }

    const fallback = (response) => {
        redirect('/user?error')
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
            fallback={fallback}
            validate />
    )
}

const DeleteUser = () => {
    const modalId = "deleteUser"

    const onClick = () => {
        const callback = (res) => {
            redirect('/logout')
        }
    
        const fallback = (response) => {
            redirect('/user?error')
        }

        if (window.confirm("정말로 탈퇴하시겠습니까?")) {
            const input = document.querySelector(`#${modalId} input`)
            send('/user', 'DELETE', {password: input.value}, callback, fallback)
        }
    }

    const body = 
        <div>
            <button 
                type="button" 
                className="btn btn-danger" 
                data-bs-toggle="modal" 
                data-bs-target={'#' + modalId}>
                회원탈퇴
            </button>
            <Modal
                id={modalId}
                title="Delete User"
                content={
                    <div>
                        <p>회원 탈퇴를 위해선 비밀번호를 입력해주세요.</p>
                        <Input for="password" type="password" />
                    </div>
                }
                btn={[{color: "danger", onClick: onClick}]} />
        </div>

    return <Card title="Delete User" body={body} />
}

export const Config = () => {
    if (getAccessToken() === null) redirect("/login")

    const param = getParams().has("error")
    const alert = param ? <Alert alert="잘못된 비밀번호입니다." /> : null

    return (
        <div>
            {alert}
            <h2>{getNickname()}</h2>
            <hr />
            <Center content={<List contents={[
                <ChangePassword key="change-password" />, 
                <ChangeNickname key="change-nickname" />, 
                <DeleteUser key="delete-user"/>]} />} />
        </div>
    )
}
