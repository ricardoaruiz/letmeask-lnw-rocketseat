import React from 'react'
import { useHistory } from 'react-router-dom'

import logoImg from 'assets/images/logo.svg'
import googleIconImg from 'assets/images/google-icon.svg'

import { database } from 'services/firebase'
import { useAuth } from 'hooks/useAuth'
import { Button, MainContent, MainIlustration, MainLayout } from 'components'

import * as S from './Home.style'

export const Home = () => {
    const history = useHistory();
    const { user, signinWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = React.useState('')

    /**
     * Create a new room
     */
    const handleCreateRoom = React.useCallback(async () => {
        if (user) {
            history.push('/rooms/new');
            return;
        }
                
        try {
            await signinWithGoogle()
            history.push('/rooms/new')
        } catch(error) {
            // TODO: tratar o erro
            console.error(error)
        }
    }, [history, signinWithGoogle, user])

    /**
     * Access an existing room
     */
    const handleJoinRoom = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(roomCode.trim() === ''){
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if (!roomRef.exists()) {
            alert('Room does not exists.')
            return
        }

        if(roomRef.val().endedAt) {
            alert('This room is closed.')
            return
        }

        history.push(`/rooms/${roomCode}`)

    }, [history, roomCode])

    return (
        <MainLayout>
            <aside>
                <MainIlustration />
            </aside>
            <main>
                <MainContent>
                    
                    <img src={logoImg} alt="" />
                    
                    <S.CreateRoom onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="" />
                        Crie a sua sala com o Google
                    </S.CreateRoom>

                    <S.Separator>ou entre em uma sala</S.Separator>

                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>

                </MainContent>
            </main>
        </MainLayout>
    )
}

