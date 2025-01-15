const express = require('express');
const router = express.Router();
const { checkJwt } = require('../middleware/authMiddleware.js');
const linkController = require('../controllers/linkController.js');

router.get('/links', checkJwt, linkController.getLinks);
router.post('/links', checkJwt, linkController.createLink);
router.delete('/links/:id', checkJwt, linkController.deleteLink);
router.put('/links/:id', checkJwt, linkController.updateLink);

module.exports = router;