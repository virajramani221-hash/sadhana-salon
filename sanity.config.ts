import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { service } from './sanity/schemas/service';
import { stylist } from './sanity/schemas/stylist';
import { testimonial } from './sanity/schemas/testimonial';
import { galleryItem } from './sanity/schemas/galleryItem';
import { post } from './sanity/schemas/post';

export default defineConfig({
  name: 'default',
  title: 'Sadhana Salon CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  basePath: '/admin',
  plugins: [structureTool()],
  schema: {
    types: [service, stylist, testimonial, galleryItem, post],
  },
});
