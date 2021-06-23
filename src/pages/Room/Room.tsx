import React from 'react'
import { useParams } from 'react-router-dom'

import logoImg from 'assets/images/logo.svg'
import { Button } from 'components/Button'
import RoomCode from 'components/RoomCode'

import 'styles/room.scss'
import { useAuth } from 'hooks/useAuth'
import { database } from 'services/firebase'

type Question = {
    id: string,
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
}

type FirebaseQuestions = Record<string, Omit<Question, 'id'>>

type FirebaseRoom = {
    authorId: string,
    questions: FirebaseQuestions,
    title: string
}

type RoomParams = {
    id: string
}

export const Room = () => {
    const { id } = useParams<RoomParams>()
    const { user } = useAuth()
    const [newQuestion, setNewQuestion] = React.useState('')
    const [questions, setQuestions] = React.useState<Question[]>([])
    const [title, setTitle] = React.useState('')

    const handleSendQuestion = React.useCallback( async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(newQuestion.trim() === '') {
            return
        }
        if(!user) {
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

        try {
            await database.ref(`rooms/${id}/questions`).push(question)
            setNewQuestion('')
        } catch(error) {
            // TODO: tratar o erro
            console.error(error)
        }
         
    }, [id, newQuestion, user])

    React.useEffect(() => {
        const loadQuestions = async () => {
            await database.ref(`rooms/${id}`).on('value', room => {
                
                const databaseRoom: FirebaseRoom = room.val()
                const questions: FirebaseQuestions = databaseRoom.questions ?? {}

                const parseQuestions = Object.entries(questions).map(([key, value]) => {
                    return {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isHighlighted: value.isHighlighted,
                        isAnswered: value.isAnswered
                    } as Question
                })

                setTitle(databaseRoom.title)
                setQuestions(parseQuestions)
            })
        }
        loadQuestions()

    }, [id])

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
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

                <ul>
                    {questions.map(question => (
                        <li>{question.content}</li>
                    ))}
                </ul>
            </main>
        </div>
    )
}

