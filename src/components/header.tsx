import { Center, Flex, Icon, Spacer } from "@chakra-ui/react";
import { TiShoppingCart } from "react-icons/ti";
import Button from "./button";
import React from "react";
import { useNavigate } from "react-router-dom";
import Heading from "./heading";
import useAuth from "../hooks/useAuth";
import Menu from "./menu";
import fullPaths from "../router/routes";
import Balance from "./balance";

export default function Header() {
    const navigate = useNavigate()
    const [, isAuthenticated, jwtData, logout] = useAuth()

    return <Flex p={"15px"} width={"100vw"} height={"12vh"}>
        <Flex
            border={"1px solid #ad8e42"}
            background={"url(/img/homm3-border-bg.png) 0 0 repeat #0d0c0a;"}
            width={"100%"} height={"100%"} opacity={"80%"}
        >
            <Flex opacity={"100%"} width={"100%"}>
                <Center p={"10px"} pl={"30px"} pt={"0"} onClick={() => {
                    navigate(fullPaths.homePath)
                }}>
                    <img width={"90px"} src={"/img/taverna.webp"} />
                </Center>
                {
                    isAuthenticated ? <Center color={"white"} pl={5}><Menu /></Center> : <></>
                }
                <Center onClick={() => {
                    navigate(fullPaths.homePath)
                }} pl={"5"}>
                    <Heading>Units delivery HOMM</Heading>
                </Center>

                <Spacer />
                {
                    isAuthenticated ?
                        <Center color={"white"} pl={5} pr={5}><Balance /></Center>
                        : <></>
                }
                {
                    isAuthenticated ?
                        <Center onClick={() => navigate(fullPaths.cartPath)}><Icon color={"#d2ad50"} opacity={"100%"} w={"30px"}
                            h={"30px"}
                            as={TiShoppingCart} /></Center> : <></>
                }
                {
                    isAuthenticated ? <Center color={"white"} pl={5}>{jwtData.sub}</Center> : <></>
                }
                {
                    isAuthenticated
                        ? <Center color={"white"} pl={5} pr={10}><Button text={"Logout"} onClick={() => {
                            logout()
                        }} /> </Center> : <></>
                }
                {
                    isAuthenticated
                        ? <></>
                        : <Center color={"white"} pr={7}>
                            <Button text={"Sign in"} onClick={() => {
                                navigate(fullPaths.loginPath)
                            }} />
                        </Center>
                }
                {
                    isAuthenticated
                        ? <></>
                        : <Center color={"white"} pr={10}>
                            <Button text={"Sign up"} onClick={() => {
                                navigate(fullPaths.registerPath)
                            }} />
                        </Center>
                }
            </Flex>
        </Flex>
    </Flex>
}
