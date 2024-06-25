import {
    Box,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select
} from "@chakra-ui/react";
import {borderStyle} from "../../components/border";
import useMobile from "../../hooks/isMobile";
import Heading from "../../components/heading";
import Button from "../../components/button";
import React, {useState} from "react";
import useApi from "../../api/interface";
import validate from "validate.js";
import {useNavigate} from "react-router-dom";

const pictureUrls = [
    "/img/couriers/1.webp",
    "/img/couriers/2.webp",
    "/img/couriers/3.webp",
    "/img/couriers/4.webp",
    "/img/couriers/5.webp",
    "/img/couriers/6.webp",
]
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
    price: {
        numericality: {
            greaterThan: 0,
            onlyInteger: true,
        },
        presence: {message: "is required"}
    },
    picture_url: {
        inclusion: pictureUrls,
        // presence: {message: "is required"}
    }
};

export default function NewCourier() {
    const isMobile = useMobile()
    const api = useApi()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [price, setPrice] = useState(0)
    const [priceError, setPriceError] = useState("")
    const [pictureUrl, setPictureUrl] = useState(pictureUrls[0])
    const [pictureUrlError, setPictureUrlError] = useState("")


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
                <Heading>Create courier account</Heading>
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
                <FormControl isRequired>
                    <FormLabel>Picture URL</FormLabel>
                    <Box color={"red"}>
                        {pictureUrlError}
                    </Box>
                    <Select
                        onChange={(e) => {
                            setPictureUrl(e.currentTarget.value)
                        }}
                        value={pictureUrl}
                        focusBorderColor={"#ad8e42"} borderColor={"#ad8e42"} _hover={{borderColor: "#ad8e42"}}>
                        {pictureUrls.map(pictureUrl => <option value={pictureUrl}>
                            {pictureUrl}
                        </option>)}
                    </Select>
                </FormControl>
            </Center>
            <Center mt={"30px"}>
                <FormControl isRequired>
                    <FormLabel>Price</FormLabel>
                    <Box color={"red"}>
                        {priceError}
                    </Box>
                    <Input focusBorderColor={"#ad8e42"} borderColor={"#ad8e42"} _hover={{borderColor: "#ad8e42"}}
                           placeholder='Price'
                           value={price}
                           type={"number"} onChange={(e) => {
                        setPrice(Number(e.currentTarget.value))
                    }}
                    />
                </FormControl>
            </Center>

            <Center mt={"30px"}>
                <Button text={"Create courier account"} onClick={async () => {
                    const result = validate({
                        email: email,
                        username: username,
                        password: password,
                        price: price,
                        pictureUrl: pictureUrl
                    }, constraints)
                    if (result === undefined) {
                        await api.CreateCourierAccount(email, username, password, price, pictureUrl)
                        navigate("/")
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
                        if (Object.keys(result).findIndex(x => x === "price") !== -1) {
                            setPriceError(result.price.join(', '))
                        }
                        if (Object.keys(result).findIndex(x => x === "picture_url") !== -1) {
                            setPictureUrlError(result.picture_url.join(', '))
                        }
                    }
                }}/>
            </Center>
        </Flex>
    </Center>
}