#!/usr/bin/env nodemon

const {app, routes} = require('./app');
const {API_PORT} = require('./configuration');
const {printRoutes} = require('./util/printAPI');

app.listen(API_PORT, () => {
  printRoutes(`LOCALHOST:${API_PORT}`, routes);
});
module.exports = app;
