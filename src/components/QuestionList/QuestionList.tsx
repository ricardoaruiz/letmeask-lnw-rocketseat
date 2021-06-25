import React from 'react'
import classNames from 'classnames'

import { ReactComponent as LikeImg } from 'assets/images/like.svg'
import { ReactComponent as CheckImg } from 'assets/images/check.svg'
import { ReactComponent as AnswerImg } from 'assets/images/answer.svg'
import { ReactComponent as DeleteImg } from 'assets/images/delete.svg'

import { Question } from 'hooks/useRoom'
import { Question as QuestionItem } from 'components'

import * as S from './QuestionList.style'

type QuestionProps = {
    questions: Question[],
    onLikeQuestion?: (questionId: string, likeId: string | undefined) => void,
    onCheckQuestionAsAnswered?: (questionId: string, isAnswered: boolean) => void
    onHighlightQuestion?: (questionId: string, isAnswered: boolean) => void
    onRemoveQuestion?: (questionId: string) => void
}

export const QuestionList = ({ 
    questions, 
    onLikeQuestion, 
    onCheckQuestionAsAnswered, 
    onHighlightQuestion, 
    onRemoveQuestion 
}: QuestionProps) => {

    return (
        <S.Wrapper>
            {questions.map(({id, content, author, likeId, likeCount, isAnswered, isHighlighted}) => (
                <QuestionItem 
                    key={id} 
                    content={content} 
                    author={author}
                    isAnswered={isAnswered}
                    isHighLighted={isHighlighted}
                >
                    {!isAnswered && !!onLikeQuestion && (
                        <button 
                            type="button"
                            className={classNames({
                                'like-button': true,
                                liked : !!likeId
                            })}
                            aria-label="marcar como gostei"
                            onClick={() => onLikeQuestion(id, likeId)}
                            >
                            {likeCount && <span>{likeCount}</span>}
                            <LikeImg />
                        </button>
                    )}

                    {!isAnswered && !!onCheckQuestionAsAnswered && !!onHighlightQuestion && (
                        <>
                            <button 
                                type="button"
                                aria-label="mark questions as answered"
                                onClick={() => onCheckQuestionAsAnswered(id, isAnswered)}
                                title="mark questions as answered"
                            >
                                <CheckImg />
                            </button>

                            <button 
                                type="button"
                                aria-label="highlight question"
                                onClick={() => onHighlightQuestion(id, isHighlighted)}
                                title="highlight question"
                            >
                                <AnswerImg />
                            </button>'
                        </>
                    )}

                    {!!onRemoveQuestion && (
                        <button 
                            type="button"
                            aria-label="remove this question"
                            onClick={() => onRemoveQuestion(id)}
                            title="remove this question"
                        >
                            <DeleteImg />
                        </button>
                    )}

                </QuestionItem>
            ))}
        </S.Wrapper>
    )
}

export default QuestionList
