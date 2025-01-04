import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Grid, Button, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import Seo from '../components/Seo';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

const HomePage = () => {
  const theme = useTheme();
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <Container maxWidth="md">
      <Seo title={isAuthenticated ? `Welcome, ${user?.name}` : "Login | Link Saver"} description="Save and manage your favorite links securely." keywords="login, link saver, account, secure links, save links" />
      <Box mt={8} textAlign="center">
        {loading ? (
          <CircularProgress sx={{ color: theme.palette.primary.main }} />
        ) : (
          <React.Fragment>
            {isAuthenticated ? (
              <React.Fragment>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Welcome Back, {user?.name}!</Typography>
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.secondary }}>Start managing your saved links below.</Typography>
                <Grid container justifyContent="center" spacing={3}>
                  <Grid item><Button variant="contained" color="primary" href="/dashboard" sx={{ mt: 2 }}>Go to Dashboard</Button></Grid>
                  <Grid item><LogoutButton /></Grid>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Welcome to Link Saver</Typography>
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.secondary }}>Save and manage your favorite links easily and securely.</Typography>
                <Grid container justifyContent="center" spacing={3}>
                  <Grid item><LoginButton /></Grid>
                </Grid>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Box>
      <Box mt={10} bgcolor={theme.palette.background.paper} p={5} borderRadius={2}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Why Choose Link Saver?</Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>Link Saver is a secure, private space to manage your important links and access them wherever you go.</Typography>
      </Box>
    </Container>
  );
};

export default HomePage;