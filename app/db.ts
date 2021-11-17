const Knex = require('knex');

const DB_HOST: string = 'localhost';
const DB_USER: string = 'postgres';
const DB_PASSWORD: string = '';
const DB_DATABASE: string = 'eventx';

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
