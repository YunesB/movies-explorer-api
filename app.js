require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const controller = require('./controllers/users');
// const validateReq = require('./middlewares/validator');
const notFound = require('./routes/notFound');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(400).send({ message: 'Incorrect Enquiry, Syntax Error' });
  } else {
    next();
  }
});

app.use(requestLogger);

app.post('/signup',
  // validateReq.validateLogin,
  controller.createUser);
app.post('/signin',
  // validateReq.validateLogin,
  controller.login);

app.use('/', auth, usersRouter);
app.use('/', auth, moviesRouter);
app.use('*', notFound);

app.use(errorLogger);
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res
    .status(status)
    .send({
      message: status === 500
        ? 'Ошибка сервера'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`Success! PORT: ${PORT}`);
});
