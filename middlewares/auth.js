const jwt = require('jsonwebtoken');
const ERR_MESSAGE = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError.js');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotFoundError(ERR_MESSAGE.TOKEN_NOT_FOUND);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(ERR_MESSAGE.UNAUTHORIZED);
  }
  req.user = payload;
  return next();
};
