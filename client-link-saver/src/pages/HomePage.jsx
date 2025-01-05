import { Container, Box, CircularProgress } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import Seo from '../components/Seo';
import HomeLoggedIn from '../components/HomeLoggedIn';
import HomeLoggedOut from '../components/HomeLoggedOut';
import { useTheme } from '@mui/material/styles';

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
          <HomeLoggedIn user={user} />
        ) : (
          <HomeLoggedOut />
        )}
      </Box>
    </Container>
  );
};

export default HomePage;