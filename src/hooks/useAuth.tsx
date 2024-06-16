import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useTokenStore from "../store/tokenStore";

const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

interface jwtDataI {
    exp: string
    name: string
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
            navigate("/login")
        }
    })
    let jwtData: jwtDataI = {
        exp: "",
        name: "Andrey"
    }
    if (isAuthenticated) {
        parseJwt(token)
    }
    return [token, isAuthenticated, jwtData, () => {
        logout()
        navigate("/login")
    }]
}
