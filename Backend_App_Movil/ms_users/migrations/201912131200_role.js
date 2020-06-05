exports.up = (knex) => knex.schema.createTable('Role', (table) => {
  table.increments('roleId').unsigned().notNullable();
  table.text('roleName').unsigned().notNullable();
}).then(() => knex('Role').insert([
  { roleName: 'usuario' },
]));

exports.down = (knex) => knex.schema.dropTable('Role');
