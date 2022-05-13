import { useNavigate } from "react-router-dom";
import { getAccessToken, getRefreshToken, isTokenExpired, refreshAccessToken } from "../utils/session";
import { redirect } from "../utils/utils";

interface Props {
    children: React.ReactElement
}

export const AuthWrapper = (props: Props) => {
    if (isTokenExpired(getRefreshToken())) redirect('/login')
    else if (isTokenExpired(getAccessToken())) refreshAccessToken();

    return props.children
}

export const NoAuthWrapper = (props: Props) => {
    const navigate = useNavigate()
    if (!isTokenExpired(getAccessToken())) navigate('/')

    return props.children
}
