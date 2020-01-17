const buildUserResponse = (user) => new Promise((resolve, reject) => {
  try {
    const {
      _id: id,
      nome,
      email,
      senha,
      telefones,
      data_criacao,
      data_atualizacao,
      ultimo_login,
      token,
    } = user;
    return resolve({
      id,
      nome,
      email,
      senha,
      telefones: telefones.map((obj) => { return { numero: obj.numero, ddd: obj.ddd } }),
      data_criacao,
      data_atualizacao,
      ultimo_login,
      token,
    });
  } catch (error) {
    return reject(error);
  }
});
module.exports = {
  buildUserResponse
};