//set up knex
const knex = require('knex');

const configOptions = require('../knexfile').development;

//bring in the development configuration of the knex file that knows how to talk to the database
module.exports = knex(configOptions);


