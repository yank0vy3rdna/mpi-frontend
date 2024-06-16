import {Center, Flex, Icon, Spacer} from "@chakra-ui/react";
import {TiShoppingCart} from "react-icons/ti";
import Button from "./button";
import React from "react";
import {useNavigate} from "react-router-dom";
import Heading from "./heading";
import useAuth from "../hooks/useAuth";
import Menu from "./menu";

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
                    navigate("/")
                }}>
                    <img width={"90px"} src={"/img/taverna.webp"}/>
                </Center>
                {
                    isAuthenticated ? <Center color={"white"} pl={5}><Menu/></Center> : <></>
                }
                <Center onClick={() => {
                    navigate("/")
                }} pl={"5"}>
                    <Heading>Units delivery HOMM</Heading>
                </Center>

                <Spacer/>
                {
                    isAuthenticated ?
                        <Center onClick={() => navigate("/cart")}><Icon color={"#d2ad50"} opacity={"100%"} w={"30px"}
                                                                        h={"30px"}
                                                                        as={TiShoppingCart}/></Center> : <></>
                }
                {
                    isAuthenticated ? <Center color={"white"} pl={5}>{jwtData.name}</Center> : <></>
                }
                {
                    isAuthenticated
                        ? <Center color={"white"} pl={5} pr={10}><Button text={"Logout"} onClick={() => {
                            logout()
                        }}/> </Center> : <></>
                }
                {
                    isAuthenticated
                        ? <></>
                        : <Center color={"white"} pl={20} pr={10}><Button text={"Sign in"} onClick={() => {
                            navigate("/login")
                        }}/> </Center>
                }
            </Flex>
        </Flex>
    </Flex>
}