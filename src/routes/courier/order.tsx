import useApi, {CourierOrdersResponse, MakeApiFromLocalStorage, UnitsResponse} from "../../api/interface";
import {useLoaderData, useRevalidator} from "react-router-dom";
import {borderStyle} from "../../components/border";
import Heading from "../../components/heading";
import React, {useEffect, useRef} from "react";
import {Box, Center, Flex} from "@chakra-ui/react";
import useMobile from "../../hooks/isMobile";
import Button from "../../components/button";

export async function OrdersLoader() {
    return {
        Order: await MakeApiFromLocalStorage().CouriersOrder(),
        Units: await MakeApiFromLocalStorage().Units()
    }
}

export function Order() {
    let data = useLoaderData() as { Order: CourierOrdersResponse, Units: UnitsResponse };
    const isMobile = useMobile()
    const api = useApi()
    let revalidator = useRevalidator();
    useEffect(() => {
        const timer = setInterval(() => {
            revalidator.revalidate()
        }, 2000)

        return () => clearInterval(timer);
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
            <Center> <Heading>Текущий заказ</Heading></Center>
            {
                data.Order.order === null
                    ? <Box m={"20px"}>Заказа нет</Box>
                    : <>
                        <Flex m={"20px"} flexDirection={"column"}>
                            <Box>ID: {data.Order.order.id}</Box>
                            <Box>Время заказа: {data.Order.order.orderTime}</Box>
                            <Box>Статус заказа:{data.Order.order.status}</Box>
                            <Box>Широта: {data.Order.order.lat}</Box>
                            <Box>Долгота: {data.Order.order.lon}</Box>
                            <Box>{data.Order.order.orderUnits.map((x) => {
                                const unit = data.Units.units.find((u) => u.id === x.unitId)

                                return `${unit?.name} - ${x.count}`
                            }).join(", ")}</Box>

                        </Flex>
                        {data.Order.order.status === "WAITING_COURIER_ANSWER" ? <Flex // if should answer
                            w={"100%"}
                            justifyContent={"space-around"}
                        >
                            <Button text={"Принять"} onClick={async () => {
                                if (data.Order.order === null) {
                                    return
                                }
                                await api.AnswerOrder(data.Order.order.id, true)
                                revalidator.revalidate()

                            }}/>
                            <Button text={"Отклонить"} onClick={async () => {
                                if (data.Order.order === null) {
                                    return
                                }
                                await api.AnswerOrder(data.Order.order.id, false)
                                revalidator.revalidate()

                            }}/>
                        </Flex> : <></>
                        }
                    </>
            }

        </Flex>
    </Center>
}