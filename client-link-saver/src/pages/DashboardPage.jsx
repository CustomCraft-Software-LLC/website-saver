import { Typography, Container, Box, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import useLinks from '../hooks/useLinks';
import useDialogState from '../hooks/useDialogState';
import LinksList from '../components/LinksList';
import AddLinkDialog from '../components/AddLinkDialog';

const DashboardPage = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { links, addLink, loading, error } = useLinks(getAccessTokenSilently, isAuthenticated);
  const { open, openDialog, closeDialog } = useDialogState();

  return (
    <Container maxWidth="md" component="main">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.email || 'User'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Manage your saved links below.
        </Typography>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <LinksList links={links} />
        <Box mt={3}>
          <Button variant="contained" onClick={openDialog}>
            Add Link
          </Button>
        </Box>
      </Box>
      <AddLinkDialog
        open={open}
        onClose={closeDialog}
        onAddLink={addLink}
      />
    </Container>
  );
};

export default DashboardPage;