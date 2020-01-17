const { signUp } = require('./user/signUp');
const { signIn } = require('./user/signIn');
const { find } = require('./user/find');

module.exports = {
  signUpController: signUp,
  signInController: signIn,
  findController: find,

};
