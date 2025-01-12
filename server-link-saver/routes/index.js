const express = require('express');
const router = express.Router();
const { checkJwt, logDecodedJwt } = require('../middleware/authMiddleware.js');
const linkController = require('../controllers/linkController.js');

router.use(logDecodedJwt);

router.get('/links', checkJwt, linkController.getLinks);
router.post('/links', checkJwt, linkController.createLink);
/*
router.delete('/links', checkJwt, linkController.deleteLinks);
router.put('/links', checkJwt, linkController.updateLink);
*/

module.exports = router;