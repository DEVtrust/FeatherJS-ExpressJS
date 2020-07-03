// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    const users = context.app.service('users');
    const password = context.data.password;
    const user = {
      'email': context.data.email,
      'password': password,
    };
    //
    users.create(user)
      .catch((error) => {
        console.log(error);
      });

    return context;
  };
};
