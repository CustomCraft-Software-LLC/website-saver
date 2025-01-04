const express = require('express');
const { checkJWT } = require('../middleware/authMiddleware');
const {
  getLinks,
  createLink,
  deleteLinks,
  updateLink,
} = require('../controllers/linkController');
const { validateLinkData } = require('../middleware/validateData');

const router = express.Router();

router.get('/', checkJWT, getLinks);
router.post('/', checkJWT, validateLinkData, createLink);
router.delete('/', checkJWT, deleteLinks);
router.put('/', checkJWT, updateLink);

module.exports = router;