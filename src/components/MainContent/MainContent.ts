import styled, { css } from 'styled-components'

export const MainContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    align-items: stretch;
    text-align: center;

    > img {
      align-self: center;
    }

    h2 {
      font-size: 24px;
      margin: 64px 0 24px;
      font-family: ${theme.font.family.poppins};
    }

    form {
      input {
        height: 50px;
        border-radius: 8px;
        padding: 0 16px;
        background-color: ${theme.colors.white};
        border: 1px solid ${theme.colors.gray};
      }

      button {
        margin-top: 16px;
      }

      button,
      input {
        width: 100%;
      }
    }

    p {
      font-size: 14px;
      color: ${theme.colors.regularText};
      margin-top: 16px;

      > a {
        color: ${theme.colors.primary};
      }
    }
  `};
`
