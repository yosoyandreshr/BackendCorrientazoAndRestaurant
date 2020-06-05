exports.up = (knex) => knex.schema.createTable('notifications', (table) => {
  table.increments('id').unsigned().notNullable();
  table.text('tokenNotification').unsigned().notNullable();
  table.integer('idUser').unsigned().notNullable();
});

exports.down = (knex) => knex.schema.dropTable('notifications');
