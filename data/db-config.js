const knex = require('knex');

const config = require('../../knexfile.js');

module.exports = knex(config.development);

// Should move this file up a directory - KL