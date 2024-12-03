import useApi, {Courier, MakeApiFromLocalStorage} from "../../api/interface";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {Box, Center, Flex} from "@chakra-ui/react";
import {borderStyle} from "../../components/border";
import Heading from "../../components/heading";
import Button from "../../components/button";
import fullPaths from "../../router/routes";
import React from "react";
import useMobile from "../../hooks/isMobile";
import CourierCard from "../../components/courierCard";

export async function HireCourierLoader(): Promise<Courier[]> {
    return (await MakeApiFromLocalStorage().Couriers()).couriers
}

export default function HireCourier() {
    const couriers = useLoaderData() as Courier[];
    const api = useApi()
    const isMobile = useMobile()
    const navigate = useNavigate()
    let {orderId} = useParams() as { orderId: string };


    if (couriers.length === 0) {
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
                <Heading>Найм курьера</Heading>
                <Box m={"20px"} fontSize={"18px"}>Доступных для найма курьеров пока что
                    нет.</Box>
                <Box m={"20px"}>Попробуйте нанять курьера позже, или
                    дождитесь пока уже нанятый курьер закончит заказ</Box>

                <Button text={"Отменить заказ"} onClick={async () => {
                    await api.CloseOrder(orderId)
                    navigate(fullPaths.ordersPath)
                }}/>
                <Box mt={"20px"}>
                    <Button text={"К списку заказов"} onClick={() => {
                        navigate(fullPaths.ordersPath)
                    }}/>
                </Box>
            </Flex>
        </Center>
    }

    return <Flex
        m={"20px"}
        p={"10px"}
        justifyContent={"left"}
        flexWrap={"wrap"}
    >
        {couriers.map((courier) =>
            <CourierCard
                orderId={orderId}
                pictureUrl={courier.pictureUrl}
                name={courier.name}
                key={courier.id}
                id={courier.id}
                price={courier.price}
            />
        )}
    </Flex>
}
