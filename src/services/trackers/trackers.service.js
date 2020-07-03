// Initializes the `trackers` service on path `/trackers`
const { Trackers } = require('./trackers.class');
const hooks = require('./trackers.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/trackers', new Trackers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trackers');

  service.hooks(hooks);
};
