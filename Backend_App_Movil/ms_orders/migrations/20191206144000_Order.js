exports.up = (knex) => knex.schema.createTable('Order', (table) => {
  table.increments('orderId').unsigned().notNullable();
  table.integer('userId').unsigned().notNullable();
  table.integer('restId').unsigned().notNullable();
  table.integer('menuId').unsigned().notNullable();
  table.string('menuName').unsigned().notNullable();
  table.string('image').unsigned().notNullable();
  table.double('price').unsigned().notNullable();
  table.string('state').unsigned().notNullable();
  table.string('address').unsigned().notNullable();
  table.timestamps(true, true);
});


exports.down = (knex) => knex.schema.dropTable('Order');
