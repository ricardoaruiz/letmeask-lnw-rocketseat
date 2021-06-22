import React from 'react'

import { firebase, auth } from 'services/firebase'

type User = {
    id: string
    name: string
    email: string
    avatar: string
}

type AuthContextType = {
    user?: User
    signinWithGoogle: () => Promise<void>
}

export const AuthContext = React.createContext({} as AuthContextType);

type AuthContextProviderProps = {
    children: React.ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    
    const [user, setUser] = React.useState<User>();

    /**
     * Se user on context state
     */
    const fillUser = React.useCallback((user: firebase.User | null) => {
        if (user) {
            const { displayName, photoURL, email, uid } = user

            if (!displayName || !photoURL || !email) {
                throw new Error('Missing information from Google Account')
            }

            setUser({
                id: uid,
                name: displayName,
                email,
                avatar: photoURL,
            })
        }
    }, [])

    /**
     * Performe a signin with google
     */
    const signinWithGoogle = React.useCallback(async (): Promise<void> => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider)     
        fillUser(result.user)
    }, [fillUser]);

    // Refaz o estado de autenticação em caso de atualização da página (F5)
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => fillUser(user))

        // Remove o subscribe
        return () => {
            unsubscribe()
        }
    }, [fillUser])

    return (
        <AuthContext.Provider value={{
            user,
            signinWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}
