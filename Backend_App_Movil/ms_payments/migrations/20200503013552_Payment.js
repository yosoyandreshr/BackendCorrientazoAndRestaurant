exports.up = (knex) => knex.schema.createTable('Payment', (table) => {
  table.increments('paymentId').unsigned().notNullable();
  table.integer('userId').unsigned().notNullable();
  table.string('paymentIdTransations').unsigned().notNullable();
  table.string('description').unsigned().notNullable();
  table.string('paymentMethod').unsigned().notNullable();
  table.string('amount').unsigned().notNullable();
  table.string('email').unsigned().notNullable();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('Payment');
