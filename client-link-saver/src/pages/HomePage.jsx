import { Container, Box, CircularProgress } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import HomeLoggedIn from '../components/HomeLoggedIn';
import HomeLoggedOut from '../components/HomeLoggedOut';
import { useTheme } from '@mui/material/styles';

const HomePage = () => {
  const theme = useTheme(); 
  const { isAuthenticated, user, isLoading } = useAuth0();

  return (
    <Container maxWidth="md">
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