const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [commonHooks.disallow('external')],
    get: [],
    create: [commonHooks.disallow('external')],
    update: [commonHooks.disallow('external')],
    patch: [commonHooks.disallow('external')],
    remove: [commonHooks.disallow('external')]
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
