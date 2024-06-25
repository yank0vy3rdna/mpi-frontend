import React, {useEffect} from "react";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import fullPaths from "../../router/routes";

export default function AnonymousRoleChecker({children}: {
    children: React.ReactElement
}) {
    const [, isAuthenticated] = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate(fullPaths.homePath)
        }
    }, [isAuthenticated])

    return children
}