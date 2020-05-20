import {Roles} from '../../config/Roles';

type initialAuthStateType = {
    authenticated: boolean;
    role: Roles.ADMIN | Roles.USER | Roles.UNAUTHENTICATED
}

export default initialAuthStateType;