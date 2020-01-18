const joi = require('joi-i18n');
// SCHEMA FOR THE SIGN-IN BODY REQUEST
const signInSchema = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  senha: joi.string().required(),

});

module.exports = signInSchema;
