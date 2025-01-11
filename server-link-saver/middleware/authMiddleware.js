const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

console.log('Auth0 Domain:', process.env.AUTH0_DOMAIN);
console.log('Auth0 Audience:', process.env.AUTH0_AUDIENCE);

const jwksClient = jwksRsa({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  cache: true,
  cacheMaxAge: 3600,  
  rateLimit: true,
  jwksRequestsPerMinute: 5,
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
}).unless({
  custom: (req) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    return false; 
  },
});

const logJwtErrors = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.error('JWT Unauthorized Error:', err.message);
    res.status(401).send({ error: 'Unauthorized' });
  } else {
    console.error('JWT Error:', err.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = { checkJwt, logJwtErrors };