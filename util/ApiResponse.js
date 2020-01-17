/**
* @description funcao de retorno padrao da api
* @param {string} status   - status de resposta da API
* @param {string} message  - messsage de retorno da API
* @param {string} response - instancia de response de Express
* @returns retorna a response para a API
*/
const genericResponse = (status, message, response) => {
  // console.dir({ status, message }, { depth: null, colors: true });
  return response.status(status).json(message);
};

/**
* @description funcao de retorno padrao da api // DEFUALT retorna 500 e error
* @param {string} status   - status de resposta da API
* @param {string} error  - messsage de error a ser retornado para a API
* @param {string} response - instancia de response de Express
* @returns retorna uma response de ERROR para a API
*/
const errorResponse = (Error, response) => {
  console.error(Error);
  if (Error.status) {
    return response.status(Error.status).json({ message: Error.message });
  }
  return response.status(500).json({message: Error.message });
};

module.exports = {
  genericResponse,
  errorResponse,
};
