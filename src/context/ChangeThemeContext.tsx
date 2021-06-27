import React from 'react'
import { createContext } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { dark, light } from 'styles/themes'

type ChangeThemeContextType = {
  currentTheme: 'dark' | 'light'
  toggleTheme: () => void
}

type ChangeThemeContextProviderProps = {
  children: React.ReactNode
}

const themes = {
  dark,
  light
}

export const ChangeThemeContext = createContext<ChangeThemeContextType>(
  {} as ChangeThemeContextType
)

export const ChangeThemeContextProvider = ({
  children
}: ChangeThemeContextProviderProps) => {
  const [theme, setTheme] = React.useState<DefaultTheme>(light)
  const [currentTheme, setCurrentTheme] = React.useState<'dark' | 'light'>(
    'light'
  )

  const toggleTheme = React.useCallback(() => {
    const newCurrentTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(themes[newCurrentTheme])
    setCurrentTheme(newCurrentTheme)
  }, [currentTheme])

  return (
    <ChangeThemeContext.Provider
      value={{
        currentTheme,
        toggleTheme
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ChangeThemeContext.Provider>
  )
}
