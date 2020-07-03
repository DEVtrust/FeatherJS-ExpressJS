// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    const organizations = context.app.services.organizations.Model;
    context.params.sequelize = {
      include: [{model: organizations}],
      nest: true
    };
    return Promise.resolve(context);
  };
};
