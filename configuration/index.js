const { getBucketName, getActCredentials } = require('./AwsCredentials');

module.exports = {
  API_PORT: process.env.PORT || 3000,
  getBucketName,
  getActCredentials,
};
