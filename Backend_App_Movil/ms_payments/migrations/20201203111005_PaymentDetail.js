exports.up = (knex) => knex.schema.createTable('PaymentDetail', (table) => {
  table.increments('paymentDetailId').unsigned().notNullable();
  table.integer('paymentId').unsigned()
    .references('Payment.paymentId').unsigned()
    .notNullable();
  table.integer('orderId').unsigned().notNullable();
  table.timestamps(true, true);
});
exports.down = (knex) => knex.schema.dropTable('PaymentDetail');
