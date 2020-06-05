exports.up = (knex) => knex.schema.createTable('Auth', (table) => {
  table.increments('authId').unsigned().notNullable();
  table.text('authEmail').unsigned().notNullable();
  table.text('authPassword').unsigned().notNullable();
  table.integer('roleId').unsigned()
    .references('Role.roleId');
});

exports.down = (knex) => knex.schema.dropTable('Auth');
