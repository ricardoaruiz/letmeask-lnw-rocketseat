import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'components/Button'
import ilustrationImg from 'assets/images/illustration.svg'
import logoImg from 'assets/images/logo.svg'

import 'styles/auth.scss'

export const NewRoom = () => {

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

                    <form action="">
                        <input 
                            type="text" 
                            placeholder="Nome da sala" 
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}

