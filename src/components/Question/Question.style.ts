import styled, { css, DefaultTheme } from 'styled-components'

type QuestionProps = {
    isAnswered?: boolean
    isHighlighted?: boolean
}

const questionModifiers = {
    answered: (theme: DefaultTheme) => css`
        background-color: ${theme.colors.answered};
        border: 1px solid ${theme.colors.answered};
    `,
    highlighted: (theme: DefaultTheme) => css`
        background-color: ${theme.colors.highlighted};
        border: 1px solid ${theme.colors.highlighted};

        svg path {
            stroke: ${theme.colors.primary};
        }    
    `
}

export const Question = styled.div<QuestionProps>`
    ${({ theme, isAnswered, isHighlighted }) => css`
        background-color: ${theme.colors.lightWhite};
        border: 1px solid ${theme.colors.lightWhite};
        border-radius: 8px;
        box-shadow: ${theme.shadow};
        padding: 24px;

        & + div {
            margin-top: 8px;
        }

        p {
            color: ${theme.colors.black};
        }

        ${isAnswered && questionModifiers.answered(theme)}
        ${isHighlighted && questionModifiers.highlighted(theme)}
    `};
`

export const QuestionFooter = styled.footer`
    ${({ theme }) => css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 32px;

        button {
            background-color: transparent;
            border: none;
            margin-left: 10px;
            cursor: pointer;
            transition: all 0.2s;

            &.like-button {
                display: flex;
                align-items: flex-end;
                color: ${theme.colors.regularText};
                gap: 8px;

                &.liked {
                    color: ${theme.colors.primary};

                    svg path {
                        stroke: ${theme.colors.primary};
                        fill: ${theme.colors.primary};
                    }

                }
            }

            &:hover {
                svg path {
                    stroke: ${theme.colors.primary};
                }
            }            
        }    
    `};
`

export const UserInfo = styled.div`
    ${({ theme }) => css`
        display: flex;
        align-items: center;

        img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }

        span {
            margin-left: 8px;
            font-size: 14px;
            color: ${theme.colors.black};
        }    
    `};
`