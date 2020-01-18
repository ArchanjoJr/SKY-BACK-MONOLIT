const Joi = require('joi-i18n');

const ApiError = require('./ApiError');
const { HTTP_STATUS } = require('../configuration');

module.exports = class SchemaValidator {
  constructor(schema) {
    this.SCHEMA = schema;
    Joi.addLocaleData('en_US', {
      any: {
        required: err => `${err.context.key.toUpperCase()}_IS_REQUIRED`,
      },
      object: {
        allowUnknown: err => `${err.context.key.toUpperCase()}_IS_NOT_ALLOWED`,
      },
      number: {
        positive: err => `${err.context.key.toUpperCase()}_MUST_BE_POSITIVE`,
        max: err => `${err.context.key.toUpperCase()}_MAX_IS_${err.context.limit}`,
        min: err => `${err.context.key.toUpperCase()}_MIN_IS_${err.context.limit}`,
      },
    });
  }

  validateSchema(body) {
    return new Promise(async (resolve, reject) => {
      const { value, error } = Joi.validate(body, this.SCHEMA, { locale: 'en_US' });
      if (error) {
        return reject(new ApiError(error.details[0].message, HTTP_STATUS.BAD_REQUEST));
      }
      return resolve(value);
    });
  }
};
