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

  const handleLinkAction = async (action, linkId = null, data = null) => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      let result;
      if (action === 'add') result = await addLink(token, data);
      if (action === 'delete') result = await deleteLink(token, linkId);
      if (action === 'update') result = await updateLink(token, linkId, data);
      
      setLinks((prev) => {
        if (action === 'add') return [...prev, result];
        if (action === 'delete') return prev.filter((link) => link.id !== linkId);
        if (action === 'update') return prev.map((link) => (link.id === linkId ? result : link));
        return prev;
      });
      setLinkData({ title: '', url: '' });
    } catch {
      setError(`Failed to ${action} link`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h1" sx={{ textAlign: 'center' }} gutterBottom>Welcome, {user?.name || 'User'}</Typography>
        <Typography variant="h3" sx={{ textAlign: 'center' }} gutterBottom>Manage your saved links below.</Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && <LinksList links={links} onDelete={(id) => handleLinkAction('delete', id)} onUpdate={handleLinkAction} />}

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
              onClick={() => handleLinkAction('add', null, linkData)}
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