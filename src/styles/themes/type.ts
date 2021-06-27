export interface Theme {
  colors: {
    primary: string
    black: string
    white: string
    lightWhite: string
    gray: string
    lightGray: string
    highlighted: string
    answered: string
    regularText: string
    googleRed: string
    body: string
  }
  font: {
    family: {
      roboto: string
      poppins: string
    }
    weight: {
      regular: number
      medium: number
      bold: number
    }
  }
  shadow: '0px 2px 12px rgba(0, 0, 0, 0.04)'
}
