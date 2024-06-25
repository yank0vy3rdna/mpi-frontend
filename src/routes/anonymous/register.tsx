import {Box, Center, Flex, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {borderStyle} from "../../components/border";
import useMobile from "../../hooks/isMobile";
import Heading from "../../components/heading";
import Button from "../../components/button";
import useTokenStore from "../../store/tokenStore";
import React, {useState} from "react";
import useApi from "../../api/interface";
import validate from "validate.js";

const constraints = {
    email: {
        email: true,
        length: {maximum: 255},
        presence: {message: "is required"}
    },
    password: {
        length: {maximum: 50, minimum: 5},
        presence: {message: "is required"}
    },
    username: {
        length: {maximum: 50, minimum: 5},
        presence: {message: "is required"}
    },
};

export default function Register() {
    const isMobile = useMobile()
    const api = useApi()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const register = useTokenStore((state) => state.register)

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
                    <FormLabel>Email</FormLabel>

                    <Box color={"red"}>
                        {emailError}
                    </Box>
                    <Input focusBorderColor={"#ad8e42"} borderColor={"#ad8e42"} _hover={{borderColor: "#ad8e42"}}
                           autoComplete={"email"} placeholder='Email'
                           onChange={(e) => {
                               setEmail(e.currentTarget.value)
                           }}
                    />
                </FormControl>
            </Center>
            <Center mt={"30px"}>
                <FormControl isRequired>
                    <FormLabel>Login</FormLabel>

                    <Box color={"red"}>
                        {usernameError}
                    </Box>
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
                    <Box color={"red"}>
                        {passwordError}
                    </Box>
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
                <Button text={"Sign up"} onClick={() => {
                    const result = validate({email: email, username: username, password: password}, constraints)
                    if (result === undefined) {
                        register(api, email, username, password)
                    } else {
                        if (Object.keys(result).findIndex(x => x === "password") !== -1) {
                            setPasswordError(result.password.join(', '))
                        }
                        if (Object.keys(result).findIndex(x => x === "username") !== -1) {
                            setUsernameError(result.username.join(', '))
                        }
                        if (Object.keys(result).findIndex(x => x === "email") !== -1) {
                            setEmailError(result.email.join(', '))
                        }
                    }
                }}/>
            </Center>
        </Flex>
    </Center>
}