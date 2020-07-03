//const globalHooks = require('../../hooks');
const hooks = require('feathers-hooks-common');
//const auth = require('feathers-authentication').hooks;

module.exports = {
  before: {
    all: [hooks.disallow('external')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
