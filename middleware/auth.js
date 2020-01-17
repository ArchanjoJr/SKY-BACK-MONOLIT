const { isNull, isUndefined } = require('underscore');

const { errorResponse, ApiError } = require('../util');
const { HTTP_STATUS } = require('../configuration');

const isAuth = async (request, response, next) => {
  try {
    if (isNull(request.headers.authorization) || isUndefined(request.headers.authorization)) throw new ApiError('NOT_AUTHORIZED', HTTP_STATUS.UNAUTHORIZED);
    request.token = request.get('authorization');
    next();
  } catch (error) {
    return errorResponse(error, response);
  }
};

module.exports = {
  isAuth,
};
