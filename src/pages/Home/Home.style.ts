import styled, { css } from 'styled-components'

export const CreateRoom = styled.button`
    ${({ theme }) => css`
        margin-top: 64px;
        height: 50px;
        border-radius: 8px;
        font-weight: 500;
        background-color: ${theme.colors.googleRed};
        color: ${theme.colors.white};

        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 0;
        transition: filter 0.2s;

        > img {
            margin-right: 8px;
        }

        &:hover {
            filter: brightness(0.9);
        }
    `};
`

export const Separator = styled.div`
    ${({ theme }) => css`
        font-size: 14px;
        color: ${theme.colors.regularText};

        margin: 32px 0;
        display: flex;
        align-items: center;

        &::before {
            content: '';
            flex: 1;
            height: 1px;
            background: ${theme.colors.regularText};
            margin-right: 16px;
        }

        &::after {
            content: '';
            flex: 1;
            height: 1px;
            background: ${theme.colors.regularText};
            margin-left: 16px;
        }    
    `};
`