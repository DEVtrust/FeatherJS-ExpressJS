// Initializes the `users_to_groups` service on path `/users/groups`
const { UsersToGroups } = require('./users_to_groups.class');
const createModel = require('../../models/users_to_groups.model');
const hooks = require('./users_to_groups.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users/groups', new UsersToGroups(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users/groups');

  service.hooks(hooks);
};
