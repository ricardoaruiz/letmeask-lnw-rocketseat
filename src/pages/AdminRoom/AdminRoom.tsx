import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Content, Header, QuestionList } from 'components'
import { useRoom } from 'hooks/useRoom'

import * as S from 'pages/Room/Room.style'

type RoomParams = {
    id: string
}

export const AdminRoom  = () => {
    const history = useHistory()
    const { id } = useParams<RoomParams>()
    const { title, questions, removeQuestion, finishRoom, highlightAQuestion, answerAQuestion  } = useRoom(id)

    /**
     * Highlight a question
     */
     const handleHighlightQuestion = React.useCallback( async (questionId: string, isHighlighted: boolean) => {
        try {
            await highlightAQuestion(questionId, !isHighlighted)
        } catch(error) {
            // TODO: Tratar o erro
            console.error(error)
        }
    }, [highlightAQuestion])

    /**
     * Answer a question
     */
    const handleCheckQuestionAsAnswered = React.useCallback( async (questionId: string, isAnswered: boolean) => {
        try {
            await answerAQuestion(questionId, !isAnswered)
        } catch(error) {
            // TODO: Tratar o erro
            console.error(error)
        }
    }, [answerAQuestion])

    /**
     * Remove a question
     */
    const handleRemoveQuestion = React.useCallback(async (questionId: string) => {
        try {
            if(window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
                await removeQuestion(questionId)
            }
        } catch(error) {
            // TODO: Tratar o erro
            console.error(error)
        }
    }, [removeQuestion])

    /**
     * Finish a room
     */
    const handleFinishRoom = React.useCallback(async () => {
        try {
            await finishRoom()
            history.push('/')
        } catch(error) {
            // TODO: Tratar o erro
            console.error(error)
        }
    }, [finishRoom, history])

    return (
        <Content>
            <Header id={id} onCloseRoom={handleFinishRoom}/>

            <S.Main>
                <S.Title>
                    <h1>Sala: {title}</h1>
                    {!!questions.length && <span>{`${questions.length} perguntas`}</span>}
                </S.Title>

                <div className="question-list">
                    <QuestionList 
                        questions={questions} 
                        onCheckQuestionAsAnswered={handleCheckQuestionAsAnswered}
                        onHighlightQuestion={handleHighlightQuestion}
                        onRemoveQuestion={handleRemoveQuestion}
                    />
                </div>
            </S.Main>
        </Content>
    )
}

