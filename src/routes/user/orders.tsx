import { MakeApiFromLocalStorage, OrdersResponse, UnitsResponse } from "../../api/interface";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { borderStyle } from "../../components/border";
import Heading from "../../components/heading";
import { Box, Center, Flex } from "@chakra-ui/react";
import { Td, Th, Tr } from "../../components/table";
import useMobile from "../../hooks/isMobile";
import Button from "../../components/button";
import fullPaths from "../../router/routes";
import React, { useEffect } from "react";
import useWSStore from "../../store/wsStore";

type ApiResp = {
    Orders: OrdersResponse,
    Units: UnitsResponse
}

export async function OrdersLoader(): Promise<ApiResp> {
    return {
        Orders: await MakeApiFromLocalStorage().Orders(),
        Units: await MakeApiFromLocalStorage().Units(),
    }
}

export default function Orders() {
    const isMobile = useMobile()
    const navigate = useNavigate()
    const data = useLoaderData() as ApiResp;
    const [registerMessageHandler, deregisterMessageHandler] = useWSStore(state => [state.registerMessageHandler, state.deregisterMessageHandler])
    let revalidator = useRevalidator();

    useEffect(() => {
        const messageType = "order_update"
        registerMessageHandler(messageType, () => {
            revalidator.revalidate()
        })
        return () => {
            deregisterMessageHandler(messageType)
        }
    }, [])

    if (Object.keys(data.Orders.orders).length === 0) {
        return <Center >
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
                    navigate(fullPaths.unitsPath)
                }} />
            </Flex>
        </Center>
    }
    return <Center>
        <Flex
            __css={borderStyle}
            background={"url(/img/homm3-border-bg.png) 0 0 repeat #0d0c0a;"}
            minWidth={isMobile ? "90vw" : "40vw"}
            m={isMobile ? "5%" : "20px"}
            p={isMobile ? "5%" : "47px"}
            flexDirection={"column"}
            justifyContent={"space-between"}
        >
            <Heading>Заказы</Heading>
            <Box as={"table"} __css={borderStyle} m={isMobile ? "" : "20px"}>
                <thead>
                    <Tr>
                        <Th>Id заказа</Th>
                        {isMobile ? <></> : <Th>Дата заказа</Th>}
                        {isMobile ? <></> : <Th>Статус заказа</Th>}
                        <Th>Список</Th>
                    </Tr>
                </thead>
                <tbody>
                    {
                        data.Orders.orders.map((x) => <Tr key={x.id} onClick={() => {
                            navigate(fullPaths.orderPathBuilder(x.id))
                        }}>
                            <Td>{x.id}</Td>
                            {isMobile ? <></> : <Td>{x.orderTime}</Td>}
                            {isMobile ? <></> : <Td>{x.status}</Td>}
                            <Td>{x.orderUnits.map((x) => {
                                const unit = data.Units.units.find((u) => u.id === x.unitId)

                                return `${unit?.name} - ${x.count}`
                            }).join(", ")}</Td>
                        </Tr>
                        )
                    }
                </tbody>
            </Box>
            <Center mt={"30px"}><Button text={"Новый заказ"} onClick={() => {
                navigate(fullPaths.unitsPath)
            }} /></Center>
        </Flex>
    </Center>
}
