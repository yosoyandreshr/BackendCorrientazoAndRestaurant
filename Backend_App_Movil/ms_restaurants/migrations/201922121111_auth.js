exports.up = (knex) => knex.schema.createTable('Auth', (table) => {
  table.increments('authId').unsigned().notNullable();
  table.text('authEmail').unsigned().notNullable();
  table.text('authPassword').unsigned().notNullable();
});

exports.down = (knex) => knex.schema.dropTable('Auth');
