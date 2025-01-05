import { Typography, Box, useTheme } from '@mui/material';

const HomeLoggedIn = ({ user }) => {
  const theme = useTheme(); 
  return (
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
  );
};

export default HomeLoggedIn;