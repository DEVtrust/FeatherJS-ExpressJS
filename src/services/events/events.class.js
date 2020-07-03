const {GeneralError} = require('@feathersjs/errors');
const redshift = require('../../modules/redshift');
const schemas = require('../../modules/schemas');

exports.Events = class Events {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
    this.redshiftClient = redshift.pool(this.app.get('redshift'));
  }

  async find(params) {
    const offset = (params.query.offset)?params.query.offset:0;
    const limit = (params.query.limit)?params.query.limit:100;
    const schema = schemas.get(params);

    let query = `SELECT
       event_id,
       page_url,
       derived_tstamp,
       user_id,
       se_category,
       se_action,
       se_property,
       se_label,
       se_value,
       useragent,
       user_id,
       page_urlhost,
       page_urlpath
       FROM ${schema}.events WHERE 1`;

    if(params.query.search_str){
      query+=` and (page_url LIKE '%${params.query.search_str}%' or se_value LIKE '%${params.query.search_str}%' or se_label LIKE '%${params.query.search_str}%' or se_property LIKE '%${params.query.search_str}%' or se_action LIKE '%${params.query.search_str}%' or se_category LIKE '%${params.query.search_str}%')`;
    }

    if(params.query.startDate && params.query.endDate){
      query+=` and derived_tstamp BETWEEN  '${params.query.startDate}' AND '${params.query.endDate}'`;
    }

    if(params.query.sortKey && params.query.sortType){
      query+=` ORDER BY ${params.query.sortKey} ${params.query.sortType} `;
    }

    query+=` OFFSET ${offset} LIMIT ${limit}`;

    const events = await this.redshiftClient.query(query)
      .then(data => {
        return data.rows;
      })
      .catch(e => {
        throw new GeneralError(`Error getting events: ${e.message}`);
      });
    return events;
  }

  async get(id, params) {
    const schema = schema.get(params);
    const query = `SELECT * FROM ${schema} WHERE id=${id}`;
    let rows = [];
    await this.redshiftClient.rawQuery(query, [{raw: false}])
      .then(data => {
        rows = data.rows;
      })
      .catch(e => {
        throw new GeneralError(`Error getting events: ${e.message}`);
      });
    return rows;
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return {id};
  }

};
