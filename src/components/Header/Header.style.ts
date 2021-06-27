import styled, { css } from 'styled-components'

export const Header = styled.header`
  ${({ theme }) => css`
    padding: 24px;
    border-bottom: 1px solid ${theme.colors.lightGray};
  `};
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;

  & button:last-of-type {
    height: 40px;
  }
`
