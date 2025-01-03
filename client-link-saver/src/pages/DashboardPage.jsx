import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, List, ListItem, ListItemText, Typography, Container, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const DashboardPage = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [links, setLinks] = useState([]);
  const [open, setOpen] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  useEffect(() => {
    const fetchLinks = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const res = await axios.get('http://localhost:5000/links', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLinks(res.data);
      }
    };
    fetchLinks();
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleAddLink = async () => {
    if (newLink.title && newLink.url) {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        'http://localhost:5000/links',
        newLink,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLinks([...links, res.data]);
      setNewLink({ title: '', url: '' });
      handleCloseDialog();
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user ? user.email : 'User'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Manage your saved links below.
        </Typography>
        <List>
          {links.map((link) => (
            <ListItem key={link._id} divider>
              <ListItemText primary={link.title} secondary={link.url} />
            </ListItem>
          ))}
        </List>
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Add Link
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="URL"
            type="url"
            fullWidth
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddLink} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DashboardPage;