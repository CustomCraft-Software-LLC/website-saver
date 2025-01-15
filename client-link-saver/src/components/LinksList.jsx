import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const LinksList = ({ links }) => {
  return (
    <List>
      {links.map((link) => (
        <React.Fragment key={link.id}>
          <ListItem>
            <ListItemText primary={link.title} secondary={link.url} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default LinksList;