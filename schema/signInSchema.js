const joi = require('joi-i18n');

const signInSchema = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  senha: joi.string().required(),

});

module.exports = signInSchema;
