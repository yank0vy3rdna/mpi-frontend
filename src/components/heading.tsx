import React from "react";
import {Heading as H} from "@chakra-ui/react";

export default function Heading({children}: { children: React.ReactElement | string }) {
    return <H fontSize={"20px"}>{children}</H>
}