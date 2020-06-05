module.exports = {
  title: 'SubOption',
  type: 'object',
  properties: {
    optionId: {
      type: 'number',
    },
    subName: {
      type: 'string',
    },
  },
  required: ['optionId', 'subName'],
};
