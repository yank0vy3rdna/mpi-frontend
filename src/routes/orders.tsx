import API, {OrdersResponse} from "../api/interface";
import {useLoaderData, useNavigate} from "react-router-dom";
import {borderStyle} from "../components/border";
import Heading from "../components/heading";
import {Box, Center, Flex} from "@chakra-ui/react";
import {Td, Th, Tr} from "../components/table";
import Gold from "../components/gold";
import useMobile from "../hooks/isMobile";
import Button from "../components/button";

export async function OrdersLoader(): Promise<OrdersResponse> {
    return await API.Orders()
}

export default function Orders() {
    const isMobile = useMobile()
    const navigate = useNavigate()
    const data = useLoaderData() as OrdersResponse;

    if (Object.keys(data.orders).length === 0) {
        return <Center height={"80vh"}>
            <Flex
                __css={borderStyle}
                background={"url(/img/homm3-border-bg.png) 0 0 repeat #0d0c0a;"}
                minWidth={isMobile ? "90vw" : "40vw"}
                m={"20px"}
                p={"47px"}
                flexDirection={"column"}
                justifyContent={"space-between"}
            >
                <Heading>Заказы</Heading>

                <Box m={"20px"}>Заказов пока что нет</Box>

                <Button text={"Сделать первый заказ"} onClick={() => {
                    navigate("/units")
                }}/>
            </Flex>
        </Center>
    }
    return <Center height={"80vh"}>
        <Flex
            __css={borderStyle}
            background={"url(/img/homm3-border-bg.png) 0 0 repeat #0d0c0a;"}
            minWidth={isMobile ? "90vw" : "40vw"}
            m={"20px"}
            p={"47px"}
            flexDirection={"column"}
            justifyContent={"space-between"}
        >
            <Heading>Заказы</Heading>
            <Box as={"table"} __css={borderStyle} m={"20px"}>
                <thead>
                <Tr>
                    <Th>Id заказа</Th>
                    <Th>Дата заказа</Th>
                    <Th>Статус заказа</Th>
                </Tr>
                </thead>
                <tbody>
                {data.orders.map((x) => <Tr key={x.id} onClick={() => {
                    // navigate("/units/" + x.foundUnit.id)
                }}>
                    <Td>{x.id}</Td>
                    <Td>{x.orderTime}</Td>
                    <Td>{x.status}</Td>
                </Tr>)}
                </tbody>
            </Box>
            <Center mt={"30px"}><Button text={"Новый заказ"} onClick={() => {
                navigate("/units")
            }}/></Center>
        </Flex>
    </Center>
}