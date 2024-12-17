import { Center, Flex } from "@chakra-ui/react";
import { isMobile } from "pixi.js";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { MakeApiFromLocalStorage, TradesResponse, UnitsResponse } from "../../api/interface";
import { borderStyle } from "../../components/border";
import Button from "../../components/button";
import TradeCard from "../../components/tradeCard";
import Heading from "../../components/heading";
import fullPaths from "../../router/routes";
import useBalanceStore from "../../store/balanceStore";
import useCartStore from "../../store/cartStore";
import { cartPrefill } from "./cart";

export async function TradeLoader() {
    return {
        Trades: await MakeApiFromLocalStorage().Trades(),
        Units: await MakeApiFromLocalStorage().Units()
    }
}
export default function Trade() {
    const navigate = useNavigate()
    let data = useLoaderData() as {
        Trades: TradesResponse,
        Units: UnitsResponse
    }


    let revalidator = useRevalidator();


    const { gold } = useBalanceStore()
    const [cart, removeFromCart] = useCartStore(state => [
        state.cart,
        state.removeFromCart,
    ])
    const cartPrefilled = cartPrefill(cart, data.Units, removeFromCart)

    const sum = cartPrefilled.map((x) => x.foundUnit.price * x.countInCart).reduce((partialSum, a) => partialSum + a, 0)
    return <Center>
        <Flex
            __css={borderStyle}
            background={"url(/img/homm3-border-bg.png) 0 0 repeat #0d0c0a;"}
            width={isMobile ? "90vw" : "40vw"}
            m={isMobile ? "5%" : "20px"}
            p={isMobile ? "5%" : "47px"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
        >
            <Heading>Все предложения</Heading>
            <Flex
                m={"20px"}
                p={"10px"}
                flexWrap={"wrap"}
                justifyContent={"center"}
            >
                {data.Trades.trades.map((trade) =>
                    <TradeCard
                        pictureUrl={trade.pictureUrl}
                        name={trade.name}
                        key={trade.id}
                        id={trade.id}
                        count={trade.count}
                        price={trade.price}
                        countAvailableToSell={trade.countAvailableToSell}
                        revalidate={revalidator.revalidate}
                    />
                )}
            </Flex>
            {sum != 0 && sum <= gold ? <>
                <Center w={"100%"} p={"0.5%"}>
                    <Center>
                        Золота хватает на покупку
                    </Center>
                </Center>
                <Center w={"100%"} p={"0.5%"}>
                    <Center>
                        <Button text="В корзину" onClick={() => { navigate(fullPaths.cartPath) }} />
                    </Center>
                </Center></> : <></>
            }
            <Center w={"100%"} p={"0.5%"}>
                <Center>
                    <Button text="Лучшие предложения" onClick={() => { navigate(fullPaths.tradeTopPath) }} />
                </Center>
            </Center>
        </Flex>
    </Center>
}
