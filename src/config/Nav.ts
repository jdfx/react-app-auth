import { Roles } from './Roles';

//@todo update with interface

type NavMenu = {
    id: number,
    name: string;
    route: string;
    require_auth: boolean;
    roles: Roles.ADMIN | Roles.USER | Roles.UNAUTHENTICATED
}[];

const NavItems: NavMenu = [
    {
        id: 0,
        name: 'Dashboard',
        route: '/user/dash',
        require_auth: true, //show if authed
        roles: Roles.USER
    },
    {
        id: 1,
        name: 'Admin',
        route: '/admin/dash',
        require_auth: true, //show if authed
        roles: Roles.ADMIN
    },
    {
        id: 2,
        name: 'Login',
        route: '/auth/login',
        require_auth: false, //hide if authed
        roles: Roles.UNAUTHENTICATED
    },
];

export {
    NavItems
};