import { localStorageAuth, getNickname } from "../utils/utils"

import { UserForm } from "./UserForm"

const passwordOnChange = (password) => {
    if (password !== document.querySelector('input[name=password]').value) 
        return "비밀번호와 비밀번호 확인이 같지 않습니다."
    return ""
}

const ChangePassword = () => {
    const callback = () => {
        window.location.href = '/user?passwordChange'
    }

    const fallback = () => {
        window.location.href = '/user?passwordChangeError'
    }

    return (
        <UserForm 
            name="Change Password" 
            inputs={[{
                for: "current_password"
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
            url="/user" 
            method="PUT"
            callback={callback}
            fallback={fallback} />
    )
}

const ChangeNickname = () => {
    const callback = () => {
        window.location.href = '/user?nicknameChange'
    }

    const fallback = () => {
        window.location.href = '/user?nicknameChangeError'
    }

    return (
        <UserForm 
            name="Change Nickname" 
            inputs={[{
                for: "password"
            }, {
                for: "nickname"
            }]} 
            url="/user" 
            method="PUT"
            callback={callback}
            fallback={fallback} />
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
            <div>
                <ChangePassword />
                <ChangeNickname />
            </div>
        </div>
    )
}
