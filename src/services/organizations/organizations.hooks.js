const { authenticate } = require('@feathersjs/authentication').hooks;

const createOrgValidator = require('../../hooks/create-org-validator');

const orgCreatedCleanse = require('../../hooks/org-created-cleanse');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [createOrgValidator()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [orgCreatedCleanse()],
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
