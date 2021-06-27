import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/test/helpers'
import { Button } from 'components'
import { light } from 'styles/themes'

describe('<Button />', () => {
  it('should render correctly', () => {
    renderWithTheme(<Button>Click here</Button>)

    const button = screen.getByRole('button', { name: /click here/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle({
      'background-color': light.colors.primary,
      color: light.colors.white
    })
  })

  it('should render outlined', () => {
    renderWithTheme(<Button isOutlined>Click here</Button>)

    const button = screen.getByRole('button', { name: /click here/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle({
      'background-color': 'transparent',
      color: light.colors.primary
    })
  })
})
