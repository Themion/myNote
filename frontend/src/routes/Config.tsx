import { useSearchParams } from "react-router-dom"
import { getNickname } from "../utils/session"

import { Alert } from "../components/Alert"
import { Center } from "../components/Center"
import { List } from "../components/List"
import { ChangePassword } from "../components/user/ChangePassword"
import { ChangeNickname } from "../components/user/ChangeNickname"
import { DeleteUser } from "../components/user/DeleteUser"

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
