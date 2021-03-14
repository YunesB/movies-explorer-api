const appRouter = require('express').Router();
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const notFound = require('./notFound');

appRouter.use('/', auth, usersRouter);
appRouter.use('/', auth, moviesRouter);
appRouter.use('*', notFound);

module.exports = appRouter;
