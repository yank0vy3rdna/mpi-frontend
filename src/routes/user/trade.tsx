import { Center, Flex, Heading } from "@chakra-ui/react";
import { isMobile } from "pixi.js";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MakeApiFromLocalStorage, TradesResponse, UnitsResponse } from "../../api/interface";
import { borderStyle } from "../../components/border";
import Button from "../../components/button";
import TradeCard from "../../components/tradeCard";
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
    console.log(document.referrer)

    const { gold } = useBalanceStore()
    const [cart, removeFromCart] = useCartStore(state => [
        state.cart,
        state.removeFromCart,
    ])
    const cartPrefilled = cartPrefill(cart, data.Units, removeFromCart)

    const sum = cartPrefilled.map((x) => x.foundUnit.price * x.countInCart).reduce((partialSum, a) => partialSum + a, 0)
    return <Center height={"80vh"}>
        <Flex
            __css={borderStyle}
            background={"url(/img/homm3-border-bg.png) 0 0 repeat #0d0c0a;"}
            width={isMobile ? "90vw" : "40vw"}
            m={"20px"}
            p={"45px"}
            flexDirection={"column"}
            justifyContent={"space-between"}
        >
            <Heading>Лучшие предложения</Heading>
            <Flex
                m={"20px"}
                p={"10px"}
                justifyContent={"left"}
                flexWrap={"wrap"}
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
                    />
                )}
            </Flex>
            {sum != 0 && sum <= gold ? <>
                <Center w={"100%"}>
                    <Center>
                        <Heading size={"s"}>Золота хватает на покупку</Heading>
                    </Center>
                </Center>
                <Center w={"100%"}>
                    <Center>
                        <Button text="В корзину" onClick={() => { navigate(fullPaths.cartPath) }} />
                    </Center>
                </Center></> : <></>
            }
            <Center w={"100%"}>
                <Center>
                    <Button text="Лучшие предложения" onClick={() => { navigate(fullPaths.tradeTopPath) }} />
                </Center>
            </Center>
        </Flex>
    </Center>
}
