// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {Forbidden} = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    const users = context.app.services.users.Model;
    const groups = context.app.services.groups.Model;
    const roles = context.app.services.roles.Model;

    const usersGroups = await users.findOne({
      where: {id: context.params.user.id},
      attributes: ['id', 'email'],
      include: [{
        model: groups,
        where: {organizationId: context.params.user.organizations.id},
        include: [{
          model: roles,
          where: {root_admin: 1}
        }]
      }]
    });
    if (usersGroups === null) throw new Forbidden('User does not have permission to create an organization');

    return context;
  };
};
