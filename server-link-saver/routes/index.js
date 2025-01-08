const express = require('express');
const router = express.Router();
const { checkJWT } = require('../middleware/authMiddleware.js');
const {
  getLinks,
  createLink,
  deleteLinks,
  updateLink,
} = require('../controllers/linkController.js');

router.get('/', checkJWT, getLinks);
router.post('/', checkJWT, createLink);
router.delete('/', checkJWT, deleteLinks);
router.put('/', checkJWT, updateLink);

module.exports = router;