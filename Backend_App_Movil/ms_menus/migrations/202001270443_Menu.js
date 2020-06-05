exports.up = (knex) => knex.schema.createTable('Menu', (table) => {
  table.increments('menuId').unsigned().notNullable();
  table.integer('restId').unsigned().notNullable();
  table.string('menuName').unsigned().notNullable();
  table.string('state').unsigned().notNullable();
  table.string('image').unsigned().notNullable();
  table.double('value').unsigned().notNullable();
});

exports.down = (knex) => knex.schema.dropTable('Menu');
