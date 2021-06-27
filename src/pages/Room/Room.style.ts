import styled, { css } from 'styled-components'

import * as QuestionListStyle from 'components/QuestionList/QuestionList.style'

export const Main = styled.main`
  ${QuestionListStyle.Wrapper} {
    margin: 32px 0;
  }
`

export const Title = styled.div`
  ${({ theme }) => css`
    margin: 32px 0 24px;
    display: flex;
    align-items: center;

    h1 {
      font-family: ${theme.font.family.poppins};
      font-size: 24px;
      color: ${theme.colors.regularText};
    }

    span {
      margin-left: 16px;
      background-color: ${theme.colors.primary};
      border-radius: 16px;
      padding: 8px 16px;
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.regular};
      font-size: 16px;
    }
  `};
`

export const Form = styled.form`
  ${({ theme }) => css`
    textarea {
      width: 100%;
      border: 0;
      padding: 16px;
      border-radius: 8px;
      background-color: ${theme.colors.white};
      box-shadow: ${theme.shadow};
      resize: vertical;
      min-height: 130px;
    }
  `};
`

export const Footer = styled.footer`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    > span {
      font-size: 14px;
      color: ${theme.colors.regularText};
      font-weight: 500;

      button {
        background: transparent;
        border: 0;
        color: ${theme.colors.primary};
        text-decoration: underline;
        font-size: 14;
        font-weight: 500;
        cursor: pointer;
      }
    }
  `};
`

export const UserInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-top: 24px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    span {
      margin-left: 8px;
      color: ${theme.colors.regularText};
      font-weight: ${theme.font.weight.medium};
      font-size: 14px;
      font-family: ${theme.font.family.roboto};
    }
  `};
`
