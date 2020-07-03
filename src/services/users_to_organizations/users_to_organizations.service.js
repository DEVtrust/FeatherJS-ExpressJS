// Initializes the `users_to_organizations` service on path `/users/organizations`
const { UsersToOrganizations } = require('./users_to_organizations.class');
const createModel = require('../../models/users_to_organizations.model');
const hooks = require('./users_to_organizations.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users/organizations', new UsersToOrganizations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users/organizations');

  service.hooks(hooks);
};
