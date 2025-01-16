import { Typography, Box } from '@mui/material';
import LoginButton from './LoginButton';

const HomeLoggedOut = () => {
  return (
    <Box component="div">
      <Typography 
        variant="h1" 
        gutterBottom 
      >
        Welcome to Link Saver
      </Typography>
      <Typography 
        variant="h3" 
        gutterBottom 
      >
        Save and manage your favorite links easily and securely.
      </Typography>
      <LoginButton />
    </Box>
  );
};

export default HomeLoggedOut;