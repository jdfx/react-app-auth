import React, {createContext, useReducer} from 'react';
import {Roles} from '../../config/Roles';

// type authStoreType = {
//     state: {
//         authenticated: boolean;
//         role: Roles.ADMIN | Roles.USER | Roles.UNAUTHENTICATED;
//         registered: boolean;
//     };
//     dispatch?: any
// } problem with the way React.Provider ejects the store object and then useContext consumes it means we can't set a type for the store else typescript compiler complains - frustating, leaving this here incase find a way of fixing it

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
            localStorage.setItem("token", JSON.stringify(action.payload.token));
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