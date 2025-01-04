const expressJwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const jwtCheck = expressJwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  algorithms: ['RS256']
});

const checkJWT = (req, res, next) => {
  jwtCheck(req, res, (err) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    next();
  });
};

module.exports = { checkJWT };