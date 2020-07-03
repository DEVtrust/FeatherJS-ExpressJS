// Initializes the `provision` service on path `/provision`
const { Provision } = require('./provision.class');
const createModel = require('../../models/provision.model');
const hooks = require('./provision.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/provision', new Provision(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('provision');

  service.hooks(hooks);
};
