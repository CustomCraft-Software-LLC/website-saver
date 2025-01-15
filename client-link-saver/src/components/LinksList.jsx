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
              primary={`Title: ${link.title}`} 
              secondary={`Url: ${link.url}`} 
            />
            <Button variant="outlined" color="primary">
              Edit
            </Button>
            <Button variant="outlined" color="secondary">
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