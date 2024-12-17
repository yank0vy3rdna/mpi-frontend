import React from "react";
import { Heading as H } from "@chakra-ui/react";
import useMobile from "../hooks/isMobile";

export default function Heading({ size, children, }: { children: React.ReactElement | string, size?: string | undefined }) {
    const isMobile = useMobile()
    if (size === undefined) {
        size = isMobile ? "25px" : "20px"
    }
    return <H fontSize={size}>{children}</H>
}
