const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes');
const cors = require('cors');
const { printRoutes } = require('./util/printAPI');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api', api);
let routes = []
api.stack.forEach(obj => routes.push({ endpoint : obj.route.path, method: obj.route.stack[0].method }));

module.exports = {
  app,
  routes
};
