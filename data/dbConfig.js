//bring in the development configuration of the knex file that knows how to talk to the database
const knex = require('knex');

const configOptions = require('../knexfile').development;


module.exports = knex(configOptions);


/*
const knex = require('knex');

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig.development);

*/


