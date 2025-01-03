import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import Seo from '../components/Seo';

const HomePage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container maxWidth="sm">
      <Seo
        title="Login | Link Saver"
        description="Log in to Link Saver to save and manage your favorite links securely."
        keywords="login, link saver, account, secure links, save links"
        image="https://www.example.com/login-image.jpg"
        url="https://www.example.com/login"
      />
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Welcome to Link Saver
        </Typography>
        <Typography variant="body1" gutterBottom>
          Save and manage your favorite links easily and securely.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => loginWithRedirect()}
          sx={{ mt: 3 }}
        >
          Log In
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;