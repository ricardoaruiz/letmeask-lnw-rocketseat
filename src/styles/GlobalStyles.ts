import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    ${({ theme }) => css`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: ${theme.colors.body};
            color: ${theme.colors.white};
        }

        body, input, button, textarea {
            font-weight: 400;
            font-size: 16px;
            font-family: ${theme.font.family.roboto};
        }    
    `};
`