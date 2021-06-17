/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const ERR_MESSAGE = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const getUserId = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERR_MESSAGE.USER.NOT_FOUND_ID);
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERR_MESSAGE.USER.NOT_FOUND_ID);
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  return User.findOne({ email })
    .then((user) => {
      if (user) return next(new ConflictError(ERR_MESSAGE.USER.TAKEN_EMAIL));
      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name,
            email,
            password: hash,
          })
            .then((user) => {
              User.findById(user._id)
                .then((user) => res.status(200).send(user));
            })
            .catch(next);
        });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new BadRequestError(ERR_MESSAGE.BAD_REQUEST);
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(ERR_MESSAGE.USER.INVALID_LOGIN);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(ERR_MESSAGE.USER.INVALID_LOGIN);
          }
          return user;
        });
    })
    .then((loggedInUser) => {
      const token = jwt.sign(
        { _id: loggedInUser._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      if (!token) {
        throw new UnauthorizedError(ERR_MESSAGE.TOKEN_NOT_FOUND);
      }
      return res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserId,
  getUserInfo,
  createUser,
  updateUser,
  login,
};
