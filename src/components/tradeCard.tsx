import { Box, Center, Flex, Image } from "@chakra-ui/react";
import Heading from "./heading";
import { borderStyle } from "./border";
import Button from "./button";
import Gold from "./gold";
import { useState } from "react";
import useApi from "../api/interface";
import useBalanceStore from "../store/balanceStore";

export default function TradeCard({ pictureUrl, name, id, count, price, countAvailableToSell, revalidate }: {
    pictureUrl: string,
    name: string,
    id: number,
    count: number,
    countAvailableToSell: number,
    price: number,
    revalidate: () => void
}) {
    const api = useApi()
    const { updateBalance } = useBalanceStore()
    const [countToSell, setCountToSell] = useState(0)
    const ableToAddToCart = countToSell < count && countToSell < countAvailableToSell

    return <Box
        __css={borderStyle}
        w={"225px"}
        minH={"350px"}
        background={"url(/img/homm3-border-bg.png) 0 0 repeat #0d0c0a;"}
        m={"20px"}
    >
        <Flex
            h={"100%"}
            flexDirection={"column"}
            justifyContent={"space-around"}
            p={"15px"}
        >
            <Flex h={"70%"}
                flexDirection={"column"}
                justifyContent={"space-around"}
            >
                <Center h={"50%"} w={"100%"}>
                    <Image maxH={"80%"}
                        src={pictureUrl} />
                </Center>
                <Center w={"100%"}>
                    <Heading size="18px">{name}</Heading>
                </Center>
                <Box w={"100%"} pl={"10px"}>
                    <Flex flexDirection={"row"}>Цена: {price} <Gold /></Flex>
                </Box>
                <Box w={"100%"} pl={"10px"}>
                    <Box>Торговая ассоциация готова приобрести: {count}</Box>
                </Box>
                <Box w={"100%"} pl={"10px"}>
                    <Box>У вас в наличии: {countAvailableToSell}</Box>
                </Box>
            </Flex>
            <Flex
                flexDirection={"column"}>
                <Flex justifyContent={"space-around"}>
                    <Button text={"-"} disabled={countToSell == 0} onClick={() => {
                        setCountToSell(countToSell - 1)
                    }} />
                    <Center>{countToSell}</Center>
                    <Button text={"+"} disabled={!ableToAddToCart} onClick={() => {
                        setCountToSell(countToSell + 1)
                    }} />
                </Flex>
                {
                    countToSell > 0 ? <>
                        <Box w={"100%"} pl={"10px"}>
                            <Flex flexDirection={"row"}>Стоимость: {price} * {countToSell} = {price * countToSell} <Gold /></Flex>
                        </Box>
                        <Button text={"Продать"} onClick={async () => {
                            await api.MakeTrade(id, countToSell)
                            setCountToSell(0)
                            await updateBalance(api)
                            revalidate()
                        }} />
                    </> : <></>
                }
            </Flex>
        </Flex>
    </Box >
}
