import { Theme } from "styles";

export const dark: Theme = {
    colors: {
        primary: '#835AFD',
        black: '#29292e',
        white: '#F8F8F8',
        lightWhite: '#FEFEFE',
        gray: '#a8a8b3',
        lightGray: '#e2e2e2',
        highlighted: '#ffffcc',
        answered: '#636669',
        regularText: '#fff',
        googleRed: '#ea4335',
        body: '#333'
    },
    font: {
        family: {
            roboto: 'Roboto, sans-serif',
            poppins: 'Poppins, sans-serif'
        },
        weight: {
            regular: 400,
            medium: 600,
            bold: 700
        }
    },
    shadow: '0px 2px 12px rgba(0, 0, 0, 0.04)',
} as const