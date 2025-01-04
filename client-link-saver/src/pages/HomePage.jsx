import { Typography, Container, Box, Grid, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import Seo from '../components/Seo';
import LoginButton from '../components/Login';
import LogoutButton from '../components/Logout';

const HomePage = () => {
  const theme = useTheme();
  const { isAuthenticated, user } = useAuth0();

  return (
    <Container maxWidth="md">
      <Seo
        title={isAuthenticated ? `Welcome, ${user?.name}` : "Login | Link Saver"}
        description="Save and manage your favorite links securely."
        keywords="login, link saver, account, secure links, save links"
      />
      <Box mt={8} textAlign="center">
        {isAuthenticated ? (
          <>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
            >
              Welcome Back, {user?.name}!
            </Typography>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ color: theme.palette.text.secondary }}
            >
              Start managing your saved links below.
            </Typography>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  href="/dashboard"
                  sx={{ mt: 2 }}
                >
                  Go to Dashboard
                </Button>
              </Grid>
              <Grid item>
                <LogoutButton />
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
            >
              Welcome to Link Saver
            </Typography>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ color: theme.palette.text.secondary }}
            >
              Save and manage your favorite links easily and securely.
            </Typography>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item>
                <LoginButton />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
      <Box mt={10} bgcolor={theme.palette.background.paper} p={5} borderRadius={2}>
        <Typography 
          variant="h5" 
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}
        >
          Why Choose Link Saver?
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: theme.palette.text.primary }}
        >
          Link Saver is more than just a bookmarking tool. It’s a secure, private space 
          where you can manage your most important links and access them wherever you go.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;