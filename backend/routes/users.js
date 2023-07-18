const express = require('express');
const { celebrate, Joi } = require('celebrate');
const controller = require('../controllers/users');

const router = express.Router();

const URLregEx = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;

router.get('/users', controller.getUsers);
router.get('/users/me', controller.getUserMe);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
}), controller.getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), controller.editProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URLregEx),
  }),
}), controller.editAvatar);

module.exports = router;
