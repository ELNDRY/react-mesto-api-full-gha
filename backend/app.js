const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const authVerifier = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');

const PORT = process.env.PORT || 3000;

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // limit each IP to 100 requests per 'window' - per 15 mins
  standardHeaders: true,
  legacyHeaders: false,
});
mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/', authVerifier);
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
