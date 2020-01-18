const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const api = require('./routes');
const { MONGO_URL } = require('./configuration');

const app = express();
// accepting only JSON and returning only json to api
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
  type: () => true,
}));

// adding cors to api
app.use(cors());

// using pre-path api
app.use('/api', api);
// creating connection with mongodb, using mongoose library
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

// function that creates the printstack of the api methods
const routes = [];
api.stack.forEach(obj => routes.push({ endpoint: obj.route.path, method: obj.route.stack[0].method }));

module.exports = {
  app,
  routes,
};
