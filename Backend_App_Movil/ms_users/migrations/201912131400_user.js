exports.up = (knex) => knex.schema.createTable('User', (table) => {
  table.increments('userId').unsigned().notNullable();
  table.text('userName').unsigned().notNullable();
  table.text('userIdentification').unsigned().notNullable();
  table.text('userPhone');
  table.double('debt').unsigned().notNullable();
  table.integer('authId').unsigned()
    .references('Auth.authId');
});


exports.down = (knex) => knex.schema.dropTable('User');
