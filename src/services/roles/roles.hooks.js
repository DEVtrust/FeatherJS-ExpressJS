const { authenticate } = require('@feathersjs/authentication').hooks;

const roleCreateValidator = require('../../hooks/role-create-validator');

const roleCreatedCleanse = require('../../hooks/role-created-cleanse');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [roleCreateValidator()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [roleCreatedCleanse()],
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
