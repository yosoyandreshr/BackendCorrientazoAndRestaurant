module.exports = {
  title: 'PackageRegister',
  type: 'object',
  properties: {
    packageId: {
      type: 'number',
    },
    description: {
      type: 'string',
    },
    restId: {
      type: 'number',
    },
    subvalue: {
      type: 'number',
    },
    balance: {
      type: 'number',
    },
  },
  required: ['description', 'restId', 'subvalue', 'balance'],

};
