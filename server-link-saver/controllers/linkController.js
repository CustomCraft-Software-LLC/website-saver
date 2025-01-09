const { db } = require('../models');

const getLinks = async (req, res) => {
  try {
    if (!req.user?.sub) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }

    const links = await db.Link.findAll({ where: { userId: req.user.sub } });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching links', details: error.message });
  }
};

const createLink = async (req, res) => {
  try {
    const { title, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }

    const link = await db.Link.create({ title, url, userId: req.user.sub });
    res.status(201).json(link);
  } catch (error) {
    res.status(400).json({ error: 'Error creating link', details: error.message });
  }
};

const deleteLinks = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Link ID is required' });
    }

    const result = await db.Link.destroy({
      where: { id, userId: req.user.sub }
    });

    if (result === 0) {
      return res.status(404).json({ message: 'Link not found or unauthorized' });
    }

    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting link', details: error.message });
  }
};

const updateLink = async (req, res) => {
  try {
    const { id, title, url } = req.body;

    if (!id || !title || !url) {
      return res.status(400).json({ error: 'ID, Title, and URL are required' });
    }

    const [updated] = await db.Link.update(
      { title, url },
      { where: { id, userId: req.user.sub } }
    );

    if (updated) {
      const updatedLink = await db.Link.findOne({ where: { id, userId: req.user.sub } });
      return res.status(200).json(updatedLink);
    }

    res.status(404).json({ message: 'Link not found or unauthorized' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating link', details: error.message });
  }
};

module.exports = { getLinks, createLink, deleteLinks, updateLink };

