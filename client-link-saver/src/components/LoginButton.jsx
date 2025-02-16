import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button variant="contained" color="primary" fullWidth sx={{ mt: 5 }} onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export default LoginButton;