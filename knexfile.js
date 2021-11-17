module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'eventx',
      user: 'postgres',
      password: ''
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
