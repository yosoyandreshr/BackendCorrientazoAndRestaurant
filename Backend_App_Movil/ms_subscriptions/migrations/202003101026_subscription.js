exports.up = (knex) => knex.schema.createTable('Subscription', (table) => {
  table.increments('subId').unsigned().notNullable();
  table.integer('userId').unsigned().notNullable();
  table.integer('packageId').unsigned()
    .references('Package.packageId');
  table.integer('restId').unsigned().notNullable();
  table.double('credit').unsigned().notNullable();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('Subscription');
