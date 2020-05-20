import React from 'react';
import { NavItems } from '../../config/Nav';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';

import './NavContainer.scss';


const NavContainer = () => {
  return (
    <React.Fragment>
      <AppBar position="fixed" className="NavContainer">
        <Toolbar>
          <IconButton edge="start" className={'test'} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={'NavTitle'}>
            APPLICATION
          </Typography>
          <AuthContext.Consumer>
            {context => (
              <ul className="NavItems">
                {NavItems.map((navItem) => {
                  return ((context.state.role === navItem.roles && context.state.authenticated === navItem.require_auth) ? <li key={navItem.id}><NavLink to={navItem.route}><Button color="inherit">{navItem.name}</Button></NavLink></li> : null);
                })}
              </ul>
            )}
          </AuthContext.Consumer>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavContainer;