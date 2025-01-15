import { Box, Button, Typography } from '@mui/material';

const LinksList = ({ links, onDelete, onUpdate }) => {
  const handleDelete = (linkId) => {
    onDelete(linkId);
  };

  const handleUpdate = (linkId, updatedData) => {
    onUpdate(linkId, updatedData);
  };

  return (
    <Box mt={3}>
      {links.length > 0 ? (
        links.map((link) => (
          <Box key={link.id} mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{link.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {link.url}
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleUpdate(link.id, { title: 'Updated Title', url: 'https://new-url.com' })}
                style={{ marginRight: '8px' }}
              >
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(link.id)}>
                Delete
              </Button>
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          No links found.
        </Typography>
      )}
    </Box>
  );
};

export default LinksList;