import {extendTheme} from "@chakra-ui/react";
import menuTheme from "./menu";
import buttonTheme from "./button";


const theme = extendTheme({
    fonts: {
        heading: '"Times New Roman", sans-serif',
        body: '"Times New Roman", sans-serif',
    },
    colors: {
        brand: {
            bg: '#ad8e42',
            text: '#fff',
            // card: '#0A99FF',
        },
    },
    components: {
        Menu: menuTheme,
        Button: buttonTheme
    },
})
export default theme