const { isEqual } = require('underscore');
const moment = require('moment');

const { genericResponse, errorResponse } = require('../../util');
const { HTTP_STATUS } = require('../../configuration');
const { User } = require('../../models');
const { ApiError } = require('../../util');
const { buildUserResponse } = require('./buildUser');

const find = async (request, response) => {
  try {
    const { params: { user_id } } = request;
    const user = await User.findOne({ _id: user_id });

    if (!isEqual(user.token, request.token)) throw new ApiError('Não autorizado', HTTP_STATUS.UNAUTHORIZED);
    if (moment().diff(moment(user.ultimo_login), 'minutes') > 30) throw new ApiError('Sessão inválida', HTTP_STATUS.UNAUTHORIZED);

    const responseObject = await buildUserResponse(user);
    return genericResponse(HTTP_STATUS.OK, responseObject, response);
  } catch (error) {
    return errorResponse(error, response);
  }
};

module.exports = {
  find,
};
