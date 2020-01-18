const mongoose = require('mongoose');

const { Schema } = mongoose;
// USER MODEL FOR THE DOCUMENT SAVED ON MONGODB
const userSchema = new Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: String,
  telefones: [{ numero: Number, ddd: Number }],
  data_criacao: { type: Date, default: Date.now },
  data_atualizacao: { type: Date, default: Date.now },
  ultimo_login: { type: Date, default: Date.now },
  token: String,
});

module.exports = mongoose.model('User', userSchema);
