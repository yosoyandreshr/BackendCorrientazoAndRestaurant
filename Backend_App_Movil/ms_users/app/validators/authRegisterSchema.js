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
    roleId: {
      type: 'number',
    },
  },
  required: ['authEmail', 'authPassword'],
};
