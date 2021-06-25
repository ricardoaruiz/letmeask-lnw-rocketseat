import React from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from 'hooks/useAuth'

import { Button } from 'components/Button'
import ilustrationImg from 'assets/images/illustration.svg'
import logoImg from 'assets/images/logo.svg'
import googleIconImg from 'assets/images/google-icon.svg'
import { database } from 'services/firebase'

import 'styles/auth.scss'


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
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salar de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas de sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="" />
                    
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="" />
                        Crie a sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

