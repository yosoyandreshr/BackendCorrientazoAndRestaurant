exports.up = (knex) => knex.schema.createTable('state', (table) => {
  table.increments('stateid').unsigned().notNullable();
  table.string('statename').unsigned().notNullable();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('state');
