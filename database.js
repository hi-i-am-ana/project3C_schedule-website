const pgp = require('pg-promise')();

const connection = 'postgres://anastasia@localhost:5432/mr_coffee_app';

const database = pgp(connection);

module.exports = database;