import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import useApi from "../api/interface";
import useAuth, { Role } from "../hooks/useAuth";
import useBalanceStore from "../store/balanceStore";
import Gold from "./gold";

export default function Balance() {
    const api = useApi()
    const [, isAuthenticated, jwtData] = useAuth()
    const { gold, initialized, updateBalance } = useBalanceStore()
    useEffect(() => {
        if (!initialized) {
            updateBalance(api)
        }
    }, [])

    if (isAuthenticated && jwtData.role == Role.USER) {
        return <Flex>
            {gold}
            <Gold />
        </Flex>
    }
    return <></>
}
