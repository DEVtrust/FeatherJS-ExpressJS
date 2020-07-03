const {Service} = require('feathers-sequelize');
const { v4: uuidv4 } = require('uuid');

exports.Onramp = class Onramp extends Service {

  setup(app) {
    this.app = app;
  }

  async create(data, params) {
    /*
    This service orchestrates onramping a new customer.

    It is expected that the user is authenticated before hitting this service.  Authentication
    could be from SSO or creation of a new signalscout account on the /users.  Basically, the user record
    must exist before onramping
     */
    // SignalScout set up
    // 1. create org, group, role
    const organizations = this.app.service('organizations').Model;
    const groups = this.app.service('groups').Model;
    const roles = this.app.service('roles').Model;
    //const userToGroups = this.app.service('users_to_groups').Model;
    const usersToOrganizations = this.app.service('users/organizations').Model;

    const org = await organizations.create({
      text: data.organization,
      uuid: uuidv4(),
    });

    await usersToOrganizations.create({
      userId: data.id,
      organizationId: org.dataValues.id,
      text: 'onramp',
    });

    data.group = await groups.create({
      text: 'admin',
      organizationId: org.dataValues.id,
    });

    data.role = await roles.create({
      text: 'admin',
      groupId: data.group.dataValues.id,
    });

    const provision = this.app.service('provision');

    data.provision = await provision.create({
      organizationId: org.dataValues.id,
      uuid: org.dataValues.uuid,
      userId: data.id,
      text: 'placeholder',
    });

    data.userId = data.id;
    data.organizationId = org.dataValues.id;

    // DBT - GitHub work
    // 5. clone basic DBT models (atomic.events -> customer_schema -> events)

    return super.create(data, params);
  }
};
