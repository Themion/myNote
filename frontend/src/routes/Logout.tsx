import { useNavigate } from "react-router-dom"
import { removeAccessToken, removeRefreshToken } from "../utils/session"

const Logout = () => {
    const navigate = useNavigate()

    removeAccessToken()
    removeRefreshToken()

    navigate('/')

    return <div></div>
}

export default Logout
