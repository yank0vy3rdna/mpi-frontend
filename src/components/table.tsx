import {Box} from "@chakra-ui/react";
import {borderStyle} from "./border";

export function Td({children}: { children: React.ReactElement | any }) {
    return <Box as={"td"} m={"7px"} p={"7px"} __css={borderStyle}>{children}</Box>
}

export function Th({children}: { children: React.ReactElement | any }) {
    return <Box as={"th"} m={"7px"} p={"7px"} __css={borderStyle}>{children}</Box>
}

export function Tr({children, onClick, fontWeight}: {
    children: React.ReactElement | any,
    onClick?: any,
    fontWeight?: string
}) {
    return <Box fontWeight={fontWeight} onClick={onClick} as={"tr"} m={"7px"} p={"7px"}
                __css={borderStyle}>{children}</Box>
}


