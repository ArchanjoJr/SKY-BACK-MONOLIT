const Joi = require('joi-i18n');
const ApiError = require('./ApiError');


Joi.addLocaleData('en_US', {
  any: {
    required: err => `${err.context.key}_IS_REQUIRED`,
  },
  object: {
    allowUnknown: err => `${err.context.key}_IS_NOT_ALLOWED`,
  },
  number: {
    positive: err => `${err.context.key.toUpperCase()}_MUST_BE_POSITIVE`,
    max: err => `${err.context.key.toUpperCase()}_MAX_IS_${err.context.limit}`,
    min: err => `${err.context.key.toUpperCase()}_MIN_IS_${err.context.limit}`,
  },
});


const schemaValidator = (body, schema) => new Promise(async (resolve, reject) => {
  console.log({ body });
  const { value, error } = Joi.validate(body, schema, { locale: 'en_US' });
  if (error) {
    return reject(new ApiError(error.details[0].message, 400));
  }
  return resolve(value);
});

module.exports = {
  schemaValidator,
};
