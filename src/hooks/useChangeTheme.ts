import { useContext } from 'react'
import { ChangeThemeContext } from 'context/ChangeThemeContext'

export const useChangeTheme = () => {

    const context = useContext(ChangeThemeContext)

    if (!context) {
        throw new Error('useChangeTheme may be use under ChangeThemeContext')
    }

    return context

}