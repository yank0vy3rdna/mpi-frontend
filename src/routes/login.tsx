import {Center, Flex, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {borderStyle} from "../components/border";
import useMobile from "../hooks/isMobile";
import Heading from "../components/heading";
import Button from "../components/button";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import useTokenStore from "../store/tokenStore";
import {useEffect, useState} from "react";

export default function Login() {
    const isMobile = useMobile()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [, isAuthenticated] = useAuth()
    const login = useTokenStore((state) => state.login)
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated])
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
            <Center>
                <Heading>Sign in</Heading>
            </Center>
            <Center mt={"30px"}>
                <FormControl isRequired>
                    <FormLabel>Login</FormLabel>
                    <Input focusBorderColor={"#ad8e42"} borderColor={"#ad8e42"} _hover={{borderColor: "#ad8e42"}}
                           autoComplete={"username"} placeholder='Login'
                           onChange={(e) => {
                               setUsername(e.currentTarget.value)
                           }}
                    />
                </FormControl>
            </Center>
            <Center mt={"30px"}>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input focusBorderColor={"#ad8e42"} borderColor={"#ad8e42"} _hover={{borderColor: "#ad8e42"}}
                           placeholder='Password'
                           autoComplete={"current-password"}
                           type={"password"} onChange={(e) => {
                        setPassword(e.currentTarget.value)
                    }}
                    />
                </FormControl>
            </Center>

            <Center mt={"30px"}>
                <Button text={"Sign in"} onClick={() => {
                    login(username, password)
                }}/>
            </Center>
        </Flex>
    </Center>
}