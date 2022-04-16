import { localStorageAuth } from "../utils/utils"

export const Config = () => {
    if (window.localStorage.getItem(localStorageAuth) === null) {
        window.location.href = "/login"
    }

    console.log(window.localStorage.getItem(localStorageAuth))

    return (
        <div>
            {/* 사용자 비밀번호 / 닉네임 수정 및 사용자 탈퇴 */}
        </div>
    )
}