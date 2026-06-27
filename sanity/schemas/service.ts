export const service = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price String (e.g. ₹4,500+)',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Hair', 'Skin', 'Nails', 'Bridal'],
      },
    },
  ],
};
