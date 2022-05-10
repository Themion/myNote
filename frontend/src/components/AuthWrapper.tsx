import { useNavigate } from "react-router-dom";
import { getAccessToken, getRefreshToken, isTokenExpired, refreshAccessToken } from "../utils/session";

interface Props {
    children: React.ReactElement
}

export const AuthWrapper = (props: Props) => {
    const navigate = useNavigate()
    if (isTokenExpired(getRefreshToken())) navigate('/login')
    else if (isTokenExpired(getAccessToken())) refreshAccessToken();

    return props.children
}


export const NoAuthWrapper = (props: Props) => {
    const navigate = useNavigate()
    if (!isTokenExpired(getAccessToken())) navigate('/')

    return props.children
}
