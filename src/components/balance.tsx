import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useApi from "../api/interface";
import useBalanceStore from "../store/balanceStore";
import Gold from "./gold";

export default function Balance() {
    const api = useApi()
    const [balance, setBalance] = useState(0)
    const { getBalance } = useBalanceStore()
    useEffect(() => {
        getBalance(api).then(balance => {
            setBalance(balance.gold)
        })
    }, [])

    return <Flex>
        {balance}
        <Gold />
    </Flex>
}
