import React from 'react';
import {Roles} from '../config/Roles';

const initialAuthState = {
    authenticated: false,
    role: Roles.UNAUTHENTICATED,
    login: () => {}
}

const AuthContext = React.createContext(initialAuthState);

export {
    AuthContext,
    initialAuthState
 };