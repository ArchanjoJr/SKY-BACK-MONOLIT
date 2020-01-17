const express = require('express');

const { isAuth } = require('../middleware');
const {
  signUpController,
} = require('../controllers');

const api = express.Router();
api.post('/signup', signUpController);
// HEALTH CHECK ROUTE
api.get('/status', (request, response) => response.status(200).json('OK'));
api.get('/private', isAuth, (request, response) => response.status(200).json({ a: 'AUTHORIZED', b: request.token }));

module.exports = api;
