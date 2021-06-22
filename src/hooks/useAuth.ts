import React from "react"
import { AuthContext  } from 'context/AuthContext'


export const useAuth = () => {
    const context = React.useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthContext must be use inside a AuthContext provider')
    }

    return context
}
