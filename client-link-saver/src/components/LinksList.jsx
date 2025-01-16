import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Stack } from '@mui/material';

const LinksList = ({ links, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', url: '' });

  return (
    <Box>
      {links.length ? (
        links.map((link) => (
          <Box key={link.id} mb={2}>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {editingId === link.id ? (
                <React.Fragment>
                  <TextField
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    placeholder="Title"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    value={editData.url}
                    onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                    placeholder="URL"
                    sx={{ flex: 1 }}
                  />
                  <Button onClick={() => { onUpdate(link.id, editData); setEditingId(null); }} sx={{ marginRight: 1 }}>
                    Save
                  </Button>
                  <Button onClick={() => setEditingId(null)} sx={{ marginRight: 1 }}>
                    Cancel
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ flex: 1 }}>
                    {link.title} - {link.url}
                  </Typography>
                  <Button onClick={() => { setEditingId(link.id); setEditData(link); }} sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button onClick={() => onDelete(link.id)} sx={{ marginLeft: 1 }}>
                    Delete
                  </Button>
                </React.Fragment>
              )}
            </Stack>
          </Box>
        ))
      ) : (
        <Typography>No links found.</Typography>
      )}
    </Box>
  );
};

export default LinksList;