module.exports = {
  title: 'Option',
  type: 'object',
  properties: {
    menuId: {
      type: 'number',
    },
    optionNeme: {
      type: 'string',
    },
  },
  required: ['menuId', 'optionName'],
};
