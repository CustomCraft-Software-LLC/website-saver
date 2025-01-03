import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react'; 
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        {isAuthenticated ? (
          <Button color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={loginWithRedirect}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;