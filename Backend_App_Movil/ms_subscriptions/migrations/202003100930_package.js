exports.up = (knex) => knex.schema.createTable('Package', (table) => {
  table.increments('packageId').unsigned().notNullable();
  table.text('description').unsigned().notNullable();
  table.text('state').unsigned().notNullable();
  table.double('subvalue').unsigned().notNullable();
  table.double('balance').unsigned().notNullable();
  table.integer('restId').unsigned().notNullable();
});

exports.down = (knex) => knex.schema.dropTable('Package');
