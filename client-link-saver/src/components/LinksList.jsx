import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Grid } from '@mui/material';

const LinksList = ({ links, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', url: '' });

  return (
    <Box>
      {links.length ? (
        links.map((link) => (
          <Box key={link.id} mb={2}>
            <Grid container alignItems="center" spacing={2}>
              {editingId === link.id ? (
                <React.Fragment>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      placeholder="Title"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={editData.url}
                      onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                      placeholder="URL"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Button onClick={() => { onUpdate(link.id, editData); setEditingId(null); }} sx={{ marginRight: 1 }}>
                      Save
                    </Button>
                    <Button onClick={() => setEditingId(null)} sx={{ marginRight: 1 }}>
                      Cancel
                    </Button>
                  </Grid>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Grid item xs={12} sm={8}>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', whiteSpace: 'pre-line' }}>
                      {`ID: ${link.id}\nTitle: ${link.title}\nURL: ${link.url}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => { setEditingId(link.id); setEditData(link); }} sx={{ marginRight: 1 }}>
                      Edit
                    </Button>
                    <Button onClick={() => onDelete(link.id)}>
                      Delete
                    </Button>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </Box>
        ))
      ) : (
        <Typography>No links found.</Typography>
      )}
    </Box>
  );
};

export default LinksList;