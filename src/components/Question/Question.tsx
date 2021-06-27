import React from 'react'

import * as S from './Question.style'

type QuestionProps = {
  children?: React.ReactNode
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighLighted?: boolean
  isAnswered?: boolean
}

export const Question = ({
  children,
  content,
  author,
  isHighLighted = false,
  isAnswered = false
}: QuestionProps) => {
  return (
    <S.Question isAnswered={isAnswered} isHighlighted={isHighLighted}>
      <p>{content}</p>

      <S.QuestionFooter>
        <S.UserInfo>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </S.UserInfo>

        <div>{children}</div>
      </S.QuestionFooter>
    </S.Question>
  )
}
