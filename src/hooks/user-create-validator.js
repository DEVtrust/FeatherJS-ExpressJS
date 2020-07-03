// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {Forbidden, BadRequest} = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    // need to allow signups through without auth.  this is kinda lame - but, I need something now, before funding/launch.
    // the signup service doens't use auth - thus, just user object is available
    if(!( 'user' in context.params)){
      return Promise.resolve(context);
    }

    const users = context.app.services.users.Model;
    const groups = context.app.services.groups.Model;
    const roles = context.app.services.roles.Model;
    const usersGroups = await users.findOne({
      where: {id: context.params.user.id},
      include: groups
    });
    // just check org 0 for now.  assumes user has only one org
    if (usersGroups.groups.length > 0) {
      const orgGroups = usersGroups.groups.filter((group) => {
        return group.dataValues.organizationId == context.params.user.organizations.id;
      });

      // for now assume one role per group
      const groupRoles = await roles.findOne({
        where: {
          groupId: orgGroups[0].dataValues.id,
          user_admin: 1
        }
      });
      if (groupRoles === null) throw new Forbidden('User does not have permission to create user');
    } else {
      // user must have user_admin role in a group that's part of the org they're logged in with.
      throw new Forbidden('User is not a member of any groups with permissions required to add a user');
    }

    /// If the request includes a group, ensure that the user can to add to the group
    if ('group' in context.data) {
      if (!Number.isInteger(context.data.group)) throw new BadRequest(`group id ${context.data.group} is not a valid group id`);
      // can this current user add users to this group?
      const groups = context.app.services.groups.Model;
      const organizations = context.app.services.organizations.Model;

      const userWithGroups = await context.app.services.users.Model.findOne({
        attributes: ['email', 'id'],
        where: {id: context.params.user.id},
        include: [{
          model: groups,
          include: [{
            model: organizations,
            attributes: ['id', 'text'],
            where: {id: context.params.user.organizations.id}
          }],
          where: {id: context.data.group}
        }]
      });

      if (userWithGroups === null) throw new Forbidden(`current user cannot add users to group ${context.data.group}`);
    }

    //If we're here, then it's ok for the user to create a user for the current org

    return Promise.resolve(context);
  };
};
