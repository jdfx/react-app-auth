import React, {createContext, useReducer} from 'react';
import {Roles} from '../../config/Roles';

const initialState : any = {
    authenticated: false,
    role: Roles.UNAUTHENTICATED,
    registered: false
}

const authStoreContext = createContext(initialState);
const { Provider } = authStoreContext;

const AuthStateProvider = (components:any) => {

    const [state, dispatch] = useReducer((state:any, action:any) => {
        switch(action.type) {
            case 'REGISTER' :
            return {
                ...state,
                registered: true
            }
            case 'LOGIN' : 
            if(action.payload.token) {localStorage.setItem("auth_token", action.payload.token);}
            return {
                ...state,
                authenticated: true,
                registered: true,
                role: (action.payload.user.role === "user") ? Roles.USER : (action.payload.user.role === "admin") ? Roles.ADMIN : Roles.UNAUTHENTICATED
            }
            case 'LOGOUT' : 
                localStorage.clear();
            return {
                ...state,
                authenticated: false,
                role: Roles.UNAUTHENTICATED
            }
            default :
            return state;
        }
      }, initialState);

    return <Provider value={{ state, dispatch }}>{components.children}</Provider>;
};

export { authStoreContext, AuthStateProvider }