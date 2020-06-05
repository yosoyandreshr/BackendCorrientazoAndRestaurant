module.exports = {
  title: 'Payment',
  type: 'object',
  properties: {
    paymentId: {
      type: 'number',
    },
    userId: {
      type: 'number',
    },
    payementIdTransation: {
      type: 'string',
    },
  },
  required: ['userId', 'paymentIdTransations'],
};
