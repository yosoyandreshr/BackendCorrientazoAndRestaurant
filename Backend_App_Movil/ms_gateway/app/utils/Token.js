const Token = module.exports;
const njwt = require('njwt');

const TokenConfig = require('../configs/TokenConfig');

Token.create = (payload, minutes) => {
  const jwt = njwt.create(payload, TokenConfig.Token_KEY);

  jwt.setExpiration(new Date().getTime() + (minutes || 120 * 60 * 1000));


  return jwt.compact();
}; 

Token.Verify = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    console.log({ message: 'No token provided' });
    res.status(401).send({ message: 'No token provided' });
  }
  njwt.verify(token, TokenConfig.Token_KEY, (err, decoded) => {
    if (err) {
      console.log({ err });

      return res.status(500).send(null);
    }
    req.token = decoded.body;
    console.log(req.headers, req.body);

    return next();
  });
};
