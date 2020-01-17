const { HTTP_STATUS, MONGO_URL, TIMEZONE, SECRET_TOKEN } = require('./Constants');


module.exports = {
  API_PORT: process.env.PORT || 3000,
  HTTP_STATUS,
  MONGO_URL,
  TIMEZONE,
  SECRET_TOKEN,
};
