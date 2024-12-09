import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import useModalStore from "../store/modalStore";
import useWSStore from "../store/wsStore";

export default function Alert() {
    const [isOpen, body, header, onClose, newAlert] = useModalStore(state => [state.isOpen, state.body, state.header, state.onClose, state.newAlert])

    const [registerMessageHandler] = useWSStore(state => [state.registerMessageHandler])

    useEffect(() => {
        registerMessageHandler("astro", (data) => {
            newAlert("Астрологи предсказали!", data.text)
        })
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
