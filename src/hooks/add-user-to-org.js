// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    // need to allow signups through without auth.  this is kinda lame - but, I need something now, before funding/launch.
    // the signup service doens't use auth - thus, just user object is available
    if(!( 'user' in context.params)){
      return Promise.resolve(context);
    }

    const usersToOganizations = context.app.service('users/organizations');

    const relationship = await usersToOganizations.Model.findOne({
      where: {
        organizationId: context.params.user.organizations.id,
        userId: context.result.id
      }
    });

    if (!relationship) {
      const data = {
        text: 'asd',
        userId: context.result.id,
        organizationId: context.params.user.organizations.id
      };

      await usersToOganizations.create(data, context.params);
    }
    return context;
  };
};
