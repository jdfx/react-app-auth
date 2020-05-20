import React from 'react';
import NavContainer from './containers/Nav/NavContainer';
import { Container, Box } from '@material-ui/core';
import AuthContainer from './containers/Auth/AuthContainer';
import SubscriberDashboardContainer from './containers/Subscriber/DashContainer';
import AdminDashboardContainer from './containers/Admin/DashContainer';
import { Route, Switch } from 'react-router-dom';
import { initialAuthState, AuthContext } from './context/Auth/AuthContext';
import { authReducer } from './reducers/Auth/AuthReducer';
import { Roles } from './config/Roles';

function App() {

  const [state, dispatch] = React.useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      <AuthContext.Consumer>
        {context => (
          <Box className="App">
            <header>
              <NavContainer />
            </header>
            <Container maxWidth="xl">
              <Box className="AppMain">
                <Switch>
                  {!context.state.authenticated ? <Route path="/auth" component={AuthContainer} /> : null }
                  {(context.state.authenticated && context.state.role === Roles.USER) ? <Route path="/user/dash" component={SubscriberDashboardContainer} /> : null }
                  {(context.state.authenticated && context.state.role === Roles.ADMIN) ? <Route path="/admin" component={AdminDashboardContainer} /> : null }
                </Switch>
              </Box>
            </Container>
          </Box>
        )}
      </AuthContext.Consumer>
    </AuthContext.Provider>
  );
}

export default App;
