import React from 'react';
import { List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useTheme } from '@mui/system';

const LinksList = ({ links }) => {
  const theme = useTheme();

  return (
    <List>
      {links.map((link) => (
        <React.Fragment key={link.id}>
          <ListItem>
            <ListItemText 
              primary={`${link.title}`} 
              secondary={`${link.url}`} 
              sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.text.primary, 
                '& .MuiListItemText-primary': { 
                  fontWeight: 'bold', 
                  color: theme.palette.text.primary
                },
                '& .MuiListItemText-secondary': { 
                  color: theme.palette.text.secondary 
                }
              }} 
            />
            <Button variant="outlined" color="primary" onClick={() => alert('Edit functionality here')}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => alert('Delete functionality here')}>
              Delete
            </Button>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default LinksList;