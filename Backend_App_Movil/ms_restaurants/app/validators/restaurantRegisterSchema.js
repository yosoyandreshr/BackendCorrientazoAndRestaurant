module.exports = {
  title: 'restaurantRegister',
  type: 'object',
  properties: {
    restid: {
      type: 'number',
    },
    stateid: {
      type: 'string',
    },
    restnit: {
      type: 'number',
    },
    namerestaurant: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    celphone: {
      type: 'string',
    },
    direction: {
      type: 'string',
    },
    schedule: {
      type: 'string',
    },
    authId: {
      type: 'number',
    },
    authEmail: {
      type: 'string',
    },
    authPassword: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
  },
  required: ['namerestaurant', 'description', 'celphone', 'direction', 'schedule', 'city', 'image'],

};
