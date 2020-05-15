import React from 'react';
import NavContainer from './containers/Nav/NavContainer';
import { Container, Box } from '@material-ui/core';
import AuthContainer from './containers/Auth/AuthContainer';
import SubscriberDashboardContainer from './containers/Subscriber/DashContainer';
import AdminDashboardContainer from './containers/Admin/DashContainer';
import { Route, Switch } from 'react-router-dom';
import { initialAuthState, AuthContext } from './context/AuthContext';

function App() {
  return (
    <AuthContext.Provider value={initialAuthState}>
      <AuthContext.Consumer>
        {context => (
          <Box className="App">
            <header>
              <NavContainer />
            </header>
            <Container maxWidth="xl">
              <Box className="AppMain">
                <Switch>
                  {!context.authenticated ? <Route path="/auth" component={AuthContainer} /> : null }
                  {context.authenticated ? <Route path="/dash" component={SubscriberDashboardContainer} /> : null }
                  {context.authenticated ? <Route path="/admin" component={AdminDashboardContainer} /> : null }
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
