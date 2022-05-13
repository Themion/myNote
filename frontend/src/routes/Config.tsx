import { getNickname } from "../utils/session"

import { Center } from "../components/Center"
import { List } from "../components/List"
import ChangePassword from "../components/user/ChangePassword"
import ChangeNickname from "../components/user/ChangeNickname"
import { DeleteUser } from "../components/user/DeleteUser"

export const Config = () => {
    return (
        <div>
            <h2>{getNickname()}</h2>
            <hr />
            <Center content={<List contents={[
                <ChangePassword key="change-password" />, 
                <ChangeNickname key="change-nickname" />, 
                <DeleteUser key="delete-user"/>]} />} />
        </div>
    )
}
