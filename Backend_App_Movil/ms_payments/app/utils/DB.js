const Knex = require('knex');
const config = require('../configs/database');

const DB = Knex(config);

module.exports = DB;
