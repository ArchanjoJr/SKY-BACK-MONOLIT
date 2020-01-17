const express = require('express');

const { isAuth } = require('../middleware');
const {
  signUpController,
  signInController,
  findController,
} = require('../controllers');

const api = express.Router();
api.post('/v1/users/signup', signUpController);
api.post('/v1/users/signin', signInController);
api.get('/v1/users/:user_id', isAuth, findController);

// HEALTH CHECK ROUTE
api.get('/status', (request, response) => response.status(200).json('OK'));
api.get('/private', isAuth, (request, response) => response.status(200).json({ a: 'AUTHORIZED', b: request.token }));

module.exports = api;
