const {authenticate} = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const attachOrganization = require('../../hooks/attach-organization');

const userCreateValidator = require('../../hooks/user-create-validator');

const addUserToOrg = require('../../hooks/add-user-to-org');

const addUserToGroup = require('../../hooks/add-user-to-group');

const verifyHooks = require('feathers-authentication-management').hooks;

const accountService = require('../authmanagement/notifier');

const commonHooks = require('feathers-hooks-common');


module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt'), attachOrganization()],
    create: [hashPassword('password'), authenticate('jwt'), userCreateValidator(), verifyHooks.addVerification()],
    update: [commonHooks.disallow('external')],
    patch: [userCreateValidator(),
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(true,
          ['email',
            'isVerified',
            'verifyToken',
            'verifyShortToken',
            'verifyExpires',
            'verifyChanges',
            'resetToken',
            'resetShortToken',
            'resetExpires']
        ),
        hashPassword('password'),
        authenticate('jwt')
      )],
    remove: [authenticate('jwt'), userCreateValidator()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [verifyHooks.removeVerification()],
    get: [verifyHooks.removeVerification()],
    create: [
      addUserToOrg(),
      addUserToGroup(),
      context => {
        accountService(context.app).notifier('resendVerifySignup', context.result);
      },
      verifyHooks.removeVerification()],
    update: [],
    patch: [verifyHooks.removeVerification()],
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
