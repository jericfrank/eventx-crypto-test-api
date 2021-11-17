const { seed } = require('../seeds/coins');
const COINS_TABLE = 'coins';

exports.up = async function(knex) {
  await knex.schema.createTable(COINS_TABLE, table => {
    table.increments();

    table.string('code').notNullable();
    table.string('name').notNullable();
    table.integer('order').notNullable();

    table.timestamps(true, true);
  });

  await seed(knex);
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists(COINS_TABLE);
};
