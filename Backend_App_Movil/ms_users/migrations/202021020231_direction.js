exports.up = (knex) => knex.schema.createTable('Direction', (table) => {
  table.increments('directionId').unsigned().notNullable();
  table.integer('userId')
    .references('User.userId');
  table.string('nameDirection');
  table.string('userCity');
});
exports.down = (knex) => knex.schema.dropTable('Direction');
