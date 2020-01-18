const { isNull } = require('underscore');
const { compareSync } = require('bcryptjs');

const { genericResponse, errorResponse, SchemaValidator } = require('../../util');
const { SignInSchema } = require('../../schema');
const { HTTP_STATUS } = require('../../configuration');
const { User } = require('../../models');
const { AuthServices } = require('../../services');
const { ApiError } = require('../../util');
const { buildUserResponse } = require('./buildUser');

const signIn = async (request, response) => {
  try {
    const validator = new SchemaValidator(SignInSchema);
    const body = await validator.validateSchema(request.body);
    const {
      email,
      senha,
    } = body;
    const user = await User.findOne({ email });
    if (isNull(user)) throw new ApiError('Usuário e/ou senha inválidos', HTTP_STATUS.NOT_FOUND);
    if (!compareSync(senha, user.senha)) throw new ApiError('Usuário e/ou senha inválidos', HTTP_STATUS.UNAUTHORIZED);
    const auth = new AuthServices();
    user.token = await auth.createToken(user.id);
    user.ultimo_login = Date.now();
    await user.save();
    const resp = await buildUserResponse(user);
    return genericResponse(HTTP_STATUS.CREATED, resp, response);
  } catch (error) {
    return errorResponse(error, response);
  }
};
module.exports = {
  signIn,
};
