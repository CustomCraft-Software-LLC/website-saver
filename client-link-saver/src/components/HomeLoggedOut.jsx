import { Typography, Box, Grid, useTheme } from '@mui/material';
import LoginButton from './LoginButton';

const HomeLoggedOut = () => {
  const theme = useTheme(); 
  return (
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
  );
};

export default HomeLoggedOut;