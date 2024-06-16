import {Box, Center, Flex, Heading, Image} from "@chakra-ui/react";
import {borderStyle} from "./border";
import Button from "./button";
import useCartStore from "../store/cartStore";
import {useNavigate} from "react-router-dom";

export default function UnitCard({pictureUrl, name, id, count}: {
    pictureUrl: string,
    name: string,
    id: number,
    count: number
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
                  justifyContent={"space-around"}>
            <Center h={"50%"} w={"100%"} onClick={() => {
                navigate("/units/" + id)
            }}>
                <Image
                    src={pictureUrl}/>
            </Center>
            <Center w={"100%"} onClick={() => {
                navigate("/units/" + id)
            }}>
                <Heading size={"s"}>{name}</Heading>
            </Center>
            </Flex>
            {
                countInCart >= 1 ?
                    <Flex justifyContent={"space-around"}>
                        <Button text={"-"} onClick={() => {
                            removeFromCart(id)
                        }}/>
                        <Center>{countInCart}</Center>
                        <Button text={"+"} disabled={!ableToAddToCart} onClick={() => {
                            if (countInCart)
                                addToCart(id)
                        }}/>
                    </Flex> :
                    <Button text={"Добавить в корзину"} disabled={!ableToAddToCart} onClick={() => {
                        addToCart(id)
                    }}/>
            }
        </Flex>
    </Box>
}