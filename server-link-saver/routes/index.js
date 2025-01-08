const express = require('express');
const { checkJWT } = require('../middleware/authMiddleware.js');
const {
  getLinks,
  createLink,
  deleteLinks,
  updateLink,
} = require('../controllers/linkController.js');

const router = express.Router();

router.get('/', checkJWT, getLinks);
router.post('/', checkJWT, createLink);
router.delete('/', checkJWT, deleteLinks);
router.put('/', checkJWT, updateLink);

module.exports = { router };