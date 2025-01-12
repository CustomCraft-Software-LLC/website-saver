const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config();

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`, 
  tokenSigningAlg: 'RS256'
});

const logDecodedJwt = (req, res, next) => {
  if (req.auth) {
    console.log('Decoded JWT:', req.auth);
  } else {
    console.log('No JWT decoded in request.');
  }

  next();
};

module.exports = { checkJwt, logDecodedJwt };