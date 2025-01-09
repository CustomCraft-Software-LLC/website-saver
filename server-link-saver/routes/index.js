const express = require('express');
const router = express.Router();
const { checkJwt } = require('../middleware/authMiddleware.js');
const linkController = require('../controllers/linkController.js');

router.get('/', checkJwt, linkController.getLinks);
router.post('/', checkJwt, linkController.createLink);
router.delete('/', checkJwt, linkController.deleteLinks);
router.put('/', checkJwt, linkController.updateLink);

module.exports = router;