import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import logoImg from 'assets/images/logo.svg'

import { ReactComponent as CheckImg } from 'assets/images/check.svg'
import { ReactComponent as AnswerImg } from 'assets/images/answer.svg'
import { ReactComponent as DeleteImg } from 'assets/images/delete.svg'

import { Button } from 'components/Button'
import { RoomCode } from 'components/RoomCode'
import {Question as QuestionItem } from 'components/Question'

import { useRoom } from 'hooks/useRoom'

import 'styles/room.scss'

type RoomParams = {
    id: string
}

export const AdminRoom  = () => {
    const history = useHistory()
    const { id } = useParams<RoomParams>()
    const { title, questions, removeQuestion, finishRoom  } = useRoom(id)

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
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" onClick={() => history.push('/')} />
                    <div className="header-buttons">
                        <RoomCode roomCode={id} />
                        <Button isOutlined onClick={handleFinishRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    {!!questions.length && <span>{`${questions.length} perguntas`}</span>}
                </div>

                <div className="question-list">
                    {questions.map(({id, content, author}) => (
                        <QuestionItem 
                            key={id} 
                            content={content} 
                            author={author} 
                        >
                            <button 
                                type="button"
                                aria-label="finish this room"
                            >
                                <CheckImg />
                            </button>

                            <button 
                                type="button"
                                aria-label="answer this question"
                            >
                                <AnswerImg />
                            </button>

                            <button 
                                type="button"
                                aria-label="remove this question"
                                onClick={() => handleRemoveQuestion(id)}
                            >
                                <DeleteImg />
                            </button>

                        </QuestionItem>
                    ))}
                </div>
            </main>
        </div>
    )
}
