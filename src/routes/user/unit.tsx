import { borderStyle } from "../../components/border";
import { Box, Center, Flex, Image } from "@chakra-ui/react";
import useMobile from "../../hooks/isMobile";
import { MakeApiFromLocalStorage, UnitDetails } from "../../api/interface";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import Heading from "../../components/heading";
import useCartStore from "../../store/cartStore";
import Button from "../../components/button";
import fullPaths from "../../router/routes";
import Gold from "../../components/gold";
import useWSStore from "../../store/wsStore";
import { useEffect } from "react";

export async function UnitLoader({ params }: any) {
    const p = params as { unitId: number }
    return await MakeApiFromLocalStorage().UnitById(p.unitId)
}

export default function Unit() {
    const isMobile = useMobile()
    let data = useLoaderData() as UnitDetails;
    const navigate = useNavigate()
    const [cart, addToCart, removeFromCart] = useCartStore((state) => [state.cart, state.addToCart, state.removeFromCart])
    const registerAstroCallback = useWSStore((state) => state.registerAstroCallback)
    const revalidator = useRevalidator()
    let countInCart = cart[data.id]
    if (countInCart === undefined) {
        countInCart = 0
    }
    const ableToAddToCart = countInCart < data.count

    useEffect(() => {
        registerAstroCallback(() => {
            revalidator.revalidate()
        })

        return () => {
            registerAstroCallback(() => { })
        }
    }, [])

    return <Center>
        <Flex
            __css={borderStyle}
            background={"url(/img/homm3-border-bg.png) 0 0 repeat #0d0c0a;"}
            width={isMobile ? "90vw" : "70vw"}
            m={isMobile ? "5%" : "20px"}
            p={isMobile ? "5%" : "47px"}
            flexDirection={"column"}
            justifyContent={"space-between"}
        >
            <Heading>{data.name}</Heading>
            <Center mt={"20px"} w={"100%"}> <Image src={data.pictureUrl} /></Center>

            <Box mt={"20px"}>{data.description}</Box>
            <Box mt={"20px"}><Flex>Цена: {data.price}<Gold /></Flex></Box>
            <Box mt={"20px"}><Flex>Доступно к покупке: {data.count}</Flex></Box>

            {
                countInCart >= 1 ?
                    <Flex mt={"20px"} justifyContent={"space-around"}>
                        <Button text={"-"} onClick={() => {
                            removeFromCart(data.id)
                        }} />
                        <Center>{countInCart}</Center>
                        <Button text={"+"} disabled={!ableToAddToCart} onClick={() => {
                            if (countInCart)
                                addToCart(data.id)
                        }} />
                    </Flex> :
                    <Box mt={"20px"}><Button text={"Добавить в корзину"} disabled={!ableToAddToCart} onClick={() => {
                        addToCart(data.id)
                    }} /></Box>
            }
            <Box mt={"20px"}><Button text={"Перейти в корзину"} onClick={() => {
                navigate(fullPaths.cartPath)
            }} /></Box>
            <Box mt={"20px"}><Button text={"Назад"} onClick={() => {
                navigate(fullPaths.unitsPath)
            }} /></Box>
        </Flex>
    </Center>
}
