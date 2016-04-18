var jwt = require('jsonwebtoken');
var config = require('../config');

var middleware = {};

middleware.jwt2user = function (req, res, next) {
  var token = req.query.token || req.headers['x-access-token'];

  if (!token)
    return res.status(403).send({ error: [{ message: "TOKEN_MISSING" }] });

  // token exists
  jwt.verify(token, config.jwtSecret, function (err, decoded) {
    if (err)
      return res.status(403).json({ error: [{ message: "TOKEN_WRONG" }] });

    req.user = decoded;
    next();
  });
};

module.exports = middleware;