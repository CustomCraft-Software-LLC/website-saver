const Link = require('../models/Link');

const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user.sub });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching links' });
  }
};

const createLink = async (req, res) => {
  try {
    const { title, url } = req.body;
    const link = new Link({ title, url, userId: req.user.sub });
    const savedLink = await link.save();
    res.status(201).json(savedLink);
  } catch (error) {
    res.status(400).json({ error: 'Error creating link' });
  }
};

const deleteLinks = async (req, res) => {
  try {
    const { id } = req.body;
    await Link.findOneAndDelete({ _id: id, userId: req.user.sub });
    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting link' });
  }
};

const updateLink = async (req, res) => {
  try {
    const { id, title, url } = req.body;
    const updatedLink = await Link.findOneAndUpdate(
      { _id: id, userId: req.user.sub },
      { title, url },
      { new: true }
    );
    res.json(updatedLink);
  } catch (error) {
    res.status(500).json({ error: 'Error updating link' });
  }
};

module.exports = { getLinks, updateLink, deleteLinks, createLink };