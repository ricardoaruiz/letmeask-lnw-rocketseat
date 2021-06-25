import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import logoImg from 'assets/images/logo.svg'

import { useAuth } from 'hooks/useAuth'
import { useRoom } from 'hooks/useRoom'

import { Button, MainContent, MainIlustration, MainLayout } from 'components'

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
        <MainLayout>
            <aside>
                <MainIlustration />
            </aside>
            <main>
                <MainContent>

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

                </MainContent>
            </main>
        </MainLayout>
    )
}

