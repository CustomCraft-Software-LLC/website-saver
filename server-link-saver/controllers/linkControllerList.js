const links = []; 

const getLinks = (req, res) => {
  const userId = req.user.sub; 
  const userLinks = links.filter((link) => link.userId === userId); 
  res.json(userLinks);
};

const createLink = (req, res) => {
  const userId = req.user.sub; 
  const { url, title } = req.body;

  if (!url || !title) {
    return res.status(400).json({ error: 'URL and title are required.' });
  }

  const newLink = { id: Date.now(), url, title, userId };
  links.push(newLink);
  res.status(201).json(newLink);
};

module.exports = { getLinks, createLink };