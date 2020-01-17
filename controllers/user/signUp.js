
const { genericResponse, errorResponse, SchemaValidator } = require('../../util');
const { SignUpSchema } = require('../../schema');
const { HTTP_STATUS } = require('../../configuration');

const signUp = async (request, response) => {
  try {
    const validator = new SchemaValidator(SignUpSchema);
    const body = await validator.validateSchema(request.body);
    return genericResponse(HTTP_STATUS.CREATED, body, response);
  } catch (error) {
    return errorResponse(error, response);
  }
};
module.exports = {
  signUp,
};
