module.exports = {
  title: 'authRegister',
  type: 'object',
  properties: {
    authEmail: {
      type: 'string',
    },
    authPassword: {
      type: 'string',
    },
  },
  required: ['authEmail', 'authPassword'],
};
