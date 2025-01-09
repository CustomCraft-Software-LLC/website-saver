import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography, Container, Box, Button } from '@mui/material';
import axios from 'axios';
import LinksList from '../components/LinksList';
import AddLinkDialog from '../components/AddLinkDialog';

const DashboardPage = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [links, setLinks] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchLinks = async () => {
        const token = await getAccessTokenSilently();
        const { data } = await axios.get('https://website-saver.onrender.com/api/links', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLinks(data);
      };
      fetchLinks();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleAddLink = async (newLink) => {
    if (newLink.title && newLink.url) {
      const token = await getAccessTokenSilently();
      const { data } = await axios.post(
        'https://website-saver.onrender.com/api/links',
        newLink,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLinks((prev) => [...prev, data]);
    }
  };

  return (
    <Container maxWidth="md" component="main">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.email || 'User'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Manage your saved links below.
        </Typography>
        <LinksList links={links} />
        <Box mt={3}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Link
          </Button>
        </Box>
      </Box>
      <AddLinkDialog
        open={open}
        onClose={() => setOpen(false)}
        onAddLink={handleAddLink}
      />
    </Container>
  );
};

export default DashboardPage;