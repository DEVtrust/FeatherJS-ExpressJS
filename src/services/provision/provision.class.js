const {Service} = require('feathers-sequelize');

exports.Provision = class Provision extends Service {

  setup(app) {
    this.app = app;
  }

  // 2. create customer_schema
  // 3. create RS user for customer
  // 4. create tracker code for customer
  async create(data, params) {

    const AWS = require('aws-sdk');
    const awsConfig = this.app.get('aws');
    AWS.config.update({
      secretAccessKey: awsConfig.secretAccessKey,
      accessKeyId: awsConfig.accessKeyId,
      region: awsConfig.region,
    });

    const Redshift = require('node-redshift');
    const redshiftConfig = this.app.get('redshift');
    const client = {
      user: redshiftConfig.masterUsername,
      database: redshiftConfig.database,
      password: redshiftConfig.masterUserPassword,
      port: redshiftConfig.port,
      host: redshiftConfig.host,
    };

    const schema = `org_${data.organizationId}_${data.uuid}`.replace(/-/g,'');

    // The values passed in to the options object will be the difference between a connection pool and raw connection
    const redshiftClient = new Redshift(client, [{rawConnection: true}]);
    redshiftClient.rawQuery(`CREATE SCHEMA ${schema}`, [{rawConnection: true}], function (err, data) {
      if (err) throw err;
      else {
        console.log(data);
      }
    });

    data.redshift_schema = schema;
    return super.create(data, params);
  }
};
