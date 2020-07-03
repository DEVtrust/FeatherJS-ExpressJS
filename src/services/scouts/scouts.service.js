// Initializes the `scouts` service on path `/scouts`
const { Scouts } = require('./scouts.class');
const createModel = require('../../models/scouts.model');
const hooks = require('./scouts.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/scouts', new Scouts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('scouts');

  service.hooks(hooks);
};
