import React from 'react';
import { NavItems } from '../../config/Nav';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, useHistory } from 'react-router-dom';
import { authStoreContext } from '../../store/Auth/AuthStore';

import './NavContainer.scss';

const NavContainer = () => {

  let authStore = React.useContext(authStoreContext);
  let { dispatch } = authStore; let authDispatch = dispatch;
  let history = useHistory();

  const handleLogout = () => {
    authDispatch({
      type: 'LOGOUT'
    });
    history.push('/auth/login');
  }

  return (
    <React.Fragment>
      <AppBar position="fixed" className="NavContainer">
        <Toolbar>
          <IconButton edge="start" className={'menuIcon'} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={'NavTitle'}>
            APPLICATION            
          </Typography>
              <ul className="NavItems">
                {NavItems.map((navItem) => {
                  return ((authStore.state.role === navItem.roles && authStore.state.authenticated === navItem.require_auth) ? <li key={navItem.id}><NavLink to={navItem.route}><Button color="inherit">{navItem.name}</Button></NavLink></li> : null);
                })}
                {authStore.state.authenticated ? <li><Button onClick={() => handleLogout()} color="inherit">LOGOUT</Button></li> : null}
              </ul>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavContainer;