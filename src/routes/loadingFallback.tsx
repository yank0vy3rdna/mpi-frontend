import {Center, Spinner} from "@chakra-ui/react";
import Parent from "./parent";
import React from "react";

export default function LoadingFallback() {
    return <Parent><Center height={"70%"}><Spinner color={"#ad8e42"} size={"xl"}/></Center></Parent>
}