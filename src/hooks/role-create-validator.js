// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {Forbidden,BadRequest} = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const users = context.app.services.users.Model;
    const groups = context.app.services.groups.Model;
    const roles = context.app.services.roles.Model;

    // if(context.params.user.organizations.id !== context.data.organizationId)
    //   throw new BadRequest(`organizationId ${context.data.organizationId} does not match current user's ${context.params.user.organizations.id}`);

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
    if (usersGroups === null) throw new Forbidden('User does not have permission to create a role');

    // make sure the groupId that was requested is part of the users org
    const groupMatch = await groups.findOne({
      where: {id: context.data.groupId, organizationId: context.params.user.organizations.id}
    });
    if(groupMatch === null) throw new BadRequest(`groupId ${context.data.groupId} not found in org ${context.params.user.organizations.id}`);

    // setting root_admin is not permitted with the API.  Do it directly in the roles table.
    if('root_admin' in context.data){
      delete context.data.root_admin;
    }

    //If we're here, then it's ok for the user to create a role for the group

    return context;
  };
};
