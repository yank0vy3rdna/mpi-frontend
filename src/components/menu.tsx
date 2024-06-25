import {IconButton, Menu as M, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {HamburgerIcon} from '@chakra-ui/icons'
import {useNavigate} from "react-router-dom";
import fullPaths from "../router/routes";
import useAuth, {Role} from "../hooks/useAuth";

export default function Menu() {
    const navigate = useNavigate()
    const [, , jwtData] = useAuth()
    let menuItems: [string, string][] = []
    switch (jwtData.role) {
        case Role.COURIER:
            menuItems = [
                ["Orders", fullPaths.courierOrdersPath],
            ]
            break
        case Role.OWNER:
            menuItems = [
                ["Add courier", fullPaths.newCourierPath],
            ]
            break
        case Role.USER:
            menuItems = [
                ["Orders", fullPaths.ordersPath],
                ["Order an Unit", fullPaths.unitsPath],
            ]
            break
    }
    return <M>
        <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon/>}
            variant='outline'
        />
        <MenuList>
            {
                menuItems.map(
                    ([text, link]) => <MenuItem key={text} onClick={() => {
                        navigate(link)
                    }}>
                        {text}
                    </MenuItem>
                )
            }
        </MenuList>
    </M>
}