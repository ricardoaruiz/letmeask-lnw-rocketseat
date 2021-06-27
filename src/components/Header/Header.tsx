import React from 'react'
import { useHistory } from 'react-router-dom'
import Switch from 'react-switch'

import logoImg from 'assets/images/logo.svg'

import { useChangeTheme } from 'hooks/useChangeTheme'
import { Button, RoomCode } from 'components'

import * as S from './Header.style'

type HeaderProps = {
  id: string
  onCloseRoom?: () => void
}

export const Header = ({ id, onCloseRoom }: HeaderProps) => {
  const history = useHistory()
  const { toggleTheme, currentTheme } = useChangeTheme()

  return (
    <S.Header>
      <S.Content>
        <img src={logoImg} alt="Letmeask" onClick={() => history.push('/')} />
        <S.Buttons>
          <RoomCode roomCode={id} />
          {!!onCloseRoom && (
            <Button isOutlined onClick={onCloseRoom}>
              Encerrar sala
            </Button>
          )}
          <Switch onChange={toggleTheme} checked={currentTheme === 'dark'} />
        </S.Buttons>
      </S.Content>
    </S.Header>
  )
}
