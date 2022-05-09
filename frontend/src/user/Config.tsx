import { useNavigate, useSearchParams } from "react-router-dom"

import { Callback, Fallback, send } from "../utils/utils"
import { getNickname, requestAccessToken } from "../utils/session"

import { Input } from "../components/user/Input"
import { UserForm } from "../components/user/Form"
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
    const navigate = useNavigate()

    const callback: Callback = (res) => {
        navigate('/user?passwordChange', {replace: true})
    }

    const fallback: Fallback = (response) => {
        navigate('/user?error')
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
    const navigate = useNavigate()

    const callback: Callback = async (res) => {
        await requestAccessToken()
        navigate('/user?nicknameChange', {replace: true})
    }

    const fallback: Fallback = (response) => {
        console.log(response)
        navigate('/user?error')
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
    const navigate = useNavigate()

    const modalId = "deleteUser"

    const onClick = () => {
        const callback: Callback = (res) => {
            navigate('/logout')
        }
    
        const fallback: Fallback = (response) => {
            navigate('/user?error')
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
    const [search] = useSearchParams()

    const alert = search.has('error') ? <Alert alert="잘못된 비밀번호입니다." /> : null

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
