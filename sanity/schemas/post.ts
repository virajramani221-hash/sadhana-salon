export const post = {
  name: 'post',
  title: 'Journal Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'date',
      title: 'Published Date',
      type: 'date',
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};
