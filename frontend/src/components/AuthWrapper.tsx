import { useNavigate } from "react-router-dom";
import { getAccessToken, isTokenExpired } from "../utils/session";

interface Props {
    children: React.ReactElement
}

export const AuthWrapper = (props: Props) => {
    const navigate = useNavigate()
    if (isTokenExpired(getAccessToken())) navigate('/login')

    return props.children
}


export const NoAuthWrapper = (props: Props) => {
    const navigate = useNavigate()
    if (!isTokenExpired(getAccessToken())) navigate('/')

    return props.children
}
