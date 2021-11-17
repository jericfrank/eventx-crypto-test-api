const config = require('config');

const DB_NAME = config.get('db.database');
const DB_USER = config.get('db.user');
const DB_PASSWORD = config.get('db.password');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
