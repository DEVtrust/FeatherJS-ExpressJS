// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    // Now that the user has verified their email address, we do out onramping

    const signup = await context.app.service('signup').Model.findOne({
      where: {email: 'jeremy@primoathletic.com'}
    });

    if (context.result.isVerified === true) {
      await context.app.services.onramp.create(Object.assign({}, signup.dataValues, context.result));
    }

    return context;
  };
};
