import styled, { css, DefaultTheme } from 'styled-components'

type ButtonProps = {
  isOutlined?: boolean
}

const buttonModifiers = {
  outline: (theme: DefaultTheme) => css`
    background-color: transparent;
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};

    &:not(:disabled):hover {
      filter: unset;
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
    }
  `
}

export const Button = styled.button<ButtonProps>`
  ${({ theme, isOutlined }) => css`
    height: 50px;
    border-radius: 8px;
    font-weight: 500;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    padding: 0 32px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
    transition: filter 0.2s;

    > img {
      margin-right: 8px;
    }

    &:not(:disabled):hover {
      filter: brightness(0.9);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    ${isOutlined && buttonModifiers.outline(theme)}
  `};
`
