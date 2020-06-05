exports.up = (knex) => knex.schema.createTable('restaurant', (table) => {
  table.increments('restid').unsigned().notNullable();
  table.string('stateid');
  table.integer('restnit');
  table.string('namerestaurant').unsigned().notNullable();
  table.string('description').unsigned().notNullable();
  table.string('image').unsigned().notNullable();
  table.string('celphone').unsigned().notNullable();
  table.string('direction').unsigned().notNullable();
  table.string('schedule').unsigned().notNullable();
  table.string('city').unsigned().notNullable();
  table.integer('authId').unsigned().references('Auth.authId');

  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('restaurant');
