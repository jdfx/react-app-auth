import React from 'react';
import Register from '../../components/Auth/Register';
import Login from '../../components/Auth/Login';
import ResetPassword from '../../components/Auth/ResetPassword';
import { Route } from 'react-router-dom';

import './AuthContainer.scss';

const AuthContainer = () => {
    return (
    <React.Fragment>
        <Route exact path="/auth/login" component={Login}/>
        <Route exact path="/auth/register" component={Register}/>
        <Route exact path="/auth/reset" component={ResetPassword}/>
    </React.Fragment>
    );
};

export default AuthContainer;