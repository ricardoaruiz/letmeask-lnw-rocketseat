import React from 'react'
import ilustrationImg from 'assets/images/illustration.svg'

import * as S from './MainIlustration.style'

export const MainIlustration = () => {
    return (
        <S.MainIlustration>
            <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
            <strong>Crie salar de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas de sua audiência em tempo real</p>
        </S.MainIlustration>
    )
}
