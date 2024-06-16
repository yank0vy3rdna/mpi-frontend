import API, {Unit} from "../api/api";
import {useLoaderData, useNavigate} from "react-router-dom";
import useCartStore from "../store/cartStore";
import {Box, Center, Flex, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {borderStyle} from "../components/border";
import useMobile from "../hooks/isMobile";
import Heading from "../components/heading";
import Gold from "../components/gold";
import Button from "../components/button";
import {useState} from "react";
import api from "../api/api";
import {Td, Th, Tr} from "../components/table";

export async function CartLoader() {
    return await API.Units()
}

export default function Cart() {
    const isMobile = useMobile()
    const navigate = useNavigate()
    const units = useLoaderData() as { units: Unit[] };
    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [cart, removeFromCart, clearCart] = useCartStore(state => [
        state.cart,
        state.removeFromCart,
        state.clearCart
    ])
    const cartPrefilled = Object.keys(cart).map((unitId) => {
            let foundUnit = units.units.find((x) => x.id === Number(unitId))
            if (foundUnit === undefined) {
                foundUnit = {name: "", id: Number(unitId), count: 0, pictureUrl: "", price: 0}
            }
            for (let i = 0; i < cart[Number(unitId)] - foundUnit.count; i++) {
                removeFromCart(Number(unitId))
            }
            return {
                foundUnit: foundUnit,
                countInCart: cart[Number(unitId)]
            }
        }
    )
    if (latitude > 90) {
        setLatitude(90)
    }
    if (latitude < -90) {
        setLatitude(-90)
    }
    if (longitude > 180) {
        setLongitude(180)
    }
    if (longitude < -180) {
        setLongitude(-180)
    }
    const sum = cartPrefilled.map((x) => x.foundUnit.price * x.countInCart).reduce((partialSum, a) => partialSum + a, 0)
    if (Object.keys(cart).length === 0) {
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
                <Heading>Корзина</Heading>

                <Box m={"20px"}>Корзина пуста</Box>

                <Button text={"К выбору юнитов"} onClick={() => {
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
            <Heading>Корзина</Heading>
            <Box as={"table"} __css={borderStyle} m={"20px"}>
                <thead>
                <Tr>
                    <Th>Unit name</Th>
                    <Th>Количество</Th>
                    <Th>Цена за штуку</Th>
                    <Th>Сумма</Th>
                </Tr>
                </thead>
                <tbody>
                {cartPrefilled.map((x) => <Tr key={x.foundUnit.id} onClick={() => {
                    navigate("/units/" + x.foundUnit.id)
                }}>
                    <Td>{x.foundUnit.name}</Td>
                    <Td>{x.countInCart}</Td>
                    <Td><Flex>{x.foundUnit.price}<Gold/></Flex></Td>
                    <Td><Flex>{x.foundUnit.price * x.countInCart}<Gold/></Flex></Td>
                </Tr>)}
                </tbody>
                <tfoot>
                <Tr fontWeight={"bold"}>
                    <td colSpan={3} style={{
                        margin: "7px", padding: "7px", border: "1px solid #ad8e42",
                        borderRadius: 5
                    }}>Сумма
                    </td>
                    <td style={{
                        margin: "7px", padding: "7px", border: "1px solid #ad8e42",
                        borderRadius: 5
                    }}><Flex>{sum}<Gold/></Flex></td>
                </Tr>
                </tfoot>
            </Box>
            <Center mt={"30px"}>
                <FormControl isRequired>
                    <FormLabel>Latitude</FormLabel>
                    <Input focusBorderColor={"#ad8e42"} borderColor={"#ad8e42"} _hover={{borderColor: "#ad8e42"}}
                           placeholder='Latitude'
                           type={"number"}
                           max={90}
                           min={-90}
                           value={latitude}
                           onChange={(e) => {
                               setLatitude(Number(e.currentTarget.value))
                           }}
                    />
                </FormControl>
            </Center>
            <Center mt={"30px"}>
                <FormControl isRequired>
                    <FormLabel>Longitude</FormLabel>
                    <Input focusBorderColor={"#ad8e42"} borderColor={"#ad8e42"} _hover={{borderColor: "#ad8e42"}}
                           placeholder='Longitude'
                           max={180}
                           min={-180}
                           value={longitude}
                           type={"number"} onChange={(e) => {
                        setLongitude(Number(e.currentTarget.value))
                    }}
                    />
                </FormControl>
            </Center>
            <Center mt={"30px"}><Button text={"Заказать"} onClick={async () => {
                const res = await api.MakeAnOrder(cart, latitude, longitude)
                if (!res.success) {
                    alert("not success makeanorder") // todo remove
                    return
                }
                clearCart()
                navigate("/orders")
            }}/></Center>
        </Flex>
    </Center>
}