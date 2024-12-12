import { Center } from "@chakra-ui/react";
import { useEffect } from "react";
import useAuth, { Role } from "../hooks/useAuth";
import useModalStore from "../store/modalStore";
import useWSStore from "../store/wsStore";

export default function Home() {
    const [, , jwt] = useAuth()

    const [newAlert] = useModalStore(state => [state.newAlert])
    const [registerMessageHandler, deregisterMessageHandler] = useWSStore(state => [state.registerMessageHandler, state.deregisterMessageHandler])
    useEffect(() => {
        if (jwt.role == Role.COURIER) {
            const messageType = "new_courier_order"
            registerMessageHandler(messageType, (data) => {
                newAlert("Вам назначен заказ", "Доставьте войска клиенту")
            })
            return () => {
                deregisterMessageHandler(messageType)
            }
        }
    }, [])
    return <Center p={"10%"} pt={"10px"}><img alt={"home"} src={"/img/home_image.jpeg"} /></Center>
}
