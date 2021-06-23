import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthContextProvider } from 'context/AuthContext';
import { Home, NewRoom, Room } from 'pages';

import 'styles/global.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
