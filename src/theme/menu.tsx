import {createMultiStyleConfigHelpers} from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(['menu', 'item', 'list'])
const menuTheme = helpers.defineMultiStyleConfig({
    baseStyle: {
        menu: {
            bg: "black",
        },
        item: {
            // this will style the MenuItem and MenuItemOption components
            color: '#fff',
            bg: "transparent",
        },
        list: {
            // this will style the MenuList component
            // py: '4',
            // borderRadius: 'xl',
            borderColor: '#ad8e42',
            bg: 'url(/img/homm3-border-bg.png) 0 0 repeat #0d0c0a;',
        },
    },
})
export default menuTheme