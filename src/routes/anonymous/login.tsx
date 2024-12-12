import { Center, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { borderStyle } from "../../components/border";
import useMobile from "../../hooks/isMobile";
import Heading from "../../components/heading";
import Button from "../../components/button";
import useTokenStore from "../../store/tokenStore";
import { useState } from "react";
import useApi from "../../api/interface";
import useBalanceStore from "../../store/balanceStore";

export default function Login() {
    const isMobile = useMobile()
    const api = useApi()
    const updateBalance = useBalanceStore(state => state.updateBalance)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = useTokenStore((state) => state.login)

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
                    <Input focusBorderColor={"#ad8e42"} borderColor={"#ad8e42"} _hover={{ borderColor: "#ad8e42" }}
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
                    <Input focusBorderColor={"#ad8e42"} borderColor={"#ad8e42"} _hover={{ borderColor: "#ad8e42" }}
                        placeholder='Password'
                        autoComplete={"current-password"}
                        type={"password"} onChange={(e) => {
                            setPassword(e.currentTarget.value)
                        }}
                    />
                </FormControl>
            </Center>

            <Center mt={"30px"}>
                <Button text={"Sign in"} onClick={async () => {
                    await login(api, username, password)
                    await updateBalance(api)
                }} />
            </Center>
        </Flex>
    </Center>
}
