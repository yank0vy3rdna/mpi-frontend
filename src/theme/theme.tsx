import { extendTheme } from "@chakra-ui/react";
import menuTheme from "./menu";
import buttonTheme from "./button";
import { modalTheme } from "./modal";
import "@fontsource/merriweather";

const theme = extendTheme({
    fonts: {
        heading: '"Merriweather", sans-serif',
        body: '"Merriweather", sans-serif',
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
        Button: buttonTheme,
        Modal: modalTheme,
    },
})
export default theme
