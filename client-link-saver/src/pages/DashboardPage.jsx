import { Typography, Container, Box, Button, CircularProgress, Alert } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import useDialogState from '../hooks/useDialogState';
import LinksList from '../components/LinksList';
import AddLinkDialog from '../components/AddLinkDialog';

const DashboardPage = () => {
  const { user } = useAuth0();
  const { open, openDialog, closeDialog } = useDialogState();

  const renderLoading = () => (
    <Box mt={3} textAlign="center">
      <CircularProgress />
      <Typography variant="body2" mt={2}>
        Loading your links...
      </Typography>
    </Box>
  );

  const renderError = () => (
    <Box mt={3}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.email || 'User'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Manage your saved links below.
        </Typography>

        {loading && renderLoading()}
        {error && renderError()}

        {!loading && !error && <LinksList links={links} />}

        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={openDialog}>
            Add New Link
          </Button>
        </Box>
      </Box>

      <AddLinkDialog open={open} onClose={closeDialog} onAddLink={addLink} />
    </Container>
  );
};

export default DashboardPage;