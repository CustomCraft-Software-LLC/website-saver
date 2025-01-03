import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App.jsx';
import theme from './assets/theme';

const domain = 'auth0-domain';
const clientId = 'auth0-client-id';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Auth0Provider>
    </Router>
  </StrictMode>
);