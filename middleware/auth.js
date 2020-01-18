const { isNull, isUndefined } = require('underscore');

const { errorResponse, ApiError } = require('../util');
const { HTTP_STATUS } = require('../configuration');
const { AuthServices } = require('../services');
// FUNCTION THAT VERIFIES THE TOKEN RECEIVED FROM THE API
// CHECKS IF THE TOKEN IS VALID
const isAuth = async (request, response, next) => {
  try {
    if (isNull(request.headers.authorization) || isUndefined(request.headers.authorization)) throw new ApiError('NOT_AUTHORIZED', HTTP_STATUS.UNAUTHORIZED);
    const token = request.get('authorization').replace('Bearer ', '');
    const auth = new AuthServices();
    request.payload = await auth.decodeToken(token);
    request.token = token;
    next();
  } catch (error) {
    return errorResponse(error, response);
  }
};

module.exports = {
  isAuth,
};
