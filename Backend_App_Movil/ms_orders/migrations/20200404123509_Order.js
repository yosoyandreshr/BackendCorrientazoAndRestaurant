exports.up = (knex) => knex.schema.alterTable('OrderDetail', (table) => {
  table.dropForeign('orderId', 'orderdetail_orderid_foreign');
  table.integer('orderId').unsigned().references('Order.orderId')
    .onDelete('CASCADE')
    .alter();
});

exports.down = (knex) => knex.schema.alterTable('OrderDetail', (table) => {
  table.dropForeign('orderId', 'orderdetail_orderid_foreign');
  table.integer('orderId').unsigned().references('Order.orderId').alter();
});
