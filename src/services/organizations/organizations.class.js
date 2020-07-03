const { Service } = require('feathers-sequelize');

exports.Organizations = class Organizations extends Service {
  async create(data, params) {
    return super.create({}, params);
  }

};
