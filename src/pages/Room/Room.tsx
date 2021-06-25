import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import logoImg from 'assets/images/logo.svg'
import { ReactComponent as LikeImg } from 'assets/images/like.svg'

import { Button } from 'components/Button'
import { RoomCode } from 'components/RoomCode'
import {Question as QuestionItem } from 'components/Question'

import { useAuth } from 'hooks/useAuth'
import { useRoom } from 'hooks/useRoom'

import 'styles/room.scss'
import classNames from 'classnames'

type RoomParams = {
    id: string
}

export const Room = () => {
    const history = useHistory()
    const { id } = useParams<RoomParams>()
    const { user } = useAuth()
    const [newQuestion, setNewQuestion] = React.useState('')
    const { title, questions, createNewQuestion, likeAQuestion } = useRoom(id)

    const handleSendQuestion = React.useCallback( async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()

            if(newQuestion.trim() === '') {
                return
            }
            if(!user) {
                // TODO: Tratar o erro
                throw new Error('You must be logged in')
            }

            const question = {
                content: newQuestion,
                author: {
                    name: user.name,
                    avatar: user.avatar
                },
                isHighlighted: false,
                isAnswered: false
            }

            await createNewQuestion(question)
            setNewQuestion('')
        } catch(error) {
            // TODO: Tratar o erro
            console.error(error)
        }
    }, [createNewQuestion, newQuestion, user])

    /**
     * Like a questions
     */
    const handleLikeQuestion = React.useCallback(async (questionId: string, likeId: string | undefined) => {
        try {
            await likeAQuestion(questionId, user!.id, likeId)
        } catch(error) {
            // TODO: Tratar o erro
            console.error(error)
        }
    }, [likeAQuestion, user])

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" onClick={() => history.push('/')} />
                    <RoomCode roomCode={id} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    {!!questions.length && <span>{`${questions.length} perguntas`}</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        value={newQuestion}
                        onChange={event => setNewQuestion(event.target.value)}
                    />

                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>
                                Para enviar uma pergunta, 
                                <button>faça seu login</button>
                            </span>)}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                <div className="question-list">
                    {questions.map(({id, content, author, likeId, likeCount, isAnswered, isHighlighted}) => (
                        <QuestionItem 
                            key={id} 
                            content={content} 
                            author={author}
                            isAnswered={isAnswered}
                            isHighLighted={isHighlighted}
                        >
                            {!isAnswered && (
                                <button 
                                    type="button"
                                    className={classNames({
                                        'like-button': true,
                                        liked : !!likeId
                                    })}
                                    aria-label="marcar como gostei"
                                    onClick={() => handleLikeQuestion(id, likeId)}
                                    >
                                    {likeCount && <span>{likeCount}</span>}
                                    <LikeImg />
                                </button>
                            )}
                        </QuestionItem>
                    ))}
                </div>
            </main>
        </div>
    )
}

