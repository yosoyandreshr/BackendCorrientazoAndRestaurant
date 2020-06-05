module.exports = {
  title: 'directionRegister',
  type: 'object',
  properties: {
    nameDirection: {
      type: 'string',
    },
    userCity: {
      type: 'string',
    },
    userId: {
      type: 'number',
    },
  },
  required: ['userId'],
};
