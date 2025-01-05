import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

const AddLinkDialog = ({ open, onClose, onAddLink }) => {
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      onAddLink(newLink);
      setNewLink({ title: '', url: '' });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="add-link-dialog">
      <DialogTitle id="add-link-dialog">Add New Link</DialogTitle>
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
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddLink} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLinkDialog;