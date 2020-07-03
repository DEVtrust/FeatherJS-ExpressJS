// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {BadRequest} = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const usersToGroups = context.app.service('users/groups');
    if ('group' in context.data && Number.isInteger(context.data.group)) {

      const relationship = await usersToGroups.Model.findOne({
        where: {
          groupId: context.data.group,
          userId: context.result.id
        }
      });

      if(relationship) throw new BadRequest(`cannot add new user ${context.result.id} to group ${context.data.group} because relation already exists`);
      const data = {
        text: `created by uid ${context.params.user.id}`,
        userId: context.result.id,
        groupId: context.data.group
      };

      await usersToGroups.create(data, context.params);

    }
    return context;
  };
};
