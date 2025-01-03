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
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}
            >
              Learn More
            </Button>
          </Grid>
          <Grid item>
            <LoginButton />
          </Grid>
        </Grid>
      </Box>
      <Box mt={10} bgcolor={theme.palette.background.paper} p={5} borderRadius={2}>
        <Typography 
          variant="h5" 
          paragraph 
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}
        >
          Why Choose Link Saver?
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ color: theme.palette.text.primary }}
        >
          Link Saver is more than just a bookmarking tool. It's a secure, private space where you can manage your most important links, and access them wherever you go.
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ color: theme.palette.text.primary }}
        >
          With Link Saver, you can:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" color={theme.palette.text.secondary}>Save links from any device</Typography>
          </li>
          <li>
            <Typography variant="body1" color={theme.palette.text.secondary}>Organize links with custom folders</Typography>
          </li>
          <li>
            <Typography variant="body1" color={theme.palette.text.secondary}>Access links securely with our encrypted storage</Typography>
          </li>
        </ul>
      </Box>
    </Container>
  );
};

export default HomePage;