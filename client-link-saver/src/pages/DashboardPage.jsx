import { useState, useEffect } from 'react';
import { Typography, Container, Box, Button, CircularProgress, Alert, TextField, Stack } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchLinks, addLink, updateLink, deleteLink } from '../services/linksService';
import LinksList from '../components/LinksList';

const DashboardPage = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [linkData, setLinkData] = useState({ title: '', url: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadLinks = async () => {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const fetchedLinks = await fetchLinks(token);
        setLinks(fetchedLinks);
      } catch {
        setError('Failed to load links');
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleAddLink = async () => {
    if (!linkData.title || !linkData.url) return setError('Please provide a title and a URL');
    
    setIsSubmitting(true);
    try {
      const token = await getAccessTokenSilently();
      const newLink = await addLink(token, linkData);
      setLinks((prev) => [...prev, newLink]);
      setLinkData({ title: '', url: '' });
    } catch {
      setError('Failed to add link');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLink = async (linkId) => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      await deleteLink(token, linkId);
      setLinks((prev) => prev.filter((link) => link.id !== linkId));
    } catch {
      setError('Failed to delete link');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLink = async (linkId, updatedData) => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const updatedLink = await updateLink(token, linkId, updatedData);
      setLinks((prev) => prev.map((link) => (link.id === linkId ? updatedLink : link)));
    } catch {
      setError('Failed to update link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h6" gutterBottom>Welcome, {user?.name || 'User'}</Typography>
        <Typography variant="body1" gutterBottom>Manage your saved links below.</Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <LinksList links={links} onDelete={handleDeleteLink} onUpdate={handleUpdateLink} />
        )}

        <Box mt={3}>
          <Stack spacing={2}>
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
            <Button
              variant="contained"
              onClick={handleAddLink}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add New Link'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;