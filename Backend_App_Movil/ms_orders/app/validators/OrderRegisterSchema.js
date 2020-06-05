module.exports = {
  title: 'OrdersRegister',
  type: 'object',
  properties: {
    id_users: {
      type: 'number',
    },
    address: {
      type: 'string',
    },
    id_plate: {
      type: 'number',
    },
    state: {
      type: 'string',
    },
  },
  required: ['address'],
};
