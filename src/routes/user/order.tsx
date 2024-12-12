import { MakeApiFromLocalStorage, OrderResponse } from "../../api/interface";
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

function inArr(s: string, arr: string[]): boolean {
    return arr.indexOf(s) !== -1
}
export default function Order() {
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
            <Heading>{"Заказ " + data.Order.order.id}</Heading>
            <Box mt={"20px"}>Статус: {data.Order.order.status}</Box>
            {
                data.Order.order.courier !== null ?
                    <Box mt={"20px"}>Курьер {data.Order.order.courier.name} (id {data.Order.order.courier.id}) привезет ваш заказ`</Box> : <></>
            }
            {
                data.Order.order.courier !== null ?
                    <OrderMap
                        map={data.Order.map}
                        currentPoint={data.Order.order.currentCoord}
                        fullPath={data.Order.order.fullPath}
                        units={data.Order.order.orderUnits}
                    /> : <></>
            }

            {
                data.Order.order.status === "NO_COURIER_AVAILABLE" && data.Order.order.courier === null
                    ? <Box mt={"20px"}><Button text={"Нанять курьера"} onClick={() => {
                        console.log("hire courier")
                        navigate(fullPaths.hireCourierPathBuilder(data.Order.order.id))
                    }} /></Box> : <></>
            }


            <Box mt={"20px"}><Button text={"К списку заказов"} onClick={() => {
                navigate(fullPaths.ordersPath)
            }} /></Box>
        </Flex>
    </Center>
}
