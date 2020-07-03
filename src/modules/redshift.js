const {GeneralError} = require('@feathersjs/errors');

const client = (config) => {
  const {Client} = require('pg');
  try {
    const client = new Client(config);
    client.connect();
    return client;
  } catch (e) {
    throw GeneralError(`Something went wrong while creating the redshift client ${e.message}`);
  }
};

const pool = (config) => {
  const {Pool} = require('pg');
  try {
    return new Pool(config);
  } catch (e) {
    throw GeneralError(`Something went wrong while creating the redshift client ${e.message}`);
  }
};

module.exports = {
  client,
  pool
};

