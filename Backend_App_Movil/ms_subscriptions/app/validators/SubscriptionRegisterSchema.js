module.exports = {
  title: 'SubscriptionRegister',
  type: 'object',
  properties: {
    subId: {
      type: 'number',
    },
    userId: {
      type: 'number',
    },
    packageId: {
      type: 'number',
    },
    restId: {
      type: 'number',
    },

  },
  required: ['userId', 'packageId', 'restId'],

};
