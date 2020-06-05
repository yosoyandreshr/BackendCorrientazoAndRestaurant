module.exports = {
  title: 'userRegister',
  type: 'object',
  properties: {
    userName: {
      type: 'string',
    },
    userIdentification: {
      type: 'string',
    },
    userPhone: {
      type: 'string',
    },
    authEmail: {
      type: 'string',
    },
    authPassword: {
      type: 'string',
    },
    authId: {
      type: 'number',
    },
  },
  required: ['userName', 'userPhone'],
};
