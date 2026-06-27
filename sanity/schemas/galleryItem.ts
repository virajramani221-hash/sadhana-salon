export const galleryItem = {
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'tag',
      title: 'Tag (e.g. Hair, Bridal)',
      type: 'string',
    },
  ],
};
