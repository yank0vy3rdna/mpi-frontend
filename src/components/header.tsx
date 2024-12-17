import { Center, Flex, Icon, Spacer } from "@chakra-ui/react";
import { TiShoppingCart } from "react-icons/ti";
import Button from "./button";
import React from "react";
import { useNavigate } from "react-router-dom";
import Heading from "./heading";
import useAuth, { Role } from "../hooks/useAuth";
import Menu from "./menu";
import fullPaths from "../router/routes";
import Balance from "./balance";
import useMobile from "../hooks/isMobile";

export default function Header() {
    const navigate = useNavigate()
    const [, isAuthenticated, jwtData, logout] = useAuth()
    const isMobile = useMobile()
    const isAuthenticatedUser = isAuthenticated && jwtData.role == Role.USER

    return <Flex p={isMobile ? "0px" : "15px"} width={"100vw"} height={"12vh"} minH={"60px"}>
        <Flex
            border={"1px solid #ad8e42"}
            background={"url(/img/homm3-border-bg.png) 0 0 repeat #0d0c0a;"}
            fontFamily={"@fontsource/merriweather"}
            width={"100vw"} height={"100%"} opacity={"80%"}
            minH={"60px"}
        >
            <Flex opacity={"100%"} width={"100%"}>
                {
                    !isMobile ?
                        <Center p={"10px"} pl={"30px"} pt={"0"} onClick={() => {
                            navigate(fullPaths.homePath)
                        }}>
                            <img width={"90px"} src={"/img/taverna.webp"} />
                        </Center> : <></>
                }
                {
                    isAuthenticated ? <Center color={"white"} pl={5}><Menu /></Center> : <></>
                }
                <Center onClick={() => {
                    navigate(fullPaths.homePath)
                }} pl={"5"}>
                    <Heading size={"15px"}>Units delivery HOMM</Heading>
                </Center>

                <Spacer />
                {
                    isAuthenticatedUser ?
                        <Center color={"white"} pl={5} pr={5}><Balance /></Center>
                        : <></>
                }
                {
                    isAuthenticatedUser ?
                        <Center onClick={() => navigate(fullPaths.cartPath)}><Icon color={"#d2ad50"} opacity={"100%"} w={"30px"}
                            h={"30px"}
                            as={TiShoppingCart} /></Center> : <></>
                }
                {
                    isAuthenticated && !isMobile ? <Center color={"white"} pl={5}>{jwtData.sub}</Center> : <></>
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
