import { useState, useEffect } from 'react';
import { Typography, Container, Box, Button, CircularProgress, Alert, TextField } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchLinks, addLink } from '../services/linksService';
import LinksList from '../components/LinksList';

const DashboardPage = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [linkData, setLinkData] = useState({ title: '', url: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const loadLinks = async () => {
        setLoading(true);
        setError(null);
        try {
          const token = await getAccessTokenSilently();
          const fetchedLinks = await fetchLinks(token);
          setLinks(fetchedLinks);
        } catch (error) {
          setError('Failed to load links');
        } finally {
          setLoading(false);
        }
      };

      loadLinks();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleAddLink = async () => {
    if (!linkData.title || !linkData.url) {
      setError('Please provide a title and a URL');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await getAccessTokenSilently();
      const newLink = await addLink(token, linkData);
      setLinks((prevLinks) => [...prevLinks, newLink]);
      setLinkData({ title: '', url: '' });
    } catch (error) {
      setError('Failed to add link');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={linkData.title}
            onChange={(e) => setLinkData({ ...linkData, title: e.target.value })}
            margin="normal"
          />
          <TextField
            label="URL"
            variant="outlined"
            fullWidth
            value={linkData.url}
            onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
            margin="normal"
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddLink}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add New Link'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;