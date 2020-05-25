import React from 'react';
import NavContainer from './Nav/NavContainer';
import SubscriberDashboardContainer from './Subscriber/DashContainer';
import AdminDashboardContainer from './Admin/DashContainer';
import AuthContainer from './Auth/AuthContainer';
import { Container, Box } from '@material-ui/core';
import { authStoreContext } from '../store/Auth/AuthStore';
import { Route, Switch } from 'react-router-dom';
import { Roles } from '../config/Roles';

function App() {

    const authStore = React.useContext(authStoreContext);

    return (
        <Box className="App">
            <header>
                <NavContainer />
            </header>
            <Container maxWidth="xl">
                <Box className="AppMain">
                    <Switch>
                        {!authStore.authenticated ? <Route path="/auth" component={AuthContainer} /> : null}
                        {(authStore.authenticated && authStore.role === Roles.USER) ? <Route path="/user/dash" component={SubscriberDashboardContainer} /> : null}
                        {(authStore.authenticated && authStore.role === Roles.ADMIN) ? <Route path="/admin" component={AdminDashboardContainer} /> : null}
                    </Switch>
                </Box>
            </Container>
        </Box>
    );
}

export default App;


