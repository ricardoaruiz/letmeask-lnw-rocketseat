import React from 'react'
import { useParams } from 'react-router-dom'

import { Button, Content, Header, QuestionList } from 'components'

import { useAuth } from 'hooks/useAuth'
import { useRoom } from 'hooks/useRoom'

import * as S from './Room.style'

type RoomParams = {
    id: string
}

export const Room = () => {
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
        <Content>
            <Header id={id} />

            <S.Main>
                <S.Title>
                    <h1>Sala: {title}</h1>
                    {!!questions.length && <span>{`${questions.length} perguntas`}</span>}
                </S.Title>

                <S.Form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        value={newQuestion}
                        onChange={event => setNewQuestion(event.target.value)}
                    />

                    <S.Footer>
                        {user ? (
                            <S.UserInfo>
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </S.UserInfo>
                        ) : (
                            <span>
                                Para enviar uma pergunta, 
                                <button>faça seu login</button>
                            </span>)}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </S.Footer>
                </S.Form>

                <div>
                    <QuestionList 
                        questions={questions} 
                        onLikeQuestion={handleLikeQuestion} 
                    />
                </div>
            </S.Main>
        </Content>
    )
}

