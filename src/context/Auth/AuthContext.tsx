import React from 'react';
import {Roles} from '../../config/Roles';
// import initialAuthContextType from './AuthContextType'; @ todo - can we put this back in, so no 'any'? Causing issues with useReducer

const initialAuthState : any = {
    authenticated: false,
    role: Roles.UNAUTHENTICATED,
    registered: false
}

const AuthContext = React.createContext(initialAuthState);

export {
    AuthContext,
    initialAuthState
 };