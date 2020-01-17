const joi = require('joi-i18n');

const telefoneSchema = joi.object().keys({
  numero: joi.number().required(),
  ddd: joi.number().min(0b0).max(99),
});

const signUpSchema = joi.object().keys({
  nome: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  senha: joi.string().required(),
  telefones: joi.array().items(telefoneSchema).required(),
});

module.exports = signUpSchema;