exports.up = (knex) => knex.schema.createTable('Sub_Option', (table) => {
  table.increments('subId').unsigned().notNullable();
  table.integer('optionId')
    .references('Option.optionId').unsigned().notNullable();
  table.string('subName').unsigned().notNullable();
});

exports.down = (knex) => knex.schema.dropTable('Sub_Option');
