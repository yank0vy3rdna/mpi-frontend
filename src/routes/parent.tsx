import { ChakraProvider, Flex } from "@chakra-ui/react";
import Header from "../components/header";
import Alert from "../components/alert";
import React from "react";
import theme from "../theme/theme";


export default function Parent({ children }: { children: React.ReactElement }) {
    return <ChakraProvider theme={theme}>
        <Flex width={"100vw"} height={"100vh"}
            fontFamily={"Merriweather, sans-serif"} fontStyle={"bold"} color={"white"} flexDirection={"column"}
        >
            <Alert />
            <Header />
            {children}
        </Flex>
    </ChakraProvider>
}
