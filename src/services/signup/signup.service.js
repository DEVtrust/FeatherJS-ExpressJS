// Initializes the `signup` service on path `/signup`
const { Signup } = require('./signup.class');
const createModel = require('../../models/signup.model');
const hooks = require('./signup.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/signup', new Signup(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('signup');

  service.hooks(hooks);
};
