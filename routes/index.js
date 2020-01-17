const express = require('express');

const api = express.Router();

// HEALTH CHECK ROUTE
api.get('/status', (request, response) => response.status(200).json('OK'));
api.get('/private', (request, response) => response.status(200).json('ok'));

module.exports = api;
