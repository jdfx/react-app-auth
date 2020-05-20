import { Roles } from '../../config/Roles';

const authReducer = (authState : any, action : any) => { //@todo can we tidy this up without : any?

    switch(action.type) {
        case 'REGISTER' : 
        localStorage.setItem("user", JSON.stringify(action.payload.name));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        return {
            ...authState,
            authenticated: true,
            role: Roles.USER
        }
        case 'LOGIN' : 
        localStorage.setItem("user", JSON.stringify(action.payload.name));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        return {
            ...authState,
            authenticated: true,
            role: Roles.USER
        }
        case 'LOGOUT' : 
            localStorage.clear();
        return {
            ...authState,
            authenticated: false,
            role: Roles.UNAUTHENTICATED
        }
        default :
        return authState;
    }

};

export {
    authReducer
}