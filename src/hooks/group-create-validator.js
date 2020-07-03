// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {Forbidden,BadRequest} = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const users = context.app.services.users.Model;
    const groups = context.app.services.groups.Model;
    const roles = context.app.services.roles.Model;

    if(context.params.user.organizations.id !== context.data.organizationId)
      throw new BadRequest(`organizationId ${context.data.organizationId} does not match current user's ${context.params.user.organizations.id}`);

    const usersGroups = await users.findOne({
      where: {id: context.params.user.id},
      attributes: ['id', 'email'],
      include: [{
        model: groups,
        where: {organizationId: context.params.user.organizations.id},
        include: [{
          model: roles,
          where: {user_admin: 1}
        }]
      }]
    });
    if (usersGroups === null) throw new Forbidden('User does not have permission to create a group');

    //If we're here, then it's ok for the user to create a group for the org

    return context;
  };
};
