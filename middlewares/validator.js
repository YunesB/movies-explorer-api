const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateLogin = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value) => {
        if (!ObjectId.isValid(value)) {
          throw new Error('Ошибка валидации. Некорректный ID');
        }
        return value;
      }),
  }),
});

const validateMovieCreation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(5),
    description: Joi.string().required().min(2).max(5000),
    image: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isURL(value)) {
          throw new Error('Ошибка валидации. Введён не URL');
        }
        return value;
      }),
    trailer: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isURL(value)) {
          throw new Error('Ошибка валидации. Введён не URL');
        }
        return value;
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isURL(value)) {
          throw new Error('Ошибка валидации. Введён не URL');
        }
        return value;
      }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(1).max(30),
    nameEN: Joi.string().required().min(1).max(30),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .required()
      .custom((value) => {
        if (!ObjectId.isValid(value)) {
          throw new Error('Ошибка валидации. Некорректный ID');
        }
        return value;
      }),
  }),
});

module.exports = {
  validateUserInfo,
  validateUserId,
  validateLogin,
  validateMovieCreation,
  validateMovieId,
};
