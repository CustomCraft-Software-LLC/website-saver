import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const AuthProvider = ({ children }) => {
  return (
    <Auth0Provider
      domain="auth0-domain"
      clientId="auth0-client-id"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;