import useApi, { MakeApiFromLocalStorage, OrderResponse } from "../../api/interface";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { borderStyle } from "../../components/border";
import Heading from "../../components/heading";
import { Box, Center, Flex } from "@chakra-ui/react";
import useMobile from "../../hooks/isMobile";
import Button from "../../components/button";
import fullPaths from "../../router/routes";
import React, { useEffect } from "react";
import OrderMap from "../../components/map";
import useWSStore from "../../store/wsStore";

type ApiResp = {
    Order: OrderResponse,
}

export async function OrderLoader({ params }: any): Promise<ApiResp> {
    const p = params as { orderId: number }

    return {
        Order: await MakeApiFromLocalStorage().Order(p.orderId),
    }
}

export default function Order() {
    const isMobile = useMobile()
    const navigate = useNavigate()
    const api = useApi()
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
            <Heading>{"Заказ " + data.Order.order.id}</Heading>
            <Box mt={"20px"}>Статус: {data.Order.order.status}</Box>
            {
                data.Order.order.courier !== null ?
                    <Box mt={"20px"}>Курьер {data.Order.order.courier.name} (id {data.Order.order.courier.id}) привезет ваш заказ</Box> : <></>
            }
            {
                data.Order.order.courier !== null ?
                    <Center><OrderMap
                        map={data.Order.map}
                        currentPoint={data.Order.order.currentCoord}
                        fullPath={data.Order.order.fullPath}
                        units={data.Order.order.orderUnits}
                    /></Center> : <></>
            }

            {
                data.Order.order.status === "NO_COURIER_AVAILABLE" && data.Order.order.courier === null
                    ? <Box mt={"20px"}><Button text={"Нанять курьера"} onClick={() => {
                        navigate(fullPaths.hireCourierPathBuilder(data.Order.order.id))
                    }} /></Box> : <></>
            }
            {
                data.Order.order.status !== "CANCELED" && data.Order.order.status !== "DELIVERED"
                    ? <Box mt={"20px"}><Button text={"Отменить заказ"} onClick={async () => {
                        await api.CloseOrder(data.Order.order.id)
                        revalidator.revalidate()
                    }} /></Box> : <></>
            }

            <Box mt={"20px"}><Button text={"К списку заказов"} onClick={() => {
                navigate(fullPaths.ordersPath)
            }} /></Box>
        </Flex>
    </Center>
}
