import { Box, Center, Flex, Image } from "@chakra-ui/react";
import Heading from "./heading";
import { borderStyle } from "./border";
import Button from "./button";
import useCartStore from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import fullPaths from "../router/routes";
import Gold from "./gold";

export default function UnitCard({ pictureUrl, name, id, count, price }: {
    pictureUrl: string,
    name: string,
    id: number,
    count: number,
    price: number
}) {
    const navigate = useNavigate()
    const [cart, addToCart, removeFromCart] = useCartStore((state) => [state.cart, state.addToCart, state.removeFromCart])
    let countInCart = cart[id]
    if (countInCart === undefined) {
        countInCart = 0
    }
    const ableToAddToCart = countInCart < count

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
                onClick={() => {
                    navigate(fullPaths.unitPathBuilder(id))
                }}
            >
                <Center h={"50%"} w={"100%"}>
                    <Image
                        src={pictureUrl} />
                </Center>
                <Center w={"100%"}>
                    <Heading size="18px">{name}</Heading>
                </Center>
                <Box w={"100%"} pl={"10px"}>
                    <Flex flexDirection={"row"}>Цена: {price} <Gold /></Flex>
                </Box>
                <Box w={"100%"} pl={"10px"}>
                    <Flex flexDirection={"row"}>Доступно к покупке: {count}</Flex>
                </Box>
            </Flex>
            {
                countInCart >= 1 ?
                    <Flex justifyContent={"space-around"}>
                        <Button text={"-"} onClick={() => {
                            removeFromCart(id)
                        }} />
                        <Center>{countInCart}</Center>
                        <Button text={"+"} disabled={!ableToAddToCart} onClick={() => {
                            if (countInCart)
                                addToCart(id)
                        }} />
                    </Flex> :
                    <Button text={"Добавить в корзину"} disabled={!ableToAddToCart} onClick={() => {
                        addToCart(id)
                    }} />
            }
        </Flex>
    </Box>
}
