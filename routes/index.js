const express = require('express');

const { HTTP_STATUS } = require('../configuration');
const { isAuth } = require('../middleware');
const {
  signUpController,
  signInController,
  findController,
} = require('../controllers');

// USERS ROUTES
const api = express.Router();
api.post('/v1/users/signup', signUpController);
api.post('/v1/users/signin', signInController);
api.get('/v1/users/:user_id', isAuth, findController);

// HEALTH CHECK ROUTE
api.get('/status', (request, response) => response.status(200).json('OK'));
api.get('/private', isAuth, (request, response) => response.status(200).json({ a: 'AUTHORIZED' }));

api.get('*', (request, response) => response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'INVALID_ROUTE' }));

module.exports = api;
