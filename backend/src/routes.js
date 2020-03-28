const express = require('express');
const { celebrate, Segments, Joi} = require('celebrate');

const UserController = require('./controllers/UserController');
const AccountController = require('./controllers/AccountController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(15),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), UserController.create);

routes.get('/profile', celebrate ({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/accounts', celebrate ({
     [Segments.QUERY]: Joi.object().keys({
         page: Joi.number(),
     })
}), AccountController.index);
routes.post('/accounts', AccountController.create);

routes.delete('/accounts/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), AccountController.delete);

module.exports = routes;