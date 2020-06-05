module.exports = {
  title: 'PaymentPaypal',
  type: 'object',
  properties: {
    sku: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
    total: {
      type: 'number',
    },
    description: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
  required: ['sku', 'name', 'price', 'total', 'description', 'email'],
};
