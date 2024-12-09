import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    overlay: {
        bg: 'blackAlpha.700', //change the background
    },
    dialog: {
        borderRadius: '0',
        bg: `url("/img/alert-background.png") no-repeat #eee`,
        bgSize: '100% 100%',
        px: '14',
        py: '9',
        color: "white"
    },
    footer: {
        justifyContent: 'center',
    },
})

export const modalTheme = defineMultiStyleConfig({
    baseStyle,
})
