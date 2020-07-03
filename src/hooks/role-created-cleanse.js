// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // This is the global root permission.  We don't want to return a thing about it, ever.
    delete context.result.root_admin;
    return context;
  };
};
