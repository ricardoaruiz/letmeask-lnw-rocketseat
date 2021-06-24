import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import ilustrationImg from 'assets/images/illustration.svg'
import logoImg from 'assets/images/logo.svg'

import { Button } from 'components/Button'

import { useAuth } from 'hooks/useAuth'
import { useRoom } from 'hooks/useRoom'

import 'styles/auth.scss'

export const NewRoom = () => {
    const { user } = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = React.useState('')
    const { createRoom } = useRoom()

    const handleCreateRoom = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()

            if (newRoom.trim() === '') {
                return
            }

            const roomId = await createRoom({
                title: newRoom,
                authorId: user!.id
            })
            history.push(`/rooms/${roomId}`)
            
        } catch(error) {
            // TODO: Tratar o erro
            console.error(error)
        }

    }, [createRoom, history, newRoom, user])

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
                    
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={(event) => setNewRoom(event.target.value)}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}

