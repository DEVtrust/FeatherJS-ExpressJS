const {Service} = require('feathers-sequelize');

exports.Users = class Users extends Service {

  get(data, params) {
    return super.get(data, params);
  }

  create(data, params) {
    // This is the information we want from the user signup data
    // const {email, password, githubId} = data;

    //...do stuff
    // 1. check permission of current user to create a user in the current org
    //  ...might be best as a prehook

    // 2. Add the user to a org
    //   ...better as post hook?

    // The complete user
    // const userData = {
    //   email,
    //   password,
    //   githubId,
    //
    // };

    // Call the original `create` method with existing `params` and new data
    return super.create(data, params);
  }
};
