import React from 'react'

type ButtonProps = {
    children: React.ReactNode
}

export const Button = ({ children }: ButtonProps ) => {
    const [counter, setCounter] = React.useState(0)

    const increment = React.useCallback(() => {
        setCounter(state => state + 1)
    }, [])

    return (
        <button onClick={increment}>{`${children} ${counter}`}</button>
    )
}

