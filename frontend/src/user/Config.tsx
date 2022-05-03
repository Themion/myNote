import { send, redirect, getParams } from "../utils/utils"
import { getAccessToken, getNickname, requestAccessToken } from "../utils/session"

import { Input } from "./Input"
import { UserForm } from "./UserForm"
import { Alert } from "../components/Alert"
import { Card } from "../components/Card"
import { Center } from "../components/Center"
import { List } from "../components/List"
import { Modal } from "../components/Modal"

// 비밀번호와 비밀번호 확인의 값을 서로 비교
const passwordCheck = (password: string) => {
    const input_password = document.querySelector('input[name=password]') as HTMLInputElement
    if (password !== input_password.value) 
        return "비밀번호와 비밀번호 확인이 같지 않습니다."
}

const ChangePassword = () => {
    const callback = (res: any) => {
        redirect('/user?passwordChange')
    }

    const fallback = (response: any) => {
        redirect('/user?error')
    }

    return (
        <UserForm 
            name="Change Password" 
            inputs={[{
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
            }]} 
            to={{ url: "/user/password", method: "PUT" }}
            callback={callback}
            fallback={fallback}
            validate />
    )
}

const ChangeNickname = () => {
    const callback = (res: any) => {
        requestAccessToken()
        redirect('/user?nicknameChange')
    }

    const fallback = (response: any) => {
        console.log(response)
        redirect('/user?error')
    }

    const inputs = [{
        name: "password",
        type: "password"
    }, {
        name: "nickname"
    }]

    return (
        <UserForm 
            name="Change Nickname" 
            inputs={inputs} 
            to={{ url: "/user/nickname", method: "PUT" }}
            callback={callback}
            fallback={fallback}
            validate />
    )
}

const DeleteUser = () => {
    const modalId = "deleteUser"

    const onClick = () => {
        const callback = (res: any) => {
            redirect('/logout')
        }
    
        const fallback = (response: any) => {
            redirect('/user?error')
        }

        if (window.confirm("정말로 탈퇴하시겠습니까?")) {
            const input = document.querySelector(`#${modalId} input`) as HTMLInputElement
            send({url: '/user', method: 'DELETE'}, {password: input.value}, callback, fallback)
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
                        <Input name="password" type="password" />
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
