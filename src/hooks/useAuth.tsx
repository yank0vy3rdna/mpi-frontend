import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useTokenStore from "../store/tokenStore";
import fullPaths from "../router/routes";

const parseJwt = (token: string) => {
    if (token === "") {
        return {}
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

interface jwtDataI {
    exp: string
    sub: string
    role: Role
}

export enum Role {
    COURIER = "COURIER",
    USER = "USER",
    OWNER = "OWNER"
}

export default function useAuth(): [string, boolean, jwtDataI, () => void] {
    const navigate = useNavigate()
    const [token, isAuthenticated, logout] = useTokenStore((state) => [state.token, state.isAuthenticated, state.logout])
    useEffect(() => {
        if (!isAuthenticated) {
            return
        }
        if (Number(parseJwt(token)["exp"]) <= Date.now() / 1000) {
            logout()
            navigate(fullPaths.loginPath)
        }
    })
    let jwtData: jwtDataI = {
        exp: "",
        sub: "Andrey",
        role: Role.USER
    }
    if (isAuthenticated) {
        jwtData = parseJwt(token)
    }
    return [token, isAuthenticated, jwtData, () => {
        logout()
        navigate(fullPaths.loginPath)
    }]
}
