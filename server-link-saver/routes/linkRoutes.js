const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const Link = require('../models/Link');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user.sub });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching links' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, url } = req.body;
    const link = new Link({ title, url, userId: req.user.sub });
    const savedLink = await link.save();
    res.status(201).json(savedLink);
  } catch (error) {
    res.status(400).json({ error: 'Error creating link' });
  }
});

module.exports = router;