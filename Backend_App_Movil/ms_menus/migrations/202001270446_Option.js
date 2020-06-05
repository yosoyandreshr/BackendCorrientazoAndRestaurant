exports.up = (knex) => knex.schema.createTable('Option', (table) => {
  table.increments('optionId').unsigned().notNullable();
  table.integer('menuId')
    .references('Menu.menuId').unsigned().notNullable();
  table.string('optionName').unsigned().notNullable();
});

exports.down = (knex) => knex.schema.dropTable('Option');
