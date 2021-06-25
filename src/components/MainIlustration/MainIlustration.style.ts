import styled, { css } from "styled-components"

export const MainIlustration = styled.div`
    ${({ theme }) => css`
        height: 100%;
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};

        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 120px 80px;

        img {
            max-width: 320px;
        }
        strong {
            font-weight: ${theme.font.weight.bold};
            font-size: 36px;
            font-family: ${theme.font.family.poppins};
            line-height: 42px;
            margin-top: 16px;
        }
        p {
            font-size: 24px;
            line-height: 32px;
            margin-top: 16px;
            color: ${theme.colors.white};
        }    
    `};
`