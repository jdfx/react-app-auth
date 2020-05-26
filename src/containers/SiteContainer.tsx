import React from 'react';
import NavContainer from './Nav/NavContainer';
import UserDashboardContainer from './User/DashContainer';
import AdminDashboardContainer from './Admin/DashContainer';
import AuthContainer from './Auth/AuthContainer';
import { Container, Box } from '@material-ui/core';
import { authStoreContext } from '../store/Auth/AuthStore';
import { Route, Switch } from 'react-router-dom';
import { Roles } from '../config/Roles';

function SiteContainer() {

    let authStore = React.useContext(authStoreContext);

    return (
        <Box className="App">
            <header>
                <NavContainer />
            </header>
            <Container maxWidth="xl">
                <Box className="AppMain">
                    <Switch>
                        <Route path="/auth" component={AuthContainer} />
                        {(authStore.state.authenticated && authStore.state.role === Roles.USER) ? <Route path="/user/dash" component={UserDashboardContainer} /> : null}
                        {(authStore.state.authenticated && authStore.state.role === Roles.ADMIN) ? <Route path="/admin/dash" component={AdminDashboardContainer} /> : null}
                    </Switch>
                </Box>
            </Container>
        </Box>
    );
}

export default SiteContainer;


