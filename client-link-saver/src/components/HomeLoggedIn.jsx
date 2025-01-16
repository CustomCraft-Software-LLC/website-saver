import { Typography, Box, Card, CardMedia, Button } from '@mui/material';

const HomeLoggedIn = ({ user }) => {
  const randomImageUrl = `https://picsum.photos/600/400`;

  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        p: 3 
      }}
    >
      <Typography 
        variant="h1" 
        gutterBottom
      >
        Welcome Back, {user?.name || 'Guest'}!
      </Typography>

      <Card 
        sx={{ 
          maxWidth: 400, 
          margin: '20px auto', 
          borderRadius: '50%', 
          overflow: 'hidden' 
        }}
      >
        <CardMedia
          component="img"
          image={randomImageUrl}
          alt="Random image from Picsum"
        />
      </Card>

      <Typography 
        variant="h3" 
        gutterBottom
      >
        Start managing your saved links below.
      </Typography>

      <Button 
        variant="contained" 
        onClick={() => window.location.href = '/dashboard'}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default HomeLoggedIn;