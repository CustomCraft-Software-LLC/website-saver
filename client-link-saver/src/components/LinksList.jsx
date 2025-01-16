import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LinksList = ({ links, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', url: '' });
  const theme = useTheme();

  return (
    <Box>
      {links.length > 0 ? (
        links.map((link) => (
          <Box key={link.id} mb={3}>
            <Grid container alignItems="center" spacing={2}>
              {editingId === link.id ? (
                <React.Fragment>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      placeholder="Title"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      value={editData.url}
                      onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                      placeholder="URL"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button 
                      onClick={() => { onUpdate(link.id, editData); setEditingId(null); }} 
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                    <Button 
                      onClick={() => setEditingId(null)} 
                      variant="outlined"
                      size="small"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="body1">
                      <strong style={{ color: theme.palette.primary.main }}>Title: </strong> {link.title}
                    </Typography>
                    <Typography variant="body1">
                      <strong style={{ color: theme.palette.primary.main }}>URL: </strong> 
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
                        {link.url}
                      </a>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} textAlign="right">
                    <Button 
                      onClick={() => { setEditingId(link.id); setEditData(link); }} 
                      variant="text"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button 
                      onClick={() => onDelete(link.id)} 
                      variant="text"
                      size="small"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </Box>
        ))
      ) : (
        <Typography variant='body1' sx={{ color: theme.palette.primary.main, textAlign: 'center' }}>No links found.</Typography>
      )}
    </Box>
  );
};

export default LinksList;