import React from 'react'
import { useParams } from 'react-router-dom'

type RoomParams = {
    id: string
}

export const Room = () => {
    const { id } = useParams<RoomParams>()

    return (
        <div>
            Room - {id}
        </div>
    )
}

