import React from 'react';
import Register from '../../components/Auth/Register';
import Login from '../../components/Auth/Login';

import './AuthContainer.scss';

const AuthContainer = () => {
    return (
    <React.Fragment>
        <Login/>
        <Register/>
    </React.Fragment>
    );
};

export default AuthContainer;