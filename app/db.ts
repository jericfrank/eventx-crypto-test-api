import * as config from 'config';
const Knex = require('knex');

const DB_HOST = config.get('db.host');
const DB_DATABASE = config.get('db.database');
const DB_USER = config.get('db.user');
const DB_PASSWORD = config.get('db.password');

const db = Knex({
  client: 'pg',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
});

export default db;
