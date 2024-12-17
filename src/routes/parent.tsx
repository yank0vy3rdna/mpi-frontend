import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import Header from "../components/header";
import Alert from "../components/alert";
import React from "react";
import theme from "../theme/theme";


export default function Parent({ children }: { children: React.ReactElement }) {
    return <ChakraProvider theme={theme}>
        <Flex >
            <Flex flex={"0 0 100vw"}
                fontFamily={"Merriweather, sans-serif"} fontStyle={"bold"} color={"white"} flexDirection={"column"}
            >
                <Alert />
                <Header />
                {children}
            </Flex>
        </Flex>
    </ChakraProvider >
}
