import React from 'react'
import copyImg from 'assets/images/copy.svg'

import * as S from './RoomCode.style'

type RoomCodeProps = {
  roomCode: string
}

export const RoomCode = ({ roomCode }: RoomCodeProps) => {
  const handleCopyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(roomCode)
  }, [roomCode])

  return (
    <S.RoomCode onClick={handleCopyToClipboard}>
      <img src={copyImg} alt="Copy room code" />
      <span>Sala #{roomCode}</span>
    </S.RoomCode>
  )
}
