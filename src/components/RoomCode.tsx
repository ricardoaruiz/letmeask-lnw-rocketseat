import React from 'react'
import copyImg from 'assets/images/copy.svg'

import 'styles/room-code.scss'

type RoomCodeProps = {
    roomCode: string
}

export const RoomCode = ({ roomCode }: RoomCodeProps) => {

    const handleCopyToClipboard = React.useCallback(() => {
        navigator.clipboard.writeText(roomCode)
    }, [roomCode])

    return (
        <button className="room-code" onClick={handleCopyToClipboard}>
            <img src={copyImg} alt="Copy room code" />
            <span>Sala #{roomCode}</span>
        </button>
    )
}

