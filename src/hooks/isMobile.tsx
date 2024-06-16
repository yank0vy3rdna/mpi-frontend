import {useMediaQuery} from "@chakra-ui/react";

export default function useMobile() {
    const [isMobile] = useMediaQuery("(max-width: 1100px)")
    return isMobile
}