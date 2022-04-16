import { localStorageAuth } from "../utils/utils"

export const Config = () => {
    if (window.localStorage.getItem(localStorageAuth) === null) {
        window.location.href = "/login"
    }

    console.log(window.localStorage.getItem(localStorageAuth))

    return (
        <div>

        </div>
    )
}