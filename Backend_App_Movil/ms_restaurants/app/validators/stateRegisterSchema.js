module.exports = {
  title: 'stateRegister',
  type: 'object',
  properties: {
    stateid: {
      type: 'number',
    },
    statename: {
      type: 'string',
    },
  },
  required: ['statename'],

};
