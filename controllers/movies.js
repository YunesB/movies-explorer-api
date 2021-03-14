/* eslint-disable no-unused-vars */
const Movie = require('../models/movie');
const ERR_MESSAGE = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError(ERR_MESSAGE.MOVIE.EMPTY_LIST);
      }
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration,
    year, description, image,
    trailer, thumbnail, movieId,
    nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      if (!movie) {
        throw new BadRequestError(ERR_MESSAGE.BAD_REQUEST);
      }
      res.status(200).send(movie);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(ERR_MESSAGE.MOVIE.INVALID_ID))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(ERR_MESSAGE.MOVIE.FORBIDDEN_ACTION);
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then((data) => {
          res.status(200).send(data);
        });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
