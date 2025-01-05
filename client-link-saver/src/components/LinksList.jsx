import { List, ListItem, ListItemText } from '@mui/material';

const LinksList = ({ links }) => {
  return (
    <List>
      {links.map((link) => (
        <ListItem key={link._id} divider>
          <ListItemText primary={link.title} secondary={link.url} />
        </ListItem>
      ))}
    </List>
  );
};

export default LinksList;