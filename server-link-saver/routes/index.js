const express = require('express');
const router = express.Router();
const { checkJwt } = require('../middleware/authMiddleware.js');
const linkController = require('../controllers/linkController.js');
const linkControllerList = require('../controllers/linkControllerList.js');

router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log('Decoded JWT:', req.user);
    console.log('Headers:', req.headers);
    console.log('Query:', req.query);
    console.log('Body:', req.body);
    next();
});

router.get('/links', checkJwt, linkController.getLinks);
router.post('/links', checkJwt, linkController.createLink);
/*
router.delete('/links', checkJwt, linkController.deleteLinks);
router.put('/links', checkJwt, linkController.updateLink);
*/

module.exports = router;