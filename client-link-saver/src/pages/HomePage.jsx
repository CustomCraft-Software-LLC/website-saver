import { Typography, Container, Box, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Seo from '../components/Seo';
import LoginButton from '../components/Login';

const HomePage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Seo
        title="Login | Link Saver"
        description="Log in to Link Saver to save and manage your favorite links securely."
        keywords="login, link saver, account, secure links, save links"
        image="https://www.example.com/login-image.jpg"
        url="https://www.example.com/login"
      />
      <Box mt={8} textAlign="center">
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
          Link Saver is more than just a bookmarking tool. Its a secure, private space where you can manage your most important links, and access them wherever you go.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;