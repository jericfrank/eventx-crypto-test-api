const COINS_TABLE = 'coins';
const COIN_PRICES_TABLE = 'coin_prices';

exports.up = async function(knex) {
  await knex.schema.createTable(COIN_PRICES_TABLE, table => {
    table.increments();

    table.string('base').notNullable();
    table.string('target').notNullable();
    table.float('price').nullable();
    table.float('volume').nullable();
    table.float('change').nullable();

    table.integer('coin_id')
      .unsigned()
      .references('id')
      .inTable(COINS_TABLE)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
      .index();

    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists(COIN_PRICES_TABLE);
};
