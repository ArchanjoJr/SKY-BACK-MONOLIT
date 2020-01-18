const { hashSync } = require('bcryptjs');

const { genericResponse, errorResponse, SchemaValidator } = require('../../util');
const { SignUpSchema } = require('../../schema');
const { HTTP_STATUS } = require('../../configuration');
const { User } = require('../../models');
const { AuthServices } = require('../../services');
const { ApiError } = require('../../util');
const { buildUserResponse } = require('./buildUser');

const signUp = async (request, response) => {
  try {
    const validator = new SchemaValidator(SignUpSchema);
    const body = await validator.validateSchema(request.body);
    const {
      nome,
      email,
      senha,
      telefones,
    } = body;
    if (await User.exists({ email })) throw new ApiError('E-mail já existente', HTTP_STATUS.BAD_REQUEST);
    const user = new User({
      nome,
      email,
      senha: hashSync(senha, 10), // create hash of the password
      telefones,
    });
    await user.save();
    const auth = new AuthServices();
    user.token = await auth.createToken(user.id);
    await user.save();
    const responseObject = await buildUserResponse(user);
    return genericResponse(HTTP_STATUS.CREATED, responseObject, response);
  } catch (error) {
    return errorResponse(error, response);
  }
};
module.exports = {
  signUp,
};
