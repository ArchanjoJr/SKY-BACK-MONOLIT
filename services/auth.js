const jwt = require('jwt-simple');
const moment = require('moment-timezone');

const { TIMEZONE, SECRET_TOKEN, HTTP_STATUS } = require('../configuration');
const { ApiError } = require('../util');

module.exports = class Auth {
  constructor() {
    this.SECRET_TOKEN = SECRET_TOKEN;
  }

  /**
  * @description funcao que cria um token
  * @param {string} user_id   - user_id do usuario logando
  * @returns jwt token
  */
  createToken(user_id) {
    return new Promise((resolve, reject) => {
      try {
        const payload = {
          user_id,
          iat: moment().tz(TIMEZONE).unix(),
          exp: moment().tz(TIMEZONE).add(30, 'minutes').unix(),
        };
        return resolve(jwt.encode(payload, this.SECRET_TOKEN));
      } catch (error) {
        return reject(error);
      }
    });
  }

  /**
  * @description funcao que decriptografa um token jwt
  * @param {string} token   - token jwt
  * @returns retorna o payload do token jwt
  */
  decodeToken(token) {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(token, this.SECRET_TOKEN);
        if (payload.exp <= moment().tz(TIMEZONE).unix()) {
          throw new ApiError('TOKEN_EXPIRED', HTTP_STATUS.UNAUTHORIZED);
        }
        return resolve(payload);
      } catch (error) {
        if (error.message === 'Token expired') return reject(new ApiError('TOKEN_EXPIRED', HTTP_STATUS.UNAUTHORIZED));
        return reject(error);
      }
    });
  }
};
