/* eslint-disable no-unused-vars */
const Movie = require('../models/movie');
const ERR_MESSAGE = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
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
  Movie.findOne({ movieId, owner })
    .then((movie) => {
      if (movie) {
        throw new BadRequestError(ERR_MESSAGE.MOVIE.EXSISTING_MOVIE);
      } else {
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
          .then((data) => {
            if (!data) {
              throw new BadRequestError(ERR_MESSAGE.BAD_REQUEST);
            }
            return res.status(200).send(data);
          })
          .catch(next);
      }
    })

    .catch(next);
};

const deleteMovie = (req, res, next) => {
  console.log(req.user._id);
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
