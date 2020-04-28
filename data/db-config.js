const knex = require('knex');
const config = require('../knexfile.js');
require('dotenv').config();
const env = process.env.KNEX_ENV || 'development';

module.exports = knex(config[env]);