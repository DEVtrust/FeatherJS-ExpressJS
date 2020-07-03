// Initializes the `onramp` service on path `/onramp`
const { Onramp } = require('./onramp.class');
const createModel = require('../../models/onramp.model');
const hooks = require('./onramp.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/onramp', new Onramp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('onramp');

  service.hooks(hooks);
};
