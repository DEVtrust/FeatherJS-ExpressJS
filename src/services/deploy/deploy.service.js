// Initializes the `deploy` service on path `/deploy`
const { Deploy } = require('./deploy.class');
const createModel = require('../../models/deploy.model');
const hooks = require('./deploy.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/deploy', new Deploy(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('deploy');

  service.hooks(hooks);
};
