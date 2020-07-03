// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const roles = sequelizeClient.define('roles', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_admin: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    developer: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    root_admin: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  roles.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    roles.belongsTo(models.groups);
  };

  return roles;
};
