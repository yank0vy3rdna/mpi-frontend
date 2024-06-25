import React, {useEffect} from "react";
import useAuth, {Role} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import fullPaths from "../../router/routes";

export default function UserRoleChecker({children}: { children: React.ReactElement }) {
    const [, isAuthenticated, jwtData] = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated || jwtData.role !== Role.USER) {
            navigate(fullPaths.homePath)
        }
    }, [isAuthenticated, jwtData.role])


    return children
}