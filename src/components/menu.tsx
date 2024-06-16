import {IconButton, Menu as M, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {HamburgerIcon} from '@chakra-ui/icons'
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Menu() {
    const navigate = useNavigate()

    return <M>
        <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon/>}
            variant='outline'
        />
        <MenuList>
            <MenuItem onClick={() => {
                navigate("/couriers")
            }}>
                Hire courier
            </MenuItem>
            <MenuItem onClick={() => {
                navigate("/orders")
            }}>
                Orders
            </MenuItem>
            <MenuItem onClick={() => {
                navigate("/units")
            }}>
                Order an Unit
            </MenuItem>
        </MenuList>
    </M>
}