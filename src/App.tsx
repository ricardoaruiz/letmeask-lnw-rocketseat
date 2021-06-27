import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { GlobalStyle } from 'styles'

import { AuthContextProvider } from 'context/AuthContext'
import { Home, AdminRoom, NewRoom, Room } from 'pages'
import { ChangeThemeContextProvider } from 'context/ChangeThemeContext'

export const App = () => {
  return (
    <BrowserRouter>
      <ChangeThemeContextProvider>
        <AuthContextProvider>
          <GlobalStyle />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" exact component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </ChangeThemeContextProvider>
    </BrowserRouter>
  )
}

export default App
