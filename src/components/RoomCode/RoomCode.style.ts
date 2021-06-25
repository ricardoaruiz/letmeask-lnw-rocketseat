import styled, { css } from 'styled-components'

export const RoomCode = styled.button`
    ${({ theme }) => css`
        height: 40px;
        border-radius: 8px;
        overflow: hidden;

        color: ${theme.colors.regularText};
        background: transparent;
        border: 1px solid ${theme.colors.primary};
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        img {
            padding: 12px;
            background-color: ${theme.colors.primary};
        }
        
        span {
            padding: 0 12px;
            width: 255px;
        }    
    `};
`