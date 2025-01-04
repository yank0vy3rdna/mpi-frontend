import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import useModalStore from "../store/modalStore";
import useWSStore from "../store/wsStore";

export default function Alert() {
    const [isOpen, body, header, onClose, newAlert] = useModalStore(state => [state.isOpen, state.body, state.header, state.onClose, state.newAlert])

    const [registerMessageHandler, deregisterMessageHandler] = useWSStore(state => [state.registerMessageHandler, state.deregisterMessageHandler])

    useEffect(() => {
        const messageType = "astro"
        registerMessageHandler(messageType, (data: { text: string }) => {
            newAlert("Астрологи предсказали!", data.text)
        })
        return () => {
            deregisterMessageHandler(messageType)
        }
    }, [])
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{header}</ModalHeader>
                    <ModalBody>
                        {body}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            bg={'url("/img/alert-close-button.png") no-repeat #eee'}
                            bgSize={"100% 100%"}
                            minWidth={"30%"}
                            onClick={onClose}
                            _hover={{}}
                            _active={{}}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
