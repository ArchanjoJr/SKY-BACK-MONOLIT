const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const api = require('./routes');
const { MONGO_URL } = require('./configuration');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
  type: () => true,
}));

app.use(cors());

app.use('/api', api);
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true});

const routes = [];
api.stack.forEach(obj => routes.push({ endpoint : obj.route.path, method: obj.route.stack[0].method }));

module.exports = {
  app,
  routes,
};
