import React from 'react'
import { render } from '@testing-library/react'
import { ChangeThemeContextProvider } from 'context/ChangeThemeContext'

export const renderWithTheme = (children: React.ReactNode) =>
  render(<ChangeThemeContextProvider>{children}</ChangeThemeContextProvider>)
