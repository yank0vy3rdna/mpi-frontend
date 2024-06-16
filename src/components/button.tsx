import {Box, Center} from "@chakra-ui/react";
import React, {MouseEventHandler} from "react";
import {borderStyle} from "./border";

export default function Button({text, onClick, disabled}: {
    text: string,
    onClick: MouseEventHandler,
    disabled?: boolean
}) {
    if (disabled === undefined) {
        disabled = false
    }
    return <Box
        __css={borderStyle}
        _hover={disabled ? {} : {opacity: "100%", filter: "brightness(150%)"}}
        filter={disabled ? "brightness(40%)" : ""}
        p={"10px"}
        backgroundImage={"/img/homm3-button-bg.png"}
        onClick={disabled ? () => {
        } : onClick}
        minW={"45px"}
    >
        <Center>{text}</Center>
    </Box>
}