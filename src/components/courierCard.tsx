import { Box, Center, Flex, Heading, Image } from "@chakra-ui/react";
import { borderStyle } from "./border";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import fullPaths from "../router/routes";
import useApi from "../api/interface";
import Gold from "./gold";
import useBalanceStore from "../store/balanceStore";

export default function CourierCard({ pictureUrl, name, id, orderId, price }: {
    pictureUrl: string,
    name: string,
    id: number,
    price: number,
    orderId: string
}) {
    const [gold, updateBalance] = useBalanceStore(state => [state.gold, state.updateBalance])
    const api = useApi()
    const navigate = useNavigate()
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
                    <Image
                        src={pictureUrl} />
                </Center>
                <Center w={"100%"}>
                    <Heading size={"s"}>{name}</Heading>
                </Center>
                <Box w={"100%"} pl={"10px"}>
                    <Flex>Цена: {price}<Gold /></Flex>
                </Box>
            </Flex>
            {
                price <= gold ?
                    <Button text={"Нанять"} onClick={async () => {
                        await api.HireCourier(orderId, id)
                        await updateBalance(api)
                        navigate(fullPaths.orderPathBuilder(Number(orderId)))
                    }} /> : <Flex flexDir={"column"} p={"5px"}>
                        <Center mb={"20px"}>
                            Не хватает золота
                        </Center>

                        <Button text={"Продать ресурсы"} onClick={async () => {
                            navigate(fullPaths.tradeTopPath)
                        }} />

                    </Flex>
            }
        </Flex>
    </Box >
}
