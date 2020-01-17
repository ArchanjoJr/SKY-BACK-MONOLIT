const AWS = require('aws-sdk');
const { STAGE, REGION } = require('./configuration');

AWS.config.update({
  region: REGION,
});

/**
* @description Funcao que retorna um parametro do parameter store, //PROMISE
* @constructor
* @param {path} path - Nome do Parametro
* @returns {string} PARAMETRO DE PARAMETER STORE EM PLAIN TEXT
*/

const getInfoFromSSM = path => new Promise((resolve, reject) => {
  try {
    const ssm = new AWS.SSM({ region: REGION });
    const params = {
      Name: `/${STAGE}/${path}`,
      WithDecryption: false,
    };
    ssm.getParameter(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data.Parameter.Value);
    });
  } catch (err) {
    return reject(err);
  }
});

