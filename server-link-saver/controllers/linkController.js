const { Link } = require('../models');

const getLinks = async (req, res) => {
  try {
    const links = await Link.findAll({ where: { userId: req.user.sub } });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching links' });
  }
};

const createLink = async (req, res) => {
  try {
    const { title, url } = req.body;
    const link = await Link.create({ title, url, userId: req.user.sub });
    res.status(201).json(link);
  } catch (error) {
    res.status(400).json({ error: 'Error creating link' });
  }
};

const deleteLinks = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Link.destroy({
      where: {
        id: id,
        userId: req.user.sub
      }
    });

    if (result === 0) {
      return res.status(404).json({ message: 'Link not found or unauthorized' });
    }
    
    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting link' });
  }
};

const updateLink = async (req, res) => {
  try {
    const { id, title, url } = req.body;
    const [updated] = await Link.update(
      { title, url },
      { where: { id, userId: req.user.sub } }
    );

    if (updated) {
      const updatedLink = await Link.findOne({ where: { id, userId: req.user.sub } });
      return res.status(200).json(updatedLink);
    }

    res.status(404).json({ message: 'Link not found or unauthorized' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating link' });
  }
};

module.exports = { getLinks, updateLink, deleteLinks, createLink };