import { Typography, Container, Box, Grid, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import Seo from '../components/Seo';
import LoginButton from '../components/LoginButton';

const HomePage = () => {
  const theme = useTheme();
  const { isAuthenticated, user, isLoading } = useAuth0();

  return (
    <Container maxWidth="md">
      <Seo
        title={isAuthenticated ? `Welcome, ${user?.name}` : "Login | Link Saver"}
        description="Save and manage your favorite links securely."
        keywords="login, link saver, account, secure links, save links"
      />
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        {isLoading ? (
          <CircularProgress sx={{ color: theme.palette.primary.main }} />
        ) : isAuthenticated ? (
          <Box component="div">
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
          </Box>
        ) : (
          <Box component="div">
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
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;