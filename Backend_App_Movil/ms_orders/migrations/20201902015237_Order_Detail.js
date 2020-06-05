exports.up = (knex) => knex.schema.createTable('OrderDetail', (table) => {
  table.increments('orderDetailId').unsigned().notNullable();
  table.integer('orderId').unsigned().notNullable()
    .references('Order.orderId')
    .unsigned()
    .notNullable();
  table.string('subName').unsigned().notNullable();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('OrderDetail');
