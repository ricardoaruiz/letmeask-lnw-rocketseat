import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Button } from 'components/Button'
import ilustrationImg from 'assets/images/illustration.svg'
import logoImg from 'assets/images/logo.svg'

import 'styles/auth.scss'
import { database } from 'services/firebase'
import { useAuth } from 'hooks/useAuth'

export const NewRoom = () => {
    const { user } = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = React.useState('')

    const handleCreateRoom = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')
        const firebaseRoom = roomRef
            .push({
                title: newRoom,
                authorId: user?.id
            }, 
            (error) => {
                if (error) {
                    // TODO: Tratar o erro
                    console.error('Erro ao inserir uma nova sala: ', error)
                    return
                }

                history.push(`/rooms/${firebaseRoom.key}`)
            })

    }, [history, newRoom, user?.id])

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

