require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const controller = require('./controllers/users');
const validateReq = require('./middlewares/validator');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./utils/rateLimiter');
const appRouter = require('./routes/index');

const { PORT = 3007 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(rateLimiter);
app.use(helmet());

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
  validateReq.validateLogin,
  controller.createUser);
app.post('/signin',
  validateReq.validateLogin,
  controller.login);

app.use('/', appRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Success! PORT: ${PORT}`);
});
