const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const controller = require('../controllers/users');

const URLregEx = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URLregEx),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), controller.createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), controller.login);

router.post('/signout', controller.logout);

module.exports = router;
