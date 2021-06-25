import { Theme } from "styles";

export const light: Theme = {
    colors: {
        primary: '#835AFD',
        black: '#29292e',
        white: '#F8F8F8',
        lightWhite: '#FEFEFE',
        gray: '#a8a8b3',
        lightGray: '#e2e2e2',
        highlighted: '#F4F0FF',
        answered: '#DBDCDD',
        regularText: '#737380',
        googleRed: '#ea4335',
        body: '#fff'
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