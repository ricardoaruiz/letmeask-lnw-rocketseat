import React from 'react'
import firebase from 'firebase/app'
import { database } from 'services/firebase'
import { useAuth } from './useAuth'

type UseRommType = {
  title: string
  questions: Question[]
  createRoom: (room: Room) => Promise<string | null>
  finishRoom: () => Promise<void>
  createNewQuestion: (question: Omit<Question, 'id'>) => Promise<void>
  removeQuestion: (questionId: string) => Promise<void>
  likeAQuestion: (
    questionId: string,
    userId: string,
    likeId: string | undefined
  ) => Promise<void>
  highlightAQuestion: (
    questionId: string,
    isHighlighted: boolean
  ) => Promise<void>
  answerAQuestion: (questionId: string, isAnswered: boolean) => Promise<void>
}

type Room = {
  title: string
  authorId: string
}

type Like = {
  authorId: string
}

export type Question = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount?: number
  likeId?: string
}

type FirebaseQuestions = Record<
  string,
  Omit<Question, 'id' | 'likeCount' | 'likeId'> & {
    likes: Record<string, Like>
  }
>

type FirebaseRoom = {
  authorId: string
  questions: FirebaseQuestions
  title: string
}

export const useRoom = (roomId?: string): UseRommType => {
  const { user } = useAuth()
  const [title, setTitle] = React.useState('')
  const [questions, setQuestions] = React.useState<Question[]>([])

  /**
   * Update view with new questions from firebase
   */
  const refreshQuestions = React.useCallback(():
    | firebase.database.Reference
    | undefined => {
    //https://firebase.google.com/docs/database/admin/retrieve-data#node.js_2
    if (!roomId) return

    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', (room) => {
      const databaseRoom: FirebaseRoom = room.val()
      const questions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parseQuestions = Object.entries(questions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: value.likes ? Object.values(value.likes).length : 0,
          likeId: value.likes
            ? Object.entries(value.likes).find(
                ([, like]) => like.authorId === user?.id
              )?.[0]
            : undefined
        } as Question
      })

      setTitle(databaseRoom.title)
      setQuestions(parseQuestions)
    })

    return roomRef
  }, [roomId, user?.id])

  /**
   * Create a new room
   */
  const createRoom = React.useCallback((room: Room): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const roomRef = database.ref('rooms')
      const firebaseRoom = roomRef.push(room, (error) => {
        if (error) {
          reject(`Erro ao criar uma nova sala: ${error}`)
          return
        }
        resolve(firebaseRoom.key)
      })
    })
  }, [])

  /**
   * Finish a room
   */
  const finishRoom = React.useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      const roomRef = database.ref(`rooms/${roomId}`)

      roomRef.update(
        {
          endedAt: new Date()
        },
        (error) => {
          if (error) {
            reject(`Erro ao remover pergunta: ${error}`)
            return
          }
          resolve()
        }
      )
    })
  }, [roomId])

  /**
   * Create a new question in a room
   */
  const createNewQuestion = React.useCallback(
    (question: Omit<Question, 'id'>): Promise<void> => {
      return new Promise((resolve, reject) => {
        const questionsRef = database.ref(`rooms/${roomId}/questions`)

        questionsRef.push(question, (error) => {
          if (error) {
            reject(`Erro ao inserir uma nova pergunta: ${error}`)
            return
          }
          resolve()
        })
      })
    },
    [roomId]
  )

  /**
   * Remove a question in a room
   */
  const removeQuestion = React.useCallback(
    (questionId: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const questionsRef = database.ref(
          `rooms/${roomId}/questions/${questionId}`
        )

        questionsRef.remove((error) => {
          if (error) {
            reject(`Erro ao remover pergunta: ${error}`)
            return
          }
          resolve()
        })
      })
    },
    [roomId]
  )

  /**
   * Like a question
   */
  const likeAQuestion = React.useCallback(
    (
      questionId: string,
      userId: string,
      likeId: string | undefined
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (!likeId) {
          const likesRef = database.ref(
            `rooms/${roomId}/questions/${questionId}/likes`
          )
          likesRef.push(
            {
              authorId: userId
            },
            (error) => {
              if (error) {
                reject(`Erro ao realizar o like na pergunta: ${error}`)
                return
              }
              resolve()
            }
          )
        } else {
          const likesRef = database.ref(
            `rooms/${roomId}/questions/${questionId}/likes/${likeId}`
          )
          likesRef.remove((error) => {
            if (error) {
              reject(`Erro ao realizar o unlike na pergunta: ${error}`)
              return
            }
            resolve()
          })
        }
      })
    },
    [roomId]
  )

  /**
   * Highlight a question
   */
  const highlightAQuestion = React.useCallback(
    (questionId: string, isHighlighted: boolean): Promise<void> => {
      return new Promise((resolve, reject) => {
        const questionRef = database.ref(
          `rooms/${roomId}/questions/${questionId}`
        )

        questionRef.update(
          {
            isHighlighted
          },
          (error) => {
            if (error) {
              reject(`Erro ao realizar o hightlight na pergunta: ${error}`)
              return
            }
            resolve()
          }
        )
      })
    },
    [roomId]
  )

  /**
   * Highlight a question
   */
  const answerAQuestion = React.useCallback(
    (questionId: string, isAnswered: boolean): Promise<void> => {
      return new Promise((resolve, reject) => {
        const questionRef = database.ref(
          `rooms/${roomId}/questions/${questionId}`
        )

        questionRef.update(
          {
            isAnswered
          },
          (error) => {
            if (error) {
              reject(
                `Erro ao marcar pergunta como respondida na pergunta: ${error}`
              )
              return
            }
            resolve()
          }
        )
      })
    },
    [roomId]
  )

  React.useEffect(() => {
    const refreshQuestionsRef = refreshQuestions()

    return () => {
      refreshQuestionsRef && refreshQuestionsRef.off('value')
    }
  }, [refreshQuestions])

  return {
    title,
    questions,
    createRoom,
    finishRoom,
    createNewQuestion,
    removeQuestion,
    likeAQuestion,
    highlightAQuestion,
    answerAQuestion
  }
}
