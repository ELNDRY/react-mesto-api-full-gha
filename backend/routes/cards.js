const express = require('express');
const { celebrate, Joi } = require('celebrate');
const controller = require('../controllers/cards');

const router = express.Router();
const URLregEx = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;

router.get('/cards', controller.getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(URLregEx),
  }),
}), controller.createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), controller.deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), controller.likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), controller.dislikeCard);

module.exports = router;
